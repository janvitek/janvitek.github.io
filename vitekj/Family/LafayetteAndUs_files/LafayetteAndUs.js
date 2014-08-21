// Created by iWeb 3.0.1 local-build-20100630

function createMediaStream_id3()
{return IWCreatePhotocast("http://web.me.com/vitekj/Family/LafayetteAndUs_files/rss.xml",true);}
function initializeMediaStream_id3()
{createMediaStream_id3().load('http://web.me.com/vitekj/Family',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget1'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id3',{pageIndex:0}));});}
function layoutMediaGrid_id3(range)
{createMediaStream_id3().load('http://web.me.com/vitekj/Family',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id3',new IWPhotoGridLayout(3,new IWSize(182,182),new IWSize(182,37),new IWSize(218,234),27,27,0,new IWSize(18,18)),new IWPhotoFrame([IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_01.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_02.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_03.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_06.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_09.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_08.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_07.png'),IWCreateImage('LafayetteAndUs_files/Hardcover_bevel_04.png')],null,0,0.500000,0.000000,0.000000,0.000000,0.000000,17.000000,17.000000,17.000000,17.000000,403.000000,295.000000,403.000000,295.000000,null,null,null,0.100000),imageStream,range,null,null,1.000000,{backgroundColor:'rgb(0, 0, 0)',reflectionHeight:100,reflectionOffset:2,captionHeight:100,fullScreen:0,transitionIndex:2},'Media/slideshow.html','widget1','widget2','widget3')});}
function relayoutMediaGrid_id3(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id3(range);}
function onStubPage()
{var args=window.location.href.toQueryParams();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id3(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('Media/transparent.gif');function hostedOnDM()
{return true;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','Media/Photo-Overlay-Movie.png')
loadMozillaCSS('LafayetteAndUs_files/LafayetteAndUsMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');NotificationCenter.addObserver(null,relayoutMediaGrid_id3,'RangeChanged','id3')
detectBrowser();Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');fixupIECSS3Opacity('id4');initializeMediaStream_id3()
performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
