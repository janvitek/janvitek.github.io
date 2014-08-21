// Created by iWeb 3.0.1 local-build-20100630

function createMediaStream_id3()
{return IWCreatePhotocast("http://web.me.com/vitekj/Family/Photos_files/rss.xml",true);}
function initializeMediaStream_id3()
{createMediaStream_id3().load('http://web.me.com/vitekj/Family',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget1'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id3',{pageIndex:0}));});}
function layoutMediaGrid_id3(range)
{createMediaStream_id3().load('http://web.me.com/vitekj/Family',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id3',new IWPhotoGridLayout(3,new IWSize(176,176),new IWSize(176,0),new IWSize(211,191),27,27,0,new IWSize(26,25)),new IWPhotoFrame([IWCreateImage('Photos_files/kid_frame-1_01.jpg'),IWCreateImage('Photos_files/kid_frame-1_02.jpg'),IWCreateImage('Photos_files/kid_frame-1_03.jpg'),IWCreateImage('Photos_files/kid_frame-1_06.jpg'),IWCreateImage('Photos_files/kid_frame-1_09.jpg'),IWCreateImage('Photos_files/kid_frame-1_08.jpg'),IWCreateImage('Photos_files/kid_frame-1_07.jpg'),IWCreateImage('Photos_files/kid_frame-1_04.jpg')],null,0,1.000000,0.000000,0.000000,0.000000,0.000000,13.000000,13.000000,13.000000,12.000000,121.000000,120.000000,121.000000,120.000000,null,null,null,0.500000),imageStream,range,new IWShadow({blurRadius:10,offset:new IWPoint(-0.0000,2.0000),color:'#000000',opacity:0.600000}),null,1.000000,{backgroundColor:'rgb(0, 0, 0)',reflectionHeight:100,reflectionOffset:2,captionHeight:100,fullScreen:0,transitionIndex:2},'Media/slideshow.html','widget1','widget2','widget3')});}
function relayoutMediaGrid_id3(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id3(range);}
function onStubPage()
{var args=window.location.href.toQueryParams();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id3(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(-0.0000,2.0000),color:'#000000',opacity:0.600000}),stroke_0:new IWPhotoFrame([IWCreateImage('Photos_files/Playtime_waves_01.png'),IWCreateImage('Photos_files/Playtime_waves_02.png'),IWCreateImage('Photos_files/Playtime_waves_03.png'),IWCreateImage('Photos_files/Playtime_waves_06.jpg'),IWCreateImage('Photos_files/Playtime_waves_09.jpg'),IWCreateImage('Photos_files/Playtime_waves_08.jpg'),IWCreateImage('Photos_files/Playtime_waves_07.jpg'),IWCreateImage('Photos_files/Playtime_waves_04.jpg')],null,0,1.000000,0.000000,0.000000,0.000000,0.000000,1.000000,18.000000,1.000000,1.000000,43.000000,554.000000,43.000000,554.000000,null,null,null,0.500000)});registry.applyEffects();}
function hostedOnDM()
{return true;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','Media/Photo-Overlay-Movie.png')
loadMozillaCSS('Photos_files/PhotosMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');NotificationCenter.addObserver(null,relayoutMediaGrid_id3,'RangeChanged','id3')
adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');detectBrowser();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');Widget.onload();fixupIECSS3Opacity('id5');applyEffects()
initializeMediaStream_id3()}
function onPageUnload()
{Widget.onunload();}
