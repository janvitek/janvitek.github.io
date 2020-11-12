#include <signal.h>
#include <time.h>
#include <fcntl.h>
#include <sys/time.h>
#include <sys/types.h>
#include <sys/ioctl.h>
#include <sys/stat.h>
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <complex.h>
#include "posix_time.h"
#include <linux/soundcard.h>

#define NANOS_PER_SEC (1000LL*1000*1000)
#define MICROS_PER_SEC (1000LL*1000)
#define NANOS_PER_MICRO 1000LL

#define SOUND_DEV "/dev/dsp"
#define PERIOD_NANOS 45000LL
#define ITERATIONS 1000000
long long deadlineMissOverTime[ITERATIONS]; 
int iteration = 0;
int fd;
long long expectedCmplTimeNanos;
int errWrites = 0;
int misses = 0;
timer_t timer_h; 
static struct timespec ts_start, ts_stop;   
static struct timespec write_start[ITERATIONS], write_stop[ITERATIONS];
int buff; 



long long calcCeil(long long x, long long y) {
	return (x + y - 1) / y;
}

void logDeadlineMiss(long long diff) {
	misses++;
	deadlineMissOverTime[iteration] = diff;
}

void timer_intr(int sig, siginfo_t *extra, void *cruft) { 
	// start timer first time
	if (ts_start.tv_nsec == 0) {
		clock_gettime(CLOCK_REALTIME, &ts_start);
	}
		
	// write byte to file
	clock_gettime(CLOCK_REALTIME, &write_start[iteration]);
	if (write(fd, &buff, 1) != 1) {
		errWrites++;
	}
    clock_gettime(CLOCK_REALTIME, &write_stop[iteration]);
    
    
    // check for missing deadline
    struct timespec now;
    clock_gettime(CLOCK_REALTIME, &now);
    long long nowNanos = (now.tv_sec * NANOS_PER_SEC + now.tv_nsec);
    if (iteration > 0) {
    	//printf("Diff: %lld\n", llabs(nowNanos - expectedCmplTimeNanos));
		if (nowNanos > expectedCmplTimeNanos) {
			logDeadlineMiss(nowNanos - expectedCmplTimeNanos);
		}
	}
	
	iteration++;
	if (iteration == ITERATIONS) {
		//printf("expt: %lld\n", (expectedCmplTimeNanos - nowNanos));
		clock_gettime(CLOCK_REALTIME, &ts_stop);
	
		// disable timer
		struct itimerspec tmr_setting; 
	    tmr_setting.it_value.tv_sec = 0; 
	    tmr_setting.it_value.tv_nsec = 0;
		tmr_setting.it_interval.tv_sec = 0; 
    	tmr_setting.it_interval.tv_nsec = 0; 
    	if ( timer_settime(timer_h,0,&tmr_setting,NULL) < 0 ) {
    		perror("settimer -- disable"); 
    	} 
	}
	
	// calculate next deadline
	expectedCmplTimeNanos = ((calcCeil(nowNanos, PERIOD_NANOS) + 1) * PERIOD_NANOS);

} 


int openDevice() {
  int fd = open(SOUND_DEV, O_WRONLY | O_NONBLOCK);
  if (fd < 0) {
    perror("Couldn't open device");
    return -1;
  }
  
    /* Set up the soundcard */
    printf("SOUND_PCM_WRITE_BITS %d\n", SOUND_PCM_WRITE_BITS);
    printf("SOUND_PCM_WRITE_CHANNELS %d\n", SOUND_PCM_WRITE_CHANNELS);
    printf("SOUND_PCM_WRITE_RATE %d\n", SOUND_PCM_WRITE_RATE);
    printf("SNDCTL_DSP_GETBLKSIZE %d\n", SNDCTL_DSP_GETBLKSIZE);
	int arg = 16;
	int result = ioctl(fd, SOUND_PCM_WRITE_BITS, &arg);
	if (result == -1) {
		return -1;
	}
	if (arg != 16) {
		return -1;
	}

	arg = 1;
	result = ioctl(fd, SOUND_PCM_WRITE_CHANNELS, &arg);
	if (result == -1) {
		return -1;
	}
	if (arg != 1) {
		return -1;
	}
	
	arg = 22050;
	result = ioctl(fd, SOUND_PCM_WRITE_RATE, &arg);
	if (result == -1) {
		return -1;
	}
	arg = 0;
	
	/* Display blksize */
	ioctl(fd, SNDCTL_DSP_GETBLKSIZE, &arg);
	fprintf(stderr, "blksize: %d\n", arg);
	
	sleep(2);
	
	return fd;
}


void doTest() 
{
    struct sigaction sa; 
    struct sigevent sig_spec; 
    sigset_t allsigs; 
    struct itimerspec tmr_setting; 
    buff = 1;

   /* setup signal to respond to timer */ 
    sigemptyset(&sa.sa_mask); 
    sa.sa_flags = SA_SIGINFO; 
    sa.sa_sigaction = timer_intr; 
    if ( sigaction(SIGRTMIN, &sa, NULL) < 0 ) 
        perror("sigaction"); 

    sig_spec.sigev_notify = SIGEV_SIGNAL; 
    sig_spec.sigev_signo = SIGRTMIN; 
    /* create timer, which uses the REALTIME clock */ 
    if (timer_create(CLOCK_REALTIME,&sig_spec,&timer_h) < 0 ) 
	perror("timer create");

    /* set the initial expiration and frequency of timer */ 
    struct timespec now;
    clock_gettime(CLOCK_REALTIME, &now);
    long long nowNanos = (now.tv_sec * NANOS_PER_SEC) + now.tv_nsec;
    long long initTime = (long long) ((nowNanos / PERIOD_NANOS) * PERIOD_NANOS + (PERIOD_NANOS * 1000));
    
    tmr_setting.it_value.tv_sec = (initTime - nowNanos) / NANOS_PER_SEC; 
    tmr_setting.it_value.tv_nsec = (initTime - nowNanos) % NANOS_PER_SEC; 
    tmr_setting.it_interval.tv_sec = 0L; 
    tmr_setting.it_interval.tv_nsec = 45000L; 
    if ( timer_settime(timer_h,0,&tmr_setting,NULL) < 0 ) { 
		perror("settimer"); 
    }

    /* wait for signals */ 
    sigemptyset(&allsigs); 

    while (iteration < ITERATIONS) { 
        sigsuspend(&allsigs);
    }
}

void dumpWriteTimeHistogram() {
    int HISTOSIZE = 1500;
    int MAX_GRADE = 10;
    int histogram[HISTOSIZE];
    int extremes_ = 0;

	int i;
    for (i = 0; i < HISTOSIZE; i++) {
		histogram[i] = 0;
    }

    for (i = 0; i < ITERATIONS; i++) {
	    long long startTime  = write_start[i].tv_sec * NANOS_PER_SEC + write_start[i].tv_nsec;
    	long long endTime = write_stop[i].tv_sec * NANOS_PER_SEC + write_stop[i].tv_nsec;

    	int timeInMicros = (int) calcCeil((endTime - startTime), NANOS_PER_MICRO); 
    	if (timeInMicros >= HISTOSIZE) {
			extremes_++;
		}
		else {
			histogram[timeInMicros]++;
		}
    }
    printf("\n");
    printf("Write Time Histogram\n");
	for (i = 1; i < HISTOSIZE; i++) {
		printf("%d %d\n", i, histogram[i]); 
		//for (int j = 0; j < (histogram[i] / (HISTOSIZE / MAX_GRADE)); j++) {
		//	System.out.print("*");
		//}
	}
	printf("[extremes] = %d\n", extremes_);
}

void dumpWriteTimesOverTime() {
    printf("\n");
    printf("Write Time Over Time\n");
    int i;
    for (i = 0; i < ITERATIONS; i++) {
	long long startTime  = write_start[i].tv_sec * NANOS_PER_SEC + write_start[i].tv_nsec;
    	long long endTime = write_stop[i].tv_sec * NANOS_PER_SEC + write_stop[i].tv_nsec;

    	int timeInMicros = (int) calcCeil((endTime - startTime), NANOS_PER_MICRO);
    	printf("%d %d\n", i, timeInMicros); 
    }
}


void dumpMissedDeadlineHistogram() {
    int HISTOSIZE = 150;
    int MAX_GRADE = 10;
    int histogram[HISTOSIZE];
    int extremes_ = 0;

	int i;
    for (i = 0; i < HISTOSIZE; i++) {
		histogram[i] = 0;
    }

    for (i = 1; i < ITERATIONS; i++) {
    	int missInMicros = (int) calcCeil(deadlineMissOverTime[i], NANOS_PER_MICRO); 
    	if (missInMicros >= HISTOSIZE) {
			extremes_++;
		}
		else {
			histogram[missInMicros]++;
		}
    }
    printf("\n");
    printf("Missed Deadline Histogram\n");
	for (i = 1; i < HISTOSIZE; i++) {
		printf("%d %d\n", i, histogram[i]); 
		//for (int j = 0; j < (histogram[i] / (HISTOSIZE / MAX_GRADE)); j++) {
		//	System.out.print("*");
		//}
	}
	printf("[extremes] = %d\n", extremes_);
}



void dumpDeadlineMissesOverTime() {
    printf("\n");
    printf("Deadline misses in microseconds over time\n");
    int i;
	for ( i = 0; i < ITERATIONS; i++) {
		printf("%d %lld\n", i, calcCeil(deadlineMissOverTime[i], NANOS_PER_MICRO));
	}
}

void dumpStatistics() {
    long long startTime  = ts_start.tv_sec * NANOS_PER_SEC + ts_start.tv_nsec;
    long long endTime = ts_stop.tv_sec * NANOS_PER_SEC + ts_stop.tv_nsec;
    
    printf("Missed deadlines: %lld\n", (((endTime - startTime) / PERIOD_NANOS) - ITERATIONS));
    printf("Missed deadlines: %d and bad writes %d\n", misses, errWrites);
}

int main(int argc, char *argv[]) {
	
	if (openDevice() == -1) 
		exit(-1);
	doTest();	
	dumpWriteTimesOverTime();	
/*	
	dumpWriteTimeHistogram();
	printf("------------------------------\n");
	dumpMissedDeadlineHistogram();
	printf("------------------------------\n");
	dumpDeadlineMissesOverTime();
	printf("------------------------------\n");
	dumpStatistics();
	*/
}
