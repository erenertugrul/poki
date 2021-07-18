// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.eren_poki = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.eren_poki.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
    	
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	
	instanceProto.onCreate = function()
	{
		// Read properties set in C3
		var debug_mode = this.properties[0];
		this.adblock = false;
    	var self = this;
    	PokiSDK["init"]().then(
    		function() {
			    PokiSDK["gameLoadingStart"]();
			    	self.adblock = false;
			    	if (debug_mode == 1){
						PokiSDK["setDebug"](true);
					}
					else{
						PokiSDK["setDebug"](false);
					}
			        console.log("Poki SDK successfully initialized");
			        PokiSDK["gameLoadingFinished"]();
			    }   
		)["catch"](
	    	function(){
		    	self.adblock = true;
		    	if (debug_mode == 1){
					PokiSDK["setDebug"](true);
				}
				else{
					PokiSDK["setDebug"](false);
				}
		        console.log("Initialized, but the user likely has adblock");
			}   
		);
	};
	
	instanceProto.saveToJSON = function ()
	{
		return {};
	};
	
	instanceProto.loadFromJSON = function (o)
	{
	};
	
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
	};
	/**END-PREVIEWONLY**/


	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.adError = function ()
	{
		return true;
	};

	Cnds.prototype.adFinished = function ()
	{
		return true;
	};

	Cnds.prototype.adblock = function ()
	{
		return this.adblock;
	};
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.gameplay = function (a)
	{
		if (a == 0)
			PokiSDK["gameplayStart"]();
		else
			PokiSDK["gameplayStop"]();
	};

	Acts.prototype.commercialbreak = function (a)
	{
		this.runtime["setSuspended"](true);
		var self = this;
		PokiSDK["gameplayStop"]();
		PokiSDK["commercialBreak"]()["then"](
			function(a){	
				self.runtime["setSuspended"](false);
		    	if (a[0].type == "pokiAdsCompleted")
		    	{
			    	self.runtime.trigger(cr.plugins_.eren_poki.prototype.cnds.adFinished,self);
		        	console.log("Commercial break finished, proceeding to game");
		        	PokiSDK["gameplayStart"]();
		    	}
		    	else
		    	{
			    	self.runtime.trigger(cr.plugins_.eren_poki.prototype.cnds.adError,self);
		        	console.log("error");
		        	PokiSDK["gameplayStart"]();
		    	}
    		}
    	);  	
	};

	Acts.prototype.rewardedbreak = function ()
	{
		this.runtime["setSuspended"](true);
		PokiSDK["gameplayStop"]();
		var self = this;
		PokiSDK["rewardedBreak"]()["then"](
			function(success){
				if(success) {
		          // video was displayed, give reward
		          self.runtime["setSuspended"](false);
		          self.runtime.trigger(cr.plugins_.eren_poki.prototype.cnds.adFinished,self);
		          PokiSDK["gameplayStart"]();
		        }
		        else {
		          // video not displayed, should probably not give reward
		          self.runtime["setSuspended"](false);
		          self.runtime.trigger(cr.plugins_.eren_poki.prototype.cnds.adError,self);
		          PokiSDK["gameplayStart"]();
		        }
			});
	    
	};
	Acts.prototype.happytime = function (a)
	{
		PokiSDK["happyTime"](a);
	};


	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};


	pluginProto.exps = new Exps();

}());