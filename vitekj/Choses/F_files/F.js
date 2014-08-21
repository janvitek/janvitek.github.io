// Created by iWeb 3.0.1 local-build-20090616

function createMediaStream_id2()
{return IWCreatePhotocast("http://web.me.com/vitekj/Choses/F_files/rss.xml",true);}
function initializeMediaStream_id2()
{createMediaStream_id2().load('http://web.me.com/vitekj/Choses',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget1'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id2',{pageIndex:0}));});}
function layoutMediaGrid_id2(range)
{createMediaStream_id2().load('http://web.me.com/vitekj/Choses',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id2',new IWPhotoGridLayout(2,new IWSize(263,263),new IWSize(263,0),new IWSize(316,278),27,27,0,new IWSize(0,0)),new IWStrokeParts([{rect:new IWRect(-3,3,6,257),url:'F_files/stroke.png'},{rect:new IWRect(-3,-3,6,6),url:'F_files/stroke_1.png'},{rect:new IWRect(3,-3,257,6),url:'F_files/stroke_2.png'},{rect:new IWRect(260,-3,6,6),url:'F_files/stroke_3.png'},{rect:new IWRect(260,3,6,257),url:'F_files/stroke_4.png'},{rect:new IWRect(260,260,6,6),url:'F_files/stroke_5.png'},{rect:new IWRect(3,260,257,6),url:'F_files/stroke_6.png'},{rect:new IWRect(-3,260,6,6),url:'F_files/stroke_7.png'}],new IWSize(263,263)),imageStream,range,null,null,1.000000,{backgroundColor:'rgb(0, 0, 0)',reflectionHeight:100,reflectionOffset:2,captionHeight:100,fullScreen:0,transitionIndex:2},'Media/slideshow.html','widget1','widget2','widget3')});}
function relayoutMediaGrid_id2(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id2(range);}
function onStubPage()
{var args=window.location.href.toQueryParams();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id2(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('Media/transparent.gif');function hostedOnDM()
{return true;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','Media/Photo-Overlay-Movie.png')
loadMozillaCSS('F_files/FMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');NotificationCenter.addObserver(null,relayoutMediaGrid_id2,'RangeChanged','id2')
adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');detectBrowser();fixAllIEPNGs('Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();fixupIECSS3Opacity('id5');initializeMediaStream_id2()
performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
