const mod = {

	uItem (inputData = {}) {
		return Object.assign({
			OLSKBannerInfoHTML: '<b>' + Math.random().toString() + '</b>',
			OLSKBannerInfoURL: Math.random().toString(),
		}, inputData);
	},

};

Object.entries(mod).map(function (e) {
	return global[e.shift()] = e.pop();
});

Object.assign(exports, mod);
