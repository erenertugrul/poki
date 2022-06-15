"use strict";

{
	self.C3.Plugins.eren_poki.Acts =
	{
		gameplay(a)
		{
			this.PostToDOM("gameplay",{"a":a});
		},
		commercialbreak()
		{
			this.PostToDOM("commercialbreak");
		},
		rewardedbreak()
		{
			this.PostToDOM("rewardedbreak");

		},
		happytime(a)
		{
			this.PostToDOM("happytime",{"a":a});
		}
	};
}