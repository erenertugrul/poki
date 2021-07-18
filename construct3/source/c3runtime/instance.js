"use strict";

{
	const C3 = self.C3;

	C3.Plugins.eren_poki.Instance = class eren_pokiInstance extends C3.SDKInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst);
			var debug_mode = properties[0];
	    	this.adblock = false;
	    	var self = this;
	    	PokiSDK.init().then(
		    () => {
		    	PokiSDK.gameLoadingStart();
		    	self.adblock = false;
		    	if (debug_mode == 1){
					PokiSDK.setDebug(true);
				}
				else{
					PokiSDK.setDebug(false);
				}
		        console.log("Poki SDK successfully initialized");

		        PokiSDK.gameLoadingFinished();
		    }   
			).catch(
			    () => {
			    	self.adblock = true;
			    	if (debug_mode == 1){
						PokiSDK.setDebug(true);
					}
					else{
						PokiSDK.setDebug(false);
					}
			        console.log("Initialized, but the user likely has adblock");
			    }   
			);
			
		}
		
		Release()
		{
			super.Release();
		}

		_SetTestProperty(n)
		{
		}

		_GetTestProperty()
		{
		}
		
		SaveToJson()
		{
			return {
				// data to be saved for savegames
			};
		}
		
		LoadFromJson(o)
		{
			// load state for savegames
		}

		GetScriptInterfaceClass()
		{
			return self.IMyeren_pokiInstance;
		}

	};
	
	// Script interface. Use a WeakMap to safely hide the internal implementation details from the
	// caller using the script interface.
	const map = new WeakMap();
	
	self.IMyeren_pokiInstance = class IMyeren_pokiInstance extends self.IInstance {
		constructor()
		{
			super();
			
			// Map by SDK instance
			map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
		}

		// Example setter/getter property on script interface
		set testProperty(n)
		{
			map.get(this)._SetTestProperty(n);
		}

		get testProperty()
		{
			return map.get(this)._GetTestProperty();
		}
	};
}