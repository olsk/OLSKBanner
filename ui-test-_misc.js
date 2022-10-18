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
			browser.assert.hasClass(OLSKBanner, 'OLSKDecor');
		});

		it('sets lang', function () {
			browser.assert.attribute(OLSKBanner, 'lang', 'en');
		});

	});

	describe('OLSKBannerButton', function() {

		it('sets href', function () {
			browser.assert.attribute(OLSKBannerButton, 'href', item.OLSKBannerInfoURL);
		});

	});

	describe('OLSKBannerBlurb', function() {

		it('sets aria-hidden', function () {
			browser.assert.attribute(OLSKBannerBlurb, 'aria-hidden', 'true');
		});

		it('sets html', function () {
			browser.assert.OLSKInnerHTML(OLSKBannerBlurb, item.OLSKBannerInfoHTML + '&nbsp;');
		});

	});

	describe('OLSKBannerButtonImage', function() {

		it('sets src', function () {
			browser.assert.attribute(OLSKBannerButtonImage, 'src', 'https://static.rosano.ca/_shared/_OLSKSharedGoIcon.svg');
		});

	});

});
