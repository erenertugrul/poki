"use strict";

{
	const DOM_COMPONENT_ID = "eren_poki";


	const HANDLER_CLASS = class eren_pokiHandler extends self.DOMHandler
	{
		constructor(iRuntime)
		{
			super(iRuntime, DOM_COMPONENT_ID);
			(()=>{var e=function(e){var n=RegExp("[?&]"+e+"=([^&]*)").exec(window.location.search);return n&&decodeURIComponent(n[1].replace(/\+/g," "))},n="kids"===e("tag"),t=new(function(){function e(){var e=this;this.queue=[],this.init=function(n){return void 0===n&&(n={}),new Promise((function(t,o){e.enqueue("init",[n],t,o)}))},this.rewardedBreak=function(){return new Promise((function(e){e(!1)}))},this.commercialBreak=function(n){return new Promise((function(t,o){e.enqueue("commercialBreak",[n],t,o)}))},this.displayAd=function(e,n,t){t&&t()},this.withArguments=function(n){return function(){for(var t=[],o=0;o<arguments.length;o++)t[o]=arguments[o];e.enqueue(n,t)}},this.handleAutoResolvePromise=function(){return new Promise((function(e){e()}))},this.throwNotLoaded=function(){console.debug("PokiSDK is not loaded yet. Not all methods are available.")},this.doNothing=function(){}}return e.prototype.enqueue=function(e,t,o,i){var r={fn:e,args:t||[],resolveFn:o,rejectFn:i};n?i&&i():this.queue.push(r)},e.prototype.dequeue=function(){for(var e=this,n=function(){var n,o,i=t.queue.shift(),r=i,u=r.fn,a=r.args;if("function"==typeof window.PokiSDK[u])if((null==i?void 0:i.resolveFn)||(null==i?void 0:i.rejectFn)){var s="init"===u;if((n=window.PokiSDK)[u].apply(n,a).catch((function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];"function"==typeof i.rejectFn&&i.rejectFn.apply(i,n),s&&setTimeout((function(){e.dequeue()}),0)})).then((function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];"function"==typeof i.resolveFn&&i.resolveFn.apply(i,n),s&&setTimeout((function(){e.dequeue()}),0)})),s)return"break"}else(o=window.PokiSDK)[u].apply(o,a);else console.error("Cannot execute "+u)},t=this;this.queue.length>0;){if("break"===n())break}},e}());window.PokiSDK={init:t.init,initWithVideoHB:t.init,commercialBreak:t.commercialBreak,rewardedBreak:t.rewardedBreak,displayAd:t.displayAd,destroyAd:t.doNothing,getLeaderboard:t.handleAutoResolvePromise,shareableURL:function(){return new Promise((function(e,n){return n()}))},getURLParam:function(n){return e("gd"+n)||e(n)||""},getLanguage:function(){return navigator.language.toLowerCase().split("-")[0]},isAdBlocked:function(){}},["captureError","customEvent","gameInteractive","gameLoadingFinished","gameLoadingProgress","gameLoadingStart","gameplayStart","gameplayStop","happyTime","logError","muteAd","roundEnd","roundStart","sendHighscore","setDebug","setDebugTouchOverlayController","setPlayerAge"].forEach((function(e){window.PokiSDK[e]=t.withArguments(e)}));var o,i=((o=window.pokiSDKVersion)||(o=e("ab")||"v2.274.0"),"https://game-cdn.poki.com/scripts/"+o+"/poki-sdk-"+(n?"kids":"core")+"-"+o+".js"),r=document.createElement("script");r.setAttribute("src",i),r.setAttribute("type","text/javascript"),r.setAttribute("crossOrigin","anonymous"),r.onload=function(){return t.dequeue()},document.head.appendChild(r)})();
			this.AddRuntimeMessageHandlers([
                ["init", e => this._init(e)],
                ["rewardedbreak", () => this._rewardedbreak()],
                ["gameplay", e => this._gameplay(e)],
                ["happytime", e => this._happytime(e)],
                ["commercialbreak",e =>this._commercialbreak(e)]
            ])


		}
		async _init(e)
		{
           var debug_mode = e["a"];
	    	var adblock = false;
	    	var self = this;
	    	PokiSDK["init"]().then(
		    () => {
		    	PokiSDK["gameLoadingStart"]();
		    	adblock = false;
		    	if (debug_mode == 0){
					PokiSDK["setDebug"](true);
				}
				else{
					PokiSDK["setDebug"](false);
				}
	            self.PostToRuntime("adblock", {
                    "a": false
    			});
		        console.log("Poki SDK successfully initialized");
	            self.PostToRuntime("init");
		        PokiSDK["gameLoadingFinished"]();
		    }   
			).catch(
			    () => {
			    	adblock = true;
			    	if (debug_mode == 1){
						PokiSDK["setDebug"](true);
					}
					else{
						PokiSDK["setDebug"](false);
					}
		            self.PostToRuntime("adblock", {
                    "a": true
        			});
        			self.PostToRuntime("init");
			        console.log("Initialized, but the user likely has adblock");

			    }   
			);
		}
		_gameplay(e)
		{
			if (e["a"] == 0)
				PokiSDK["gameplayStart"]();
			else
				PokiSDK["gameplayStop"]();
		}
		_commercialbreak()
		{
        	this.PostToRuntime("suspended", {"a": true});
			var self = this;
			PokiSDK["gameplayStop"]();
			PokiSDK["commercialBreak"]().then(
		    (a) => {
		    	if (a[0].type == "pokiAdsCompleted")
		    	{
			    	self.PostToRuntime("suspended", {"a": false,"b":1});
		        	console.log("Commercial break finished, proceeding to game");
		        	PokiSDK["gameplayStart"]();
		    	}
		    	else
		    	{
		    		self.PostToRuntime("suspended", {"a": false,"b":0});
		    		console.log("Commercial break errored, proceeding to game");
		        	PokiSDK["gameplayStart"]();
		    	}
		    	}
			);
		}
		_rewardedbreak()
		{
            this.PostToRuntime("suspended", {"a": true});
			PokiSDK["gameplayStop"]();
			var self = this;
			PokiSDK["rewardedBreak"]().then(
		    (success) => {
		        if(success) {
              		self.PostToRuntime("suspended", {"a": false,"b":1});
              		console.log("video was displayed, give reward");
		          	PokiSDK["gameplayStart"]();
		        }
		        else {
        			self.PostToRuntime("suspended", {"a": false,"b":0});
        			console.log("video not displayed, should probably not give reward")
		          PokiSDK["gameplayStart"]();
		        }
		    });
		}
		_happytime(e)
		{
			PokiSDK["happyTime"](e["a"]);
		}
	};
	
	self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}