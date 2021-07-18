"use strict";

{
	self.C3.Plugins.eren_poki.Acts =
	{
		gameplay(a)
		{
			if (a == 0)
				PokiSDK.gameplayStart();
			else
				PokiSDK.gameplayStop();
		},
		commercialbreak()
		{
			this._runtime.SetSuspended(true);
			var self = this;
			PokiSDK.gameplayStop();
			PokiSDK.commercialBreak().then(
		    (a) => {
		    	self._runtime.SetSuspended(false);
		    	if (a[0].type == "pokiAdsCompleted")
		    	{
			    	self.Trigger(C3.Plugins.eren_poki.Cnds.adFinished,self);
		        	console.log("Commercial break finished, proceeding to game");
		        	PokiSDK.gameplayStart();
		    	}
		    	else
		    	{
			    	self.Trigger(C3.Plugins.eren_poki.Cnds.adError,self);
		        	console.log("error");
		        	PokiSDK.gameplayStart();
		    	}
		    	}
			);
		},
		rewardedbreak()
		{
			this._runtime.SetSuspended(true);
			PokiSDK.gameplayStop();
			var self = this;
			PokiSDK.rewardedBreak().then(
		    (success) => {
		        if(success) {
		          // video was displayed, give reward
		          self._runtime.SetSuspended(false);
		          self.Trigger(C3.Plugins.eren_poki.Cnds.adFinished,self);
		          PokiSDK.gameplayStart();
		        }
		        else {
		          // video not displayed, should probably not give reward
		          self._runtime.SetSuspended(false);
		          self.Trigger(C3.Plugins.eren_poki.Cnds.adError,self);
		          PokiSDK.gameplayStart();
		        }
		    });
		},
		happytime(a)
		{
			PokiSDK.happyTime(a);
		}
	};
}