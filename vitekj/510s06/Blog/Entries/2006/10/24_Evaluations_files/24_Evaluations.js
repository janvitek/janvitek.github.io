// Created by iWeb 3.0.4 local-build-20111227
//
//  iWeb - iWebHitCounter.js
//  Copyright (c) 2007-2008 Apple Inc. All rights reserved.
//

function iWebWriteCounter()
{try
{writeCounter();}
catch(e)
{}}
setTransparentGifURL('../../../../Media/transparent.gif');function hostedOnDM()
{return true;}
function onPageLoad()
{dynamicallyPopulate();loadMozillaCSS('24_Evaluations_files/24_EvaluationsMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');fixAllIEPNGs('../../../../Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();fixupIECSS3Opacity('id4');BlogFixupPreviousNext();iWebWriteCounter();performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
