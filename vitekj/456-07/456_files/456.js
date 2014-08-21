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
{loadMozillaCSS('456_files/456Moz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');fixAllIEPNGs('Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();fixupIECSS3Opacity('id3');iWebWriteCounter();performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
