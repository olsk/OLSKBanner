const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKBanner: '.OLSKBanner',
	OLSKBannerLink: '.OLSKBannerLink',
	OLSKBannerBlurb: '.OLSKBannerBlurb',
	OLSKBannerLinkImage: '.OLSKBannerLinkImage',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('OLSKBanner_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKBanner', function () {
		browser.assert.elements(OLSKBanner, 1);
	});

	it('shows OLSKBannerLink', function () {
		browser.assert.elements(OLSKBannerLink, 1);
	});

	it('shows OLSKBannerBlurb', function () {
		browser.assert.elements(OLSKBannerBlurb, 1);
	});

	it('shows OLSKBannerLinkImage', function () {
		browser.assert.elements(OLSKBannerLinkImage, 1);
	});

});
