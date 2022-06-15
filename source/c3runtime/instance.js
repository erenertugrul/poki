"use strict";

{
	const C3 = self.C3;

	// NOTE: use a unique DOM component ID to ensure it doesn't clash with anything else.
	// This must also match the ID in plugin.js and domSide.js.
	const DOM_COMPONENT_ID = "eren_poki";

	// NOTE: DOM instances derive from C3.SDKDOMInstanceBase, not C3.SDKWorldInstanceBase.
	C3.Plugins.eren_poki.Instance = class eren_pokiInstance extends C3.SDKInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst, DOM_COMPONENT_ID);
			this.debug_mode = properties[0];

	    	this.adblock = false;
            this.AddDOMMessageHandlers([
                ["adblock", e => this._adblock(e)],
                ["suspended", e => this._suspended(e)],
                ["init", () => this._init()]
            ]);
            runOnStartup(async runtime => {
					runtime.addEventListener("beforeprojectstart", () => {
						this.PostToDOMAsync("init",{"a":this.debug_mode});
					});
				});
           /* const rt = this._runtime.Dispatcher();
            this._disposables = new C3.CompositeDisposable(C3.Disposable.From(rt, "beforeprojectstart",() => this._OnAfterFirstLayoutStart()));
*/

		}
		
		Release()
		{
			super.Release();
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
		_OnAfterFirstLayoutStart()
		{
			this.PostToDOM("init",{"a":this.debug_mode});
		}

		_adblock(e)
		{
			this.adblock = e["a"];
		}

		_suspended(e)
		{
			if (e["a"] == true)
			{
				this._runtime.SetSuspended(true);
			}
			else if (e["a"] == false)
			{
				this._runtime.SetSuspended(false);
				if(e["b"] == 1)
				{
					this.Trigger(C3.Plugins.eren_poki.Cnds.AdFinished,this);
				}
				else
				{
					this.Trigger(C3.Plugins.eren_poki.Cnds.AdError,this);
				}
			}
		}
		_init()
		{
			this.Trigger(C3.Plugins.eren_poki.Cnds.OnInit,this);
		}
		GetScriptInterfaceClass()
		{
			return self.Ieren_pokiInstance;
		}
	};
	
	// Script interface. Use a WeakMap to safely hide the internal implementation details from the
	// caller using the script interface.
	const map = new WeakMap();
	
	self.Ieren_pokiInstance = class Ieren_pokiInstance extends self.IDOMInstance {
		constructor()
		{
			super();
			
			// Map by SDK instance
			map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
		}

		// Example setter/getter property on script interface
		set text(t)
		{
			map.get(this)._SetText(t);
		}

		get text()
		{
			return map.get(this)._GetText();
		}
	};
}