"use strict";

{
	const SDK = self.SDK;

	////////////////////////////////////////////
	// The plugin ID is how Construct identifies different kinds of plugins.
	// *** NEVER CHANGE THE PLUGIN ID! ***
	// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
	// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
	// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
	// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
	// and create an entirely new plugin with a different plugin ID.
	const PLUGIN_ID = "eren_poki";
	////////////////////////////////////////////
	
	const PLUGIN_VERSION = "1.0.0.0";
	const PLUGIN_CATEGORY = "platform-specific";
	
	let app = null;
	
	const PLUGIN_CLASS = SDK.Plugins.eren_poki = class eren_pokiPlugin extends SDK.IPluginBase
	{
		constructor()
		{
			super(PLUGIN_ID);
			
			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
			
			this._info.SetName(self.lang(".name"));
			this._info.SetDescription(self.lang(".description"));
			this._info.SetIcon("icon.png", "image/png");
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("Eren");
			this._info.SetHelpUrl(self.lang(".help-url"));
			this._info.SetIsSingleGlobal(true);
			
			// Only support the newer C3 runtime
			this._info.SetSupportedRuntimes(["c3"]);
			// Load domSide.js in the document context (main thread).
			// This is important for supporting the runtime's web worker mode.
			this._info.SetDOMSideScripts(["c3runtime/domSide.js"]);
			
			SDK.Lang.PushContext(".properties");
			
			this._info.SetProperties([
				new SDK.PluginProperty("combo", "debug_mode", {initialValue:"true", items:["true","false"]})
			]);
			
			SDK.Lang.PopContext();		// .properties
			
			SDK.Lang.PopContext();
		}
	};
	
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}