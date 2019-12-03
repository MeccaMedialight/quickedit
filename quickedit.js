// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
// https://github.com/umdjs/umd
/* global jQuery define: false */
/* eslint-env commonjs */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluginName = 'quickEdit';
    function Plugin(element, options) {
        var el = element,
        	$this = $(element),
        	defaults = $.extend({}, $.fn.quickEdit.defaults);
        
        if ($this.is('p')) {
            defaults.allowReturn = false;
        }
        options = $.extend({}, defaults, options);

        // init this instance
        function init() {
            var
                    id = $this.attr('id'),
                    ht = (options.html) ? $this.html() : $this.text();

            if (!id) {
                id = 'editable' + Math.round(Math.random() * 99999);
                $this.attr('id', id); // todo: decide if dont need to add the id?
            }
            $this.prop('contenteditable', true).addClass('editable');
            $this.data('before', ht); // stash the current value
            $this.data('original', ht);
            $this.data('ocol', $this.css('color'));
            $this.on("change.quickEdit", function () {
                handleUpdate($this);
            });
            bindEvents(id);
            hook('onInit');
        }

        function bindEvents(id) {
            $this.on('focus.' + id, function (e) {
                showEditing($this);
                checkChange($this, options.submitOnBlur);
                return false;
            }).on('blur.' + id, function (e) {
                checkChange($this, options.submitOnBlur);
                return false;
            }).on('keydown.' + id, function (e) {
                if (!options.allowReturn) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        var $this = $(this);
                        checkChange($this);
                        return false;
                    }
                }
                if ((e.ctrlKey || e.metaKey) && e.which !== 83) {
                    var k = String.fromCharCode(e.which).toLowerCase();
                    switch (k) {
                        case 'b':
                            e.preventDefault();
                            applyFormat('bold');
                            return false;
                        case 'i':
                            e.preventDefault();
                            applyFormat('italic');
                            return false;
                        case 'u':
                            e.preventDefault();
                            applyFormat('underline');
                            return false;
                    }
                }
            });


        }

        function checkChange($this, trigger) {
            var current = (options.html) ? $this.html() : $this.text(), prev = $this.data('before');
            if (prev !== current) {
                showEditing($this);
                if (trigger)
                    $this.trigger('change');
            }
        }

        function showEditing($this) {
           if (options.onEditing){
                // we have a callback - so use that
                 var current = (options.html) ? $this.html() : $this.text();
                options.onEditing.call($this, current);
            
            }
        }

        function handleUpdate($this) {
            var
                    current = (options.html) ? $this.html() : $this.text(),
                    id = $this.attr('id'),
                    data = {
                        id: id,
                        value: current
                    };

            $this.data('before', current);

            if (options.onSave) {
                // we have a callback - so use that
                options.onSave.call($this, current);
                return;
            }
            // no specific callback... so  see if we have a target selector of 
            // an input  or a url for an ajax post
            var url = $this.data('url'), // url to submit the change to 
                    target = $this.data('target'); // ... or update a form input 
            if (target) {
                // have input to update
                var $target = $("input[name='" + target + "']:input");
                if ($target.length) {
                    $("input[name='" + target + "']").val(current.replace(/^\s+|\s+$/g, ""));
                    options.onSaved.call($this, current);
                    return true;
                }
            } else {
                // submit the change with ajax
               if (!url){
                url = $this.data('api');// 
               }
               if (url){
                    $.ajax({
                        cache: false,
                        url: url,
                        type: 'post',
                        data: data,
                        success: function (json) {
                            options.onSaved.call($this, current, json);
                        }
                    });
                    return true;
                }
            }
        }
        // execute formatting command and set focus
        function applyFormat(sCmd, sValue) {
            document.execCommand(sCmd, false, sValue);
            $this.focus();
        }
        // set and get option
        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        function revert() {
           hook('onRevert');
           var tmp;
           if  (options.html){
                 tmp = $this.html();
                $this.html($this.data('original'));
           } else {
                 tmp = $this.text();
                $this.text($this.data('original'));
           }
           
           $this.data('original', tmp);
        }


        function destroy() {
            $this.each(function () {
                var $this = $(this);

                // Add code to restore the element to its original state...
                hook('onDestroy');
                $this.removeData('plugin_quickEdit');
                $this.prop('contenteditable', false).removeClass('editable');
            });
        }

        function hook(hookName) {
            if (options[hookName] !== undefined) {
                options[hookName].call(el);
            }
        }

        init();

        return {
            option: option,
            revert: revert,
            destroy: destroy,
            applyFormat: applyFormat
        };
    }

    $.fn.quickEdit = function (options) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function () {
                if ($.data(this, 'plugin_quickEdit') && typeof $.data(this, 'plugin_quickEdit')[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_quickEdit')[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.');
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {
            return this.each(function () {
                if (!$.data(this, 'plugin_quickEdit')) {
                    $.data(this, 'plugin_quickEdit', new Plugin(this, options));
                }
            });
        }
    };

    $.fn.quickEdit.defaults = {
        element: null,
        allowReturn: true,
        submitOnBlur: true,
        html: false, // if true, use HTML rather than text
        onEditing: null, // callback to show edit state
        onSave: null, // callback to handle saving
        onSaved: function () {} // callback after auto saving
    };
}));
