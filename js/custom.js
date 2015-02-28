/*
 * © Catch Exception s.r.o. 2015
 */

if (typeof jQuery === 'undefined') 
{
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
else
{
  $(document).ready(function()
  {
    /* Scroll to anchors slowly */
    $('a[href*=#]').click(function() 
    {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      && location.hostname == this.hostname) 
      {
        var $target = $(this.hash);
        $target = $target.length && $target
        || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) 
        {   
          if( $('.header').hasClass('fixed') )
          {
            var targetOffset = $target.offset().top - $('.header').height() - 20;  
          }
          else
          {
            var targetOffset = $target.offset().top - 2 * $('.header').height() - 45;
          }
          
          $('html,body')
          .animate({scrollTop: targetOffset}, 1000);
          return false;
        }
      }
    });

    /* Show read more for publications */
    $('.pn-publications a.pn-link').click(function()
    {
      $this = $(this);

      $this.parent().find('div.pn-readmore').animate({
        height: "toggle"
      }, 1000 );
    });
  });

  /* On scrolldown show top link at the bottom and change positioning of the header to fixed */
  $(window).bind('scroll', function() 
  {
    if ($(window).scrollTop() > 50) 
    {
      $('.header').addClass('fixed');
      $('.pn-top').fadeIn();
    }
    else 
    {
      $('.header').removeClass('fixed');
      $('.pn-top').fadeOut();
    }
  });	
}
