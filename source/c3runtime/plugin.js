"use strict";

{
	const C3 = self.C3;

	// NOTE: use a unique DOM component ID to ensure it doesn't clash with anything else
	// This must also match the ID in instance.js and domSide.js.
	const DOM_COMPONENT_ID = "eren_poki";
	
	// NOTE: DOM plugins derive from C3.SDKDOMPluginBase, not C3.SDKPluginBase.
	C3.Plugins.eren_poki = class eren_pokiPlugin extends C3.SDKPluginBase
	{
		constructor(opts)
		{
			super(opts, DOM_COMPONENT_ID);
			
		}
		
		Release()
		{
			super.Release();
		}
	};
}