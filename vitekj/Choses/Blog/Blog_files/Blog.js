// Created by iWeb 3.0.1 local-build-20090616

setTransparentGifURL('../Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-1,1,2,83),url:'Blog_files/stroke.png'},{rect:new IWRect(-1,-1,2,2),url:'Blog_files/stroke_1.png'},{rect:new IWRect(1,-1,158,2),url:'Blog_files/stroke_2.png'},{rect:new IWRect(159,-1,2,2),url:'Blog_files/stroke_3.png'},{rect:new IWRect(159,1,2,83),url:'Blog_files/stroke_4.png'},{rect:new IWRect(159,84,2,2),url:'Blog_files/stroke_5.png'},{rect:new IWRect(1,84,158,2),url:'Blog_files/stroke_6.png'},{rect:new IWRect(-1,84,2,2),url:'Blog_files/stroke_7.png'}],new IWSize(160,85))});registry.applyEffects();}
function hostedOnDM()
{return true;}
function photocastSubscribe()
{photocastHelper("http://web.me.com/vitekj/Choses/Blog/rss.xml");}
function onPageLoad()
{loadMozillaCSS('Blog_files/BlogMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');iWebInitSearch();adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');adjustLineHeightIfTooBig('id7');adjustFontSizeIfTooBig('id7');detectBrowser();fixAllIEPNGs('../Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();fixupIECSS3Opacity('id8');applyEffects()}
function onPageUnload()
{Widget.onunload();}
