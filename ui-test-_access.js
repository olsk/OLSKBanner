const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKBanner: '.OLSKBanner',
	OLSKBannerBlurb: '.OLSKBannerBlurb',
	OLSKBannerButton: '.OLSKBannerButton',
	OLSKBannerButtonImage: '.OLSKBannerButtonImage',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKBanner_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKBanner', function () {
		browser.assert.elements(OLSKBanner, 1);
	});

	it('shows OLSKBannerBlurb', function () {
		browser.assert.elements(OLSKBannerBlurb, 1);
	});

	it('shows OLSKBannerButton', function () {
		browser.assert.elements(OLSKBannerButton, 1);
	});

	it('shows OLSKBannerButtonImage', function () {
		browser.assert.elements(OLSKBannerButtonImage, 1);
	});

});
