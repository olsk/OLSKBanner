const mod = {

	uItem (inputData = {}) {
		return Object.assign({
			OLSKBannerBlurbHTML: '<b>' + Math.random().toString() + '</b>',
			OLSKBannerButtonText: Math.random().toString(),
			OLSKBannerButtonLink: Math.random().toString(),
		}, inputData);
	},

};

Object.entries(mod).map(function (e) {
	return global[e.shift()] = e.pop();
});

Object.assign(exports, mod);
