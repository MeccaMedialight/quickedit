!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(n),n}:t(jQuery)}((function(t){function e(e,n){var i,a,o=e,r=t(e),u=t.extend({},t.fn.quickEdit.defaults);function l(t,e){var i=n.html?t.html():t.text();t.data("before")!==i&&(d(t),e&&t.trigger("change"))}function d(t){if(n.onEditing){var e=n.html?t.html():t.text();n.onEditing.call(t,e)}}function c(t,e){document.execCommand(t,!1,e),r.focus()}function f(t){void 0!==n[t]&&n[t].call(o)}return r.is("p")&&(u.allowReturn=!1),n=t.extend({},u,n),i=r.attr("id"),a=n.html?r.html():r.text(),i||(i="editable"+Math.round(99999*Math.random()),r.attr("id",i)),r.prop("contenteditable",!0).addClass("editable"),r.data("before",a),r.data("original",a),r.data("ocol",r.css("color")),r.on("change.quickEdit",(function(){!function(e){var i=n.html?e.html():e.text(),a={id:e.attr("id"),value:i};if(e.data("before",i),n.onSave)n.onSave.call(e,i);else{var o=e.data("url"),r=e.data("target");r?t("input[name='"+r+"']:input").length&&(t("input[name='"+r+"']").val(i.replace(/^\s+|\s+$/g,"")),n.onSaved.call(e,i)):(o||(o=e.data("api")),t.ajax({cache:!1,url:o,type:"post",data:a,success:function(t){n.onSaved.call(e,i,t)}}))}}(r)})),function(e){r.on("focus."+e,(function(t){return d(r),l(r,n.submitOnBlur),!1})).on("blur."+e,(function(t){return l(r,n.submitOnBlur),!1})).on("keydown."+e,(function(e){if(!n.allowReturn&&13===e.keyCode)return e.preventDefault(),l(t(this)),!1;if((e.ctrlKey||e.metaKey)&&83!==e.which)switch(String.fromCharCode(e.which).toLowerCase()){case"b":return e.preventDefault(),c("bold"),!1;case"i":return e.preventDefault(),c("italic"),!1}}))}(i),f("onInit"),{option:function(t,e){if(!e)return n[t];n[t]=e},revert:function(){var t;f("onRevert"),n.html?(t=r.html(),r.html(r.data("original"))):(t=r.text(),r.text(r.data("original"))),r.data("original",t)},destroy:function(){r.each((function(){var e=t(this);f("onDestroy"),e.removeData("plugin_quickEdit"),e.prop("contenteditable",!1).removeClass("editable")}))},applyFormat:c}}t.fn.quickEdit=function(n){if("string"==typeof n){var i,a=n,o=Array.prototype.slice.call(arguments,1);return this.each((function(){if(!t.data(this,"plugin_quickEdit")||"function"!=typeof t.data(this,"plugin_quickEdit")[a])throw new Error("Method "+a+" does not exist on jQuery.");i=t.data(this,"plugin_quickEdit")[a].apply(this,o)})),void 0!==i?i:this}if("object"==typeof n||!n)return this.each((function(){t.data(this,"plugin_quickEdit")||t.data(this,"plugin_quickEdit",new e(this,n))}))},t.fn.quickEdit.defaults={allowReturn:!0,submitOnBlur:!0,html:!1,onEditing:null,onSave:null,onSaved:function(){}}}));