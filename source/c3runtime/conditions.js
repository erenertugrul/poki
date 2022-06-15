"use strict";

{
	self.C3.Plugins.eren_poki.Cnds =
	{
		OnInit()
		{
			return true;
		},
		AdFinished()
		{
			return true;
		},
		AdError()
		{
			return true;
		},
		Adblock()
		{
			return this.adblock;
		}
	};
}