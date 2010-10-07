/**
 * @license RequireJS jsonp Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
 * Available via the MIT, GPL or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint nomen: false, plusplus: false */
/*global require: false, setTimeout: false */
"use strict";

(function () {
    var countId = 0;
	var finished = false;
	var started = false;
	var o3 = 0;
	var moduleNames = [];
    //A place to hold callback functions
    require._jsonp = {};

    require.plugin({
		prefix: "o3",

        /**
         * This callback is prefix-specific, only gets called for this prefix
         */
        require: function (name, deps, callback, context) {
            //No-op, require never gets these jsonp items, they are always
            //a dependency, see load for the action.
		},

        /**
         * Called when a new context is defined. Use this to store
         * context-specific info on it.
         */
        newContext: function (context) {
            require.mixin(context, {
                jsonpWaiting: []
            });
        },

        /**
         * Called when a dependency needs to be loaded.
         */
        load: function (name, contextName) {
			var context = require.s.contexts[contextName];
			context.loaded[name] = false;
			require.ready(function() {
				if (!o3){					
					var objHtml = '<object id="o3demo" width="100"'
						+ ' height="100" classid="CLSID:8A66ECAC-63FD-4AFA-9D42-3034D18C88F4"' 
						+ '>';
					document.body.appendChild(
					 document.createElement("div")).innerHTML = objHtml;        
				  
					o3 = document.getElementById("o3demo");
				}	
					//o3 = new ActiveXObject("O3Demo-8A66ECAC-63FD-4AFA-9D42-3034D18C88F4");

				//var context = require.s.contexts[contextName];
				alert(name);
				o3.require(name);
				context.loaded[name] = true;
				moduleNames.push(name);
				//require.checkLoaded(contextName);
				//head.appendChild(node);			
			});
        },

        /**
         * Called when the dependencies of a module are checked.
         */
        checkDeps: function (name, deps, context) {
            //No-op, checkDeps never gets these jsonp items, they are always
            //a dependency, see load for the action.
        },

        /**
         * Called to determine if a module is waiting to load.
         */
        isWaiting: function (context) {
			false;//return !loaded;
        },

        /**
         * Called when all modules have been loaded.
         */
        orderDeps: function (context) {
			if (!started) {
				started = true
				var loaded = function() {
					alert("components loaded");				
					finished = true;
				}
						
				var loaderror = function() {
					alert('kabooom!!!');
				}		
				
				var approve = function() {
					alert('approve');
				}
				
				o3.ondone = loaded;
				//o3obj.onprogress = progress;
				o3.onfail = loaderror;
				o3.onapprove = approve;            			
				o3.loadModules();
				context.externalWait = function() {					
					return !finished;
				}
			}
        }
    });
}()); 