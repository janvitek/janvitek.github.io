//
// iWeb - Comments.js
// Copyright 2006-2008 Apple Inc.
// All rights reserved.
//

var commentsAppURL='http://www.mac.com/WebObjects/Comments.woa/wa/comment';var manageCommentsAppURL='http://www.mac.com/WebObjects/Comments.woa/wa/manage';var manageIconLightUrl='lockIcon_light.png';var manageIconDarkUrl='lockIcon_dark.png';var CommentsWidget=Class.create(Widget,{widgetIdentifier:"com-apple-iweb-widget-comments",initialize:function($super,instanceID,widgetPath,sharedPath,sitePath,preferences,runningInApp)
{try
{if(instanceID)
{$super(instanceID,widgetPath,sharedPath,sitePath,preferences,runningInApp);document.commentsWidget=this;this.contentID="widget";this.templateDivID="template";this.contentDivID="content";this.headerTemplateID="header";this.itemTemplateID="item";this.itemID="item";this.separatorTemplateID="separator";this.footerTemplateID="footer";this.debugFinalHtml=(location.href.indexOf("commentsFinalHtml")!=-1);this.initializingPreferences=true;this.initializeDefaultPreferences({"htmlTemplate":""});delete this.initializingPreferences;}
if(windowsInternetExplorer)
{this.div().parentNode.insertBefore(document.createTextNode(' '),this.div());}
this.setVisibility(false);this.updateTemplate();NotificationCenter.addObserver(this,this.observeCommentTargetChanged,"IWCommentTargetChanged",null);NotificationCenter.addObserver(this,this.observeDetailViewHeight,"DetailViewHeightNotification",null);var commentURL=location.href;if(this.runningInApp)
{commentURL="iweb-widget:Comments";}
NotificationCenter.postNotification(new IWNotification("IWCommentTargetChanged",null,{IWResourceURL:commentURL}));}
catch(e)
{debugPrintException(e);}},onload:function()
{this.changedPreferenceForKey("htmlTemplate");},changedPreferenceForKey:function($super,key)
{try
{$super(key);if(this.initializingPreferences)
{return;}
if(this.privateChangedPreferenceForKey)
{this.privateChangedPreferenceForKey(key)}
if(key=="htmlTemplate")
{this.updateTemplate();}}
catch(e)
{debugPrintException(e);}},setVisibility:function(isVisible)
{this.div().style.visibility=isVisible?"visible":"hidden";},observeCommentTargetChanged:function(notification)
{try
{var resourceUrl=notification.userInfo()["IWResourceURL"];trace('got IWCommentTargetChanged for url',resourceUrl);this.setCommentTarget(resourceUrl);}
catch(e)
{debugPrintException(e);}},observeDetailViewHeight:function(notification)
{try
{var commentDiv=this.div();var userInfo=notification.userInfo();var yPosDest=userInfo['top'];var yPosStart=Position.cumulativeOffset(commentDiv)[1];var yPosDelta=yPosDest-yPosStart;var currentMarginTop=depx(commentDiv.style.marginTop);var result=px(yPosDelta+currentMarginTop);commentDiv.style.marginTop=result;}
catch(e)
{debugPrintException(e);}},setCommentTarget:function(inResourceUrl)
{this.resourceUrl=null;this.resourcePath=null;this.lastRequestURL=null;if(inResourceUrl!=null)
{this.resourceUrl=inResourceUrl.urlStringByDeletingQueryAndFragment();this.resourcePath=resourcePathFromUrl(this.preferenceForKey("dotMacAccount"),this.resourceUrl);}
this.fetchAndRenderComments();},updateTemplate:function()
{var html=this.preferenceForKey("htmlTemplate");(function(){return html.search(/clear:[ ]*both;?['"][ ]*\/>/)==-1;}).assert();if(html=="")
{trace("** brand-new widget html being compiled from source markup");var markup=CommentsShared.defaultSourceMarkup;if(markup)
{html=CommentsShared.compileMarkup(markup);}}
if(html)
{html=html.plaintextgsub("<a href='$manage-app-url$'","<a class='comment-manage-link' href='$manage-app-url$'");var templateDiv=this.getElementById(this.templateDivID);var contentDiv=this.getElementById(this.contentDivID);if(templateDiv&&contentDiv)
{html=html.replace(/\$WIDGET_ID/g,this.instanceID);templateDiv.innerHTML=html;contentDiv.update();this.renderCommentItems();optOutOfCSSBackgroundPNGFix(contentDiv);}}},commentCountText:function(count,enabled)
{if(count==0)
{if(enabled)
{return this.localizedString("No Comments");}
else
{return"";}}
else if(count==1)
{return this.localizedString("1 Comment");}
else
{return String.stringWithFormat(this.localizedString("%s Comments"),count);}},bytesToString:function(str)
{var bytes=Number(str);if(bytes<1024)
{return String.stringWithFormat(this.localizedString("%s bytes"),bytes.toLocaleString());}
else if(bytes<1048756)
{var kb=bytes/1024.0;return String.stringWithFormat(this.localizedString("%s KB"),kb.toFixed(1));}
else if(bytes<1073741824)
{var mb=bytes/1048756.0
return String.stringWithFormat(this.localizedString("%s MB"),mb.toFixed(1));}
else
{var gb=bytes/1073741824.0;return String.stringWithFormat(this.localizedString("%s GB"),gb.toFixed(1));}},isImage:function(mimetype)
{if(mimetype===undefined)
return false;switch(mimetype.toLowerCase())
{case'image/gif':case'image/jpg':case'image/jpeg':case'image/pjpeg':return true;default:return false;}},formatDisplayName:function(displayname,size)
{return displayname+'\xa0\xa0\xa0'+this.bytesToString(size);},pollForCommentWindowToClose:function()
{if(globalCommentWindow.closed)
{this.fetchAndRenderComments();globalCommentWindow=null;}
else
{setTimeout(function(){this.pollForCommentWindowToClose();}.bind(this),1000);}},sizeDidChange:function()
{try
{var contentDiv=this.getElementById(this.contentDivID);if(this.runningInApp&&this.data&&this.data.items)
{contentDiv.select("div.delete-button").each(function(div)
{div.style.left=px(div.parentNode.offsetWidth-32);});}}
catch(e)
{debugPrintException(e);}},addDeleteCommentButton:function(div,item)
{var deleteButtonId=item.commentID;if(this.getElementById(deleteButtonId)==null)
{var buttonDiv=$(document.createElement("div"));buttonDiv.id=deleteButtonId;buttonDiv.className="delete-button";buttonDiv.setStyle({position:"absolute",top:0,left:px(div.offsetWidth-32)});var buttonImg=document.createElement("input");buttonImg.type="image";buttonImg.src=this.widgetPath.stringByAppendingPathComponent("comment_close_up.tiff");buttonDiv.insertBefore(buttonImg,null);div.insertBefore(buttonDiv,null);buttonImg.onmouseover=function()
{buttonImg.src=this.widgetPath.stringByAppendingPathComponent("comment_close_over.tiff");}.bind(this);buttonImg.onmouseout=function()
{buttonImg.src=this.widgetPath.stringByAppendingPathComponent("comment_close_up.tiff");}.bind(this);buttonImg.onmousedown=function()
{buttonImg.src=this.widgetPath.stringByAppendingPathComponent("comment_close_down.tiff");}.bind(this);buttonImg.onmouseup=function()
{buttonImg.src=this.widgetPath.stringByAppendingPathComponent("comment_close_up.tiff");userInfo={"commentID":item.commentID};this.preferences.postNotification("BLPageModelCommentDeleteRequestNotification",userInfo);}.bind(this);}},applyLocalization:function(parent)
{var localizedSpans=parent.select(".comment-localized");localizedSpans.each(function(span)
{var key=getTextFromNode(span);span.update(this.localizedString(key));}.bind(this));},renderCommentItems:function()
{trace('>renderCommentItems(%s)',arguments[0]===undefined?"":arguments[0]);trace(' for ',this.lastRequestURL);var contentDiv=this.getElementById(this.contentDivID);var headerTemplateNode=this.getElementById(this.headerTemplateID);var itemTemplateNode=this.getElementById(this.itemTemplateID);var separatorTemplateNode=this.getElementById(this.separatorTemplateID);var footerTemplateNode=this.getElementById(this.footerTemplateID);var noData=(this.data===undefined)||(this.data.items===null);var noTemplate=(headerTemplateNode===null)||(footerTemplateNode===null);if(noData||noTemplate)
{trace('<renderCommentItems(%s)',noData?'no data':'no template');contentDiv.update();if(this.privateCommentsDidRender)
this.privateCommentsDidRender();return;}
var commentsEnabled=this.data.commentsEnabled;var commentCount=this.data.items.count;var showHeader=this.data.items.length>0;var showBody=this.data.items.length>0;var showFooter=commentsEnabled;this.setVisibility(showHeader||showBody||showFooter);trace("rendering %s items, comments %s",this.data.items.length,this.data.commentsEnabled?"enabled":"disabled");if(this.resourceUrl!=this.lastResourceUrl)
{trace('rebuilding content structure');contentDiv.update();var newHeaderNode=headerTemplateNode.cloneNode(true);adjustNodeIds(newHeaderNode,0);var newFooterNode=footerTemplateNode.cloneNode(true);adjustNodeIds(newFooterNode,0);contentDiv.insertBefore(newHeaderNode,null);contentDiv.insertBefore(newFooterNode,null);$(newHeaderNode).setVisibility(showHeader);$(newFooterNode).setVisibility(showFooter);var manageAppUrl=(this.runningInApp)?"":manageAppUrlForPath(this.resourcePath);substituteAttributes(contentDiv,[["$manage-app-url$",manageAppUrl],["$manage-tooltip$",this.localizedString("Manage Comments for this Entry")],["$WIDGET_PATH",this.widgetPath]]);var postLinks=contentDiv.select(".comment-post");$A(postLinks).each(function(link)
{link.href="#";link.onclick=function()
{if(!this.runningInApp)
{var windowRules='menubar=no,resizable=no,height=580,width=435';var windowName="comment_"+this.resourcePath.lastPathComponent();windowName=windowName.replace(/[^A-Za-z0-9_]/g,"_");globalCommentWindow=window.open(commentsAppUrlForPath(this.resourcePath),windowName,windowRules);this.pollForCommentWindowToClose();}}.bind(this);}.bind(this));this.applyLocalization(contentDiv);}
if(this.data===undefined)
{trace('<renderCommentItems(%s)',' exit: no data');return;}
contentDiv.select(".comment-manage-link").each(function(link)
{link.style.display=(this.data.items.length>0)?"":"none";}.bind(this));if(this.data.items&&this.data.items.length)
{if(itemTemplateNode===null)
{trace('<renderCommentItems(%s)',' exit: no template');return;}
substituteSpans(contentDiv,{"comment-value-comment-count":["text",this.commentCountText(this.data.items.length,true)]});var footerDiv=this.getElementById(this.footerTemplateID,0);for(var i=0;i<this.data.items.length;++i)
{var item=this.data.items[i];var itemNode=this.getElementById(this.itemID,i);if(itemNode===null)
{itemNode=itemTemplateNode.cloneNode(true);itemNode.id=this.getInstanceId(this.itemID);adjustNodeIds(itemNode,i);contentDiv.insertBefore(itemNode,footerDiv);}
item.body=item.body.replace(/\r\n/g,"<br />");substituteSpans(itemNode,{"comment-value-author":["text",item.authorID],"comment-value-date":["text",item.createDate],"comment-value-body":["html",item.body]});this.applyLocalization(itemNode);var attachmentDiv=this.getElementById("attachment",i);if(attachmentDiv)
{if(item.attachments&&item.attachments.length)
{var attachment=item.attachments[0];var previewUrl=attachment.previewUrl;if(previewUrl===undefined)
{previewUrl=attachment.urlPreview;}
if(previewUrl===undefined)
{previewUrl=this.widgetPath.stringByAppendingPathComponent("attach_generic_big.png");}
if(previewUrl.startsWith("?"))
{previewUrl=this.resourceUrl+previewUrl;}
var downloadUrl=this.resourceUrl+attachment.urlDownload;var displayName=attachment.displayname;if(displayName===undefined)
{displayName=attachment.filename;}
var fileInfo=this.formatDisplayName(displayName,attachment.size);substituteAttributes(attachmentDiv,[["$attachment-url$",downloadUrl],["$preview-url$",previewUrl],["$attachment-tooltip$",attachment.mimetype]]);var anchor=attachmentDiv.select('a');if(anchor&&anchor[0])
{anchor[0].style.textDecoration="none";}
if(previewUrl)
{var previewHeight=attachment.previewHeight;if(previewHeight===undefined)
{previewHeight=32;}
var previewWidth=attachment.previewWidth;if(previewWidth===undefined)
{previewWidth=32;}
attachmentDiv.select('img').each(function(image){if(image.src==previewUrl)
{image.width=previewWidth;image.height=previewHeight;}});}
var fileInfoSpan=this.getElementById("attachment-file-info",i);if(!this.isImage(attachment.mimetype))
{if(fileInfoSpan)
{substituteSpans(fileInfoSpan,{"comment-value-file-info":["text",fileInfo]});}}
else
{fileInfoSpan.style.display="none";}}
else
{$(attachmentDiv.hide());}}
replaceLinkTargets(itemNode,[[/\$author-url\$/g,item.authorURL],[/\$attachment-link\$/g,item.attachmentLink]]);if((item.authorURL!==undefined)&&(item.authorURL!=""))
{var authorSpans=itemNode.select('.comment-value-author');if(authorSpans)
{var authorSpan=authorSpans[0];var anchor=document.createElement("a");anchor.href=item.authorURL;authorSpan.parentNode.insertBefore(anchor,authorSpan);anchor.appendChild(authorSpan);}}
var newSep=null;if(separatorTemplateNode&&(i<this.data.items.length-1))
{newSep=this.getElementById(this.separatorTemplateID,i);if(newSep==null)
{newSep=separatorTemplateNode.cloneNode(true);adjustNodeIds(newSep,i);contentDiv.insertBefore(newSep,footerDiv);}}
itemNode.style.display="";if(newSep)
{newSep.style.display="";}
if(this.runningInApp)
{this.addDeleteCommentButton(itemNode,item);}}
var index=this.data.items.length;while(true)
{if(index>0)
{var sep=this.getElementById(this.separatorTemplateID,index-1);if(sep)
{sep.parentNode.removeChild(sep);}}
var node=this.getElementById(this.itemID,index);if(node===null)
{break;}
node.parentNode.removeChild(node);index++;}}
if(windowsInternetExplorer)
{fixAllIEPNGs(transparentGifURL());setTimeout(fixupIEPNGBGsInTree.bind(null,contentDiv,true),1);}
if(windowsInternetExplorer&&effectiveBrowserVersion<7)
{$(contentDiv).select('div').each(function(div)
{if(div.style.borderTop)
{var child=document.createElement('div');div.insertBefore(child,div.firstChild);child.style.borderTop=div.style.borderTop;div.style.borderTop='';child.style.paddingTop=div.style.paddingTop;div.style.paddingTop='';child.style.position='relative';}
if(div.style.borderBottom)
{var child=document.createElement('div');div.appendChild(child);child.style.borderBottom=div.style.borderBottom;div.style.borderBottom='';child.style.paddingBottom=div.style.paddingBottom;div.style.paddingBottom='';child.style.position='relative';}});}
trace("<renderCommentItems exit: done",this.data.items.length,"items");if(!this.didScrollToCommentLayerIfNecessary)
{commentLayerLinkAssist();this.didScrollToCommentLayerIfNecessary=true;}
if(this.privateCommentsDidRender)
{window.setTimeout(function(){this.privateCommentsDidRender()}.bind(this),50);}
if(this.debugFinalHtml)
{setTimeout(function()
{print(contentDiv.outerHTML);},5000);this.debugFinalHtml=false;}},fetchAndRenderComments:function()
{trace('fetchAndRenderComments, url=',this.resourceUrl);delete this.data;if(this.resourceUrl==null)
{this.renderCommentItems();return;}
var commentsURL=this.resourceUrl+"?wsc=entry.js&ts="+(new Date().getTime());trace("fetching",commentsURL);var renderCommentsFromJSON=function(commentsURL,request)
{if(this.lastRequestURL==commentsURL)
{trace('>renderCommentsFromJSON',this.lastRequestURL);var jsonData=String(request.responseText);jsonData=jsonData.replace(/^data\(/,"");jsonData=jsonData.replace(/\);$/,"");if((jsonData.length>0)&&(jsonData.charAt(0)=="{"))
{try
{this.data=eval('('+jsonData+')');if(this.data.commentsEnabled)
{if(typeof this.data.commentsEnabled=="string")
{this.data.commentsEnabled=(this.data.commentsEnabled=="true");}}}
catch(e)
{}}
this.renderCommentItems();trace('<renderCommentsFromJSON');}}.bind(this,commentsURL);new Ajax.Request(commentsURL,{method:'get',onComplete:renderCommentsFromJSON});this.lastRequestURL=commentsURL;}});function commentLayerLinkAssist()
{try
{if(location.hash=='#comment_layer')
{var node=$('comment_layer');if(node)
{var offsetY=node.offsetTop;while(node.offsetParent!==null)
{node=node.offsetParent;offsetY=offsetY+node.offsetTop;}
window.scrollTo(0,offsetY);}}}
catch(e)
{}}
function substituteAttributes(node,substitutionArray)
{['href','-src','title','alt'].each(function(name)
{value=node.readAttribute(name);if(value)
{$A(substitutionArray).each(function(substitution){var pattern=substitution[0];var replacement=substitution[1];if((window.windowsInternetExplorer)&&(((pattern=="$manage-app-url$")||(pattern=="$attachment-url$")))&&(value&&(typeof value=="string")&&value.indexOf(pattern)!=-1))
{value=replacement;}
else
{value=value.plaintextgsub(pattern,replacement);}
if(value!=node.readAttribute(name))
{if(name=="-src")
{node.removeAttribute("-src");name="src";}
node.setAttribute(name,value);}});}});for(var ni=0;ni<node.childNodes.length;++ni)
{var childNode=node.childNodes[ni];if(childNode.nodeType==Node.ELEMENT_NODE)
{substituteAttributes(childNode,substitutionArray);}}}
function replaceLinkTargets(node,replaceArray)
{var links=$(node).select('a');for(var j=0;j<links.length;++j)
{var linkTarget=links[j].getAttribute("href");if(linkTarget&&linkTarget.length>0)
{for(var i=0;i<replaceArray.length;++i)
{linkTarget=linkTarget.replace(replaceArray[i][0],replaceArray[i][1]);}
links[j].setAttribute("href",linkTarget);}}}
function commentsAppUrlForPath(path)
{return commentsAppURL+'?url='+encodeURIComponent(decodeURIComponent(path));}
function manageAppUrlForPath(path)
{return manageCommentsAppURL+'?url='+encodeURIComponent(decodeURIComponent(path));}
function resourcePathFromUrl(dotMacAccount,url)
{var result;if(url.startsWith("http://web.me.com/"))
{result=url.replace(/http:\/\/[^\/]*\//,"/");}
else
{result=url.replace(/http:\/\/[^\/]*\//,"/"+dotMacAccount+"/");}
return result;}
