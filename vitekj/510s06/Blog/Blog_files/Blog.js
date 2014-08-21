// Created by iWeb 3.0.4 local-build-20111227

setTransparentGifURL('../Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-3,3,6,87),url:'Blog_files/stroke.png'},{rect:new IWRect(-3,-3,6,6),url:'Blog_files/stroke_1.png'},{rect:new IWRect(3,-3,146,6),url:'Blog_files/stroke_2.png'},{rect:new IWRect(149,-3,6,6),url:'Blog_files/stroke_3.png'},{rect:new IWRect(149,3,6,87),url:'Blog_files/stroke_4.png'},{rect:new IWRect(149,90,6,6),url:'Blog_files/stroke_5.png'},{rect:new IWRect(3,90,146,6),url:'Blog_files/stroke_6.png'},{rect:new IWRect(-3,90,6,6),url:'Blog_files/stroke_7.png'}],new IWSize(152,93))});registry.applyEffects();}
function hostedOnDM()
{return true;}
function photocastSubscribe()
{photocastHelper("http://web.me.com/vitekj/510s06/Blog/rss.xml");}
function onPageLoad()
{loadMozillaCSS('Blog_files/BlogMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');detectBrowser();iWebInitSearch();fixAllIEPNGs('../Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();applyEffects()}
function onPageUnload()
{Widget.onunload();}
