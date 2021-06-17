const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKBannerStubRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'), {
					OLSKBannerStubItem: Object.assign(require('./mocha-start.js').uItem(), Object.fromEntries((new URLSearchParams(req.query)).entries())),
				});
			},
		}];
	},

	OLSKControllerStaticAssetFiles () {
		return [
			'main.js',
		];
	},

};

Object.assign(exports, mod);
