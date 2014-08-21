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
setTransparentGifURL('Media/transparent.gif');function hostedOnDM()
{return true;}
function onPageLoad()
{loadMozillaCSS('510-Home_files/510-HomeMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');fixupIECSS3Opacity('id3');iWebWriteCounter();performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
