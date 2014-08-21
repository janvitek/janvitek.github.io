// Created by iWeb 3.0.1 local-build-20100413

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,140),url:'Welcome_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Welcome_files/stroke_1.png'},{rect:new IWRect(5,-5,90,10),url:'Welcome_files/stroke_2.png'},{rect:new IWRect(95,-5,10,10),url:'Welcome_files/stroke_3.png'},{rect:new IWRect(95,5,10,140),url:'Welcome_files/stroke_4.png'},{rect:new IWRect(95,145,10,11),url:'Welcome_files/stroke_5.png'},{rect:new IWRect(5,145,90,11),url:'Welcome_files/stroke_6.png'},{rect:new IWRect(-5,145,10,11),url:'Welcome_files/stroke_7.png'}],new IWSize(100,150))});registry.applyEffects();}
function hostedOnDM()
{return true;}
function onPageLoad()
{loadMozillaCSS('Welcome_files/WelcomeMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
