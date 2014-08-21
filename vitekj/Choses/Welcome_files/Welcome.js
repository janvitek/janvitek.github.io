// Created by iWeb 3.0.1 local-build-20090616
//
//  iWeb - iWebHitCounter.js
//  Copyright (c) 2007-2008 Apple Inc. All rights reserved.
//

function iWebWriteCounter()
{try
{writeCounter();}
catch(e)
{}}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-2,-1,1,108),url:'Welcome_files/stroke.png'},{rect:new IWRect(-2,-2,1,1),url:'Welcome_files/stroke_1.png'},{rect:new IWRect(-1,-2,142,1),url:'Welcome_files/stroke_2.png'},{rect:new IWRect(141,-2,1,1),url:'Welcome_files/stroke_3.png'},{rect:new IWRect(141,-1,1,108),url:'Welcome_files/stroke_4.png'},{rect:new IWRect(141,107,1,1),url:'Welcome_files/stroke_5.png'},{rect:new IWRect(-1,107,142,1),url:'Welcome_files/stroke_6.png'},{rect:new IWRect(-2,107,1,1),url:'Welcome_files/stroke_7.png'}],new IWSize(140,106))});registry.applyEffects();}
function hostedOnDM()
{return true;}
function onPageLoad()
{loadMozillaCSS('Welcome_files/WelcomeMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');detectBrowser();fixAllIEPNGs('Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();fixupIECSS3Opacity('id4');iWebWriteCounter();applyEffects()}
function onPageUnload()
{Widget.onunload();}
