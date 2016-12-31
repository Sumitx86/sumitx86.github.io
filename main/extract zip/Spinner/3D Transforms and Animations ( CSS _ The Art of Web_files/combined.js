/*
 * included minified: ajaxrequest.js
 */
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function AjaxRequest(){var req = false;var method = "GET";var nocache = false;var initialHandler = false;var callbackTarget = false;var callbackParams = [];// define public methods
this.loadXMLDoc = function(url, params){try {req = new XMLHttpRequest();if(!initialHandler) initialHandler = processReqChange;req.onreadystatechange = initialHandler;if(nocache) {params += (params != '') ? '&' + (new Date()).getTime() : (new Date()).getTime();}
if(method == "POST") {req.open("POST", url, true);req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');req.send(params);} else { // send GET request
if(params) url += "?" + params;req.open(method, url, true);req.send(null);}
return true;} catch(e) {return false;}
}
this.setMethod = function(newmethod) { method = newmethod.toUpperCase(); }
this.nocache = function() { nocache = true; }
this.setHandler = function(fn) { initialHandler = fn; }
this.setCallback = function(fn) { callbackTarget = fn; }
this.getResponse = function() { return req; }
// define private methods
var getNodeValue = function(parent, tagName){var node = parent.getElementsByTagName(tagName)[0];return (node && node.firstChild) ? node.firstChild.nodeValue : false;}
var processReqChange = function() 
{if(req.readyState != 4 || req.status != 200) return;// received XML response
if(req.responseXML == null) {window.console.log("Invalid XML response - please check the Ajax response data for invalid characters or formatting");}
var response  = req.responseXML.documentElement;var commands = response.getElementsByTagName('command');for(var i=0; i < commands.length; i++) {method = commands[i].getAttribute('method');switch(method){case 'alert':
var message = getNodeValue(commands[i], 'message');window.alert(message);break;case 'setvalue':
var target = getNodeValue(commands[i], 'target');var value = getNodeValue(commands[i], 'value');if(target && value !== false) {document.getElementById(target).value = value;}
break;case 'setdefault':
var target = getNodeValue(commands[i], 'target');if(target) {document.getElementById(target).value = document.getElementById(target).defaultValue;}
break;case 'focus':
var target = getNodeValue(commands[i], 'target');if(target) {document.getElementById(target).focus();}
break;case 'setcontent':
var target = getNodeValue(commands[i], 'target');var content = getNodeValue(commands[i], 'content');var append = getNodeValue(commands[i], 'append');if(target && (content !== false)) {var el = document.getElementById(target);if(append !== false) {var newcontent = document.createElement("div");newcontent.innerHTML = content;while(newcontent.firstChild) {el.appendChild(newcontent.firstChild);}
} else {el.innerHTML = content;}
}
break;case 'setstyle':
var target = getNodeValue(commands[i], 'target');var property = getNodeValue(commands[i], 'property');var value = getNodeValue(commands[i], 'value');if(target && property && (value !== false)) {document.getElementById(target).style[property] = value;}
break;case 'setproperty':
var target = getNodeValue(commands[i], 'target');var property = getNodeValue(commands[i], 'property');var value = getNodeValue(commands[i], 'value');if(value == "true") value = true;if(value == "false") value = false;if(target && document.getElementById(target)) {document.getElementById(target)[property] = value;}
break;case 'callback':
var idx = 1;var param = getNodeValue(commands[i], "param" + idx++);while(param) {callbackParams.push(param);param = getNodeValue(commands[i], "param" + idx++);}
break;default:
window.console.log("Unrecognised method '" + method + "' in processReqChange()");} // switch
} // for
if(callbackTarget) {callbackTarget.apply(null, callbackParams);}
} // loadXMLDoc
} // AjaxRequest
/*
 * included minified: suggestor.js
 */
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function Suggestor(input, output, ajaxTarget, properties){// this class is suitable for ie9
var input = document.getElementById(input);input.addEventListener("keyup", this, false);var output = document.getElementById(output);output.addEventListener("keydown", this, false);output.addEventListener("keyup", this, false);var ajaxTarget = ajaxTarget;var regex = (properties && properties["regex"]) ? properties["regex"] : false;var delay = (properties && properties["delay"]) ? parseInt(properties["delay"]) : 250;var suggestIdx = 0;var timer;// extra parameters to pass to Ajax script
this.extraParams = {};this.setParam = function(key, val){this.extraParams[key] = val;};this.clearParam = function(key){delete this.extraParams[key];};// hide suggestions list[ and return focus to input field]
this.hide = function(setfocus){if(setfocus !== false) input.focus();output.style['display'] = "none";};// set input value[ and submit form]
this.setvalue = function(newVal, submitForm){input.value = newVal;this.hide();if(submitForm === true) input.form.submit();};// Ajax call to populate ouput list
this.lookup = function(inputValue){if(regex !== false && !inputValue.match(regex)) return false;var req = new AjaxRequest();var queryString = "q=" + encodeURIComponent(inputValue);if(this.extraParams) {for(var x in this.extraParams) {queryString += "&" + encodeURIComponent(x) + "=" + encodeURIComponent(this.extraParams[x]);}
}
req.loadXMLDoc(ajaxTarget, queryString);return true;};// process keyup event in input field
this.inputkeyup = function(e){switch(e.keyCode){case 9:  // Tab
case 13: // Enter
case 27: // Escape
this.hide();return false;case 38: // Up arrow
var suggestArray = output.getElementsByTagName("a");suggestIdx = suggestArray.length - 1;suggestArray[suggestIdx].focus();return false;case 40: // Down arrow
var suggestArray = output.getElementsByTagName("a");suggestIdx = 0;suggestArray[suggestIdx].focus();return false;default:
if(timer) clearTimeout(timer);/* not supported yet in ie9
timer = setTimeout(
function(_this, _val) { _this.lookup(_val); },
delay, this, input.value
);*/
var _this = this;var _val = input.value;var runLookup = function() { _this.lookup(_val); }
timer = setTimeout(runLookup, delay);return true;}
};// process keydown event in output list
this.outputkeydown = function(e){switch(e.keyCode){case 9:  // Tab
case 38: // Up arrow
case 40: // Down arrow
e.preventDefault();return false;}
return true;};// process keyup event in output list
this.outputkeyup = function(e){switch(e.keyCode){case 27: // Escape
this.hide();return false;case 38: // Up arrow
suggestIdx--;break;case 40: // Down arrow
suggestIdx++;break;}
var suggestArray = output.getElementsByTagName("a");if(suggestIdx < 0) {input.focus();} else if(suggestIdx >= suggestArray.length) {suggestIdx = suggestArray.length - 1;} else {suggestArray[suggestIdx].focus();}
return false;};// internal event handling switchboard
this.handleEvent = function(e){if(e.target === input && e.type == "keyup") {return this.inputkeyup(e);} else {switch(e.type){case "keydown":
return this.outputkeydown(e);case "keyup":
return this.outputkeyup(e);}
}
};}
/*
 * included minified: hilitor.js
 */
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function Hilitor(id, tag){var targetNode = document.getElementById(id) || document.body;var hiliteTag = tag || "EM";var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];var wordColor = [];var colorIdx = 0;var matchRegex = "";var openLeft = false;var openRight = false;this.setMatchType = function(type){switch(type){case "left":
this.openLeft = false;this.openRight = true;break;case "right":
this.openLeft = true;this.openRight = false;break;case "open":
this.openLeft = this.openRight = true;break;default:
this.openLeft = this.openRight = false;}
};this.setRegex = function(input){input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");var re = "(" + input + ")";if(!this.openLeft) re = "\\b" + re;if(!this.openRight) re = re + "\\b";matchRegex = new RegExp(re, "i");};this.getRegex = function(){var retval = matchRegex.toString();retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");retval = retval.replace(/\|/g, " ");return retval;};// recursively apply word highlighting
this.hiliteWords = function(node){if(node === undefined || !node) return;if(!matchRegex) return;if(skipTags.test(node.nodeName)) return;if(node.hasChildNodes()) {for(var i=0; i < node.childNodes.length; i++)this.hiliteWords(node.childNodes[i]);}
if(node.nodeType == 3) { // NODE_TEXT
if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {if(!wordColor[regs[0].toLowerCase()]) {wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];}
var match = document.createElement(hiliteTag);match.appendChild(document.createTextNode(regs[0]));match.style.backgroundColor = wordColor[regs[0].toLowerCase()];match.style.fontStyle = "inherit";match.style.color = "#000";var after = node.splitText(regs.index);after.nodeValue = after.nodeValue.substring(regs[0].length);node.parentNode.insertBefore(match, after);}
};};// remove highlighting
this.remove = function(){var arr = document.getElementsByTagName(hiliteTag);while(arr.length && (el = arr[0])) {var parent = el.parentNode;parent.replaceChild(el.firstChild, el);parent.normalize();}
};// start highlighting at target node
this.apply = function(input){this.remove();if(input === undefined || !input) return;this.setRegex(input);this.hiliteWords(targetNode);};}
/*
 * included minified: checkfeedback.js
 */
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
var openModalWindow = function(el){var overlay = document.createElement("div");overlay.style.cssText = "position: absolute; top: 0; z-index: 1000; width: 100%; height: 100%; background: #000; opacity: 0.71; filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);";document.body.appendChild(overlay);var container = document.getElementById(el);container.style.cssText = "display: block; z-index: 1010; position: fixed; left: 50%; top: 50%; max-width: " + (0.8 * overlay.offsetWidth) + "px; max-height: " + (0.8 * overlay.offsetHeight) + "px; overflow: auto; box-shadow: 0 0 50px rgba(0,0,0,0.5);";var overflow = container.offsetHeight - document.documentElement.clientHeight;if(overflow > 0) {container.style.maxHeight = (parseInt(window.getComputedStyle(container).height) - overflow) + "px";}
container.style.marginLeft = (-container.offsetWidth / 2) + "px";container.style.marginTop = (-container.offsetHeight / 2) + "px";var closeModal = function(){document.body.removeChild(overlay);container.style.display = "none";document.removeEventListener("keydown", overlayEscape, false);};var overlayEscape = function(e){if(e.keyCode == 27) closeModal();}
// close modal window on outer click or Esc key press
overlay.addEventListener("click", closeModal, false);document.addEventListener("keydown", overlayEscape, false);};document.addEventListener("DOMContentLoaded", function() {// open feedback window on button click
var arr = document.getElementsByClassName("show_feedback");for(var i=0; i < arr.length; i++) {arr[i].addEventListener("click", function() {openModalWindow("feedback");document.getElementById("field_name").focus();}, false);}
var nameValidityMsg    = "Please enter your Name";var emailValidityMsg   = "Please enter a valid Email address";var websiteValidityMsg = "Please enter a website URL starting with http://";var messageValidityMsg = "Please enter your comment or question";var captchaValidityMsg = "Please enter the five CAPTCHA digits (0-9) in the box provided";if(document.getElementById("feedback_form")) {// fallback form validation for non-HTML5 browsers
var checkFeedbackForm = function(e){if(this.name.value == "") {alert(nameValidityMsg);this.name.focus();e.preventDefault();} else if(this.email.value == "") {alert(emailValidityMsg);this.email.focus();e.preventDefault();} else if(this.message.value == "") {alert(messageValidityMsg);this.message.focus();e.preventDefault();} else  if(!this.captcha.value.match(/^\d{5}$/)) {alert(captchaValidityMsg);this.captcha.focus();e.preventDefault();}
};var feedbackForm = document.getElementById("feedback_form");feedbackForm.addEventListener("submit", checkFeedbackForm, false);// custom html5 validation messages
var supports_input_validity = function(){var i = document.createElement("input");return "setCustomValidity" in i;}
if(supports_input_validity()) {var fldName = feedbackForm.elements["name"];fldName.setCustomValidity(nameValidityMsg);fldName.addEventListener("keyup", function() {this.setCustomValidity(this.validity.valueMissing ? nameValidityMsg : "");}, false);var fldEmail = feedbackForm.elements["email"];fldEmail.setCustomValidity(emailValidityMsg);fldEmail.addEventListener("keyup", function() {this.setCustomValidity((this.validity.valueMissing || this.validity.typeMismatch) ? emailValidityMsg : "");}, false);var fldWebsite = feedbackForm.elements["website"];fldWebsite.addEventListener("keyup", function() {this.setCustomValidity((this.validity.typeMismatch || this.validity.patternMismatch) ? websiteValidityMsg : "");}, false);var fldMessage = feedbackForm.elements["message"];fldMessage.setCustomValidity(messageValidityMsg);fldMessage.addEventListener("keyup", function() {this.setCustomValidity(this.validity.valueMissing ? messageValidityMsg : "");}, false);var fldCaptcha = feedbackForm.elements["captcha_code"];fldCaptcha.setCustomValidity(captchaValidityMsg);fldCaptcha.addEventListener("keyup", function(e) {this.value = this.value.replace(/[^\d]+/g, "");this.setCustomValidity((this.validity.valueMissing || this.validity.patternMismatch) ? captchaValidityMsg : "");}, false);}
}
}, false);