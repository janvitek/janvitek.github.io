//
//  iWeb - GoogleMap.js
//  Copyright (c) 2007-2008 Apple Inc. All rights reserved.
//

var GoogleMap=Class.create(Widget,{widgetIdentifier:"com-apple-iweb-widget-GoogleMap",initialize:function($super,instanceID,widgetPath,sharedPath,sitePath,preferences,runningInApp)
{if(instanceID){$super(instanceID,widgetPath,sharedPath,sitePath,preferences,runningInApp);}},mapRequestTemplate:'center=#{center}&zoomLevel=#{zoomLevel}&showZoom=#{showZoom}&mapType=#{mapType}&locatedAddress=#{locatedAddress}&locatedAddressPoint=#{locatedAddressPoint}&showInfo=#{showInfo}&language=#{language}&showGoogleBar=#{showGoogleBar}',iframeTemplate:'<iframe id="#{instanceID}-iframe" name="#{instanceID}-iframe" src="#{mapURL}?#{mapRequest}" width="100%" height="100%" scrolling="no" marginheight="0" marginwidth="0" frameborder="0"></iframe>',mapURL:'http://www.me.com/st/1/sharedassets/maps/iweb2/',onload:function()
{var mapRequestTemplate=new Template(this.mapRequestTemplate);var mapRequest=mapRequestTemplate.evaluate({center:this.escapedPreferenceForKey("center"),zoomLevel:this.escapedPreferenceForKey("zoomLevel"),showZoom:this.escapedPreferenceForKey("showZoom"),mapType:this.escapedPreferenceForKey("mapType"),locatedAddress:this.escapedPreferenceForKey("locatedAddress"),locatedAddressPoint:this.escapedPreferenceForKey("locatedAddressPoint"),showInfo:this.escapedPreferenceForKey("showInfo"),language:this.escapedPreferenceForKey("language"),showGoogleBar:this.escapedPreferenceForKey("showGoogleBar")});var iframeTemplate=new Template(this.iframeTemplate);var iframeText=iframeTemplate.evaluate({instanceID:this.instanceID,mapRequest:mapRequest,mapURL:this.mapURL});this.div().innerHTML=iframeText;if(this.preferences&&this.preferences.postNotification)
this.preferences.postNotification("BLWidgetIsSafeToDrawNotification",1);},escapedPreferenceForKey:function(key)
{var value=this.preferenceForKey(key);if(value!==undefined)
value=encodeURIComponent(value);return value;}});