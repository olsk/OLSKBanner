const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKBanner_Misc', function () {

	const item = uItem({
		OLSKBannerInfoHTML: Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, item);
	});

	describe('OLSKBanner', function() {

		it('classes OLSKDecor', function () {
			return browser.assert.hasClass(OLSKBanner, 'OLSKDecor');
		});

		it('sets lang', function () {
			return browser.assert.attribute(OLSKBanner, 'lang', 'en');
		});

	});

	describe('OLSKBannerLink', function() {

		it('sets href', function () {
			return browser.assert.attribute(OLSKBannerLink, 'href', item.OLSKBannerInfoURL);
		});

	});

	describe('OLSKBannerBlurb', function() {

		it('sets aria-hidden', function () {
			return browser.assert.attribute(OLSKBannerBlurb, 'aria-hidden', 'true');
		});

		it('sets html', function () {
			return browser.assert.OLSKInnerHTML(OLSKBannerBlurb, item.OLSKBannerInfoHTML + '&nbsp;');
		});

	});

	describe('OLSKBannerLinkImage', function() {

		it('sets src', function () {
			return browser.assert.attribute(OLSKBannerLinkImage, 'src', 'https://static.rosano.ca/_shared/_OLSKSharedGoIcon.svg');
		});

	});

});
