const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKBanner_Misc', function () {

	const item = uItem();

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

	describe('OLSKBannerBlurb', function() {

		it('sets html', function () {
			browser.assert.OLSKInnerHTML(OLSKBannerBlurb, item.OLSKBannerBlurbHTML);
		});

	});

	describe('OLSKBannerButton', function() {

		it('sets href', function () {
			browser.assert.attribute(OLSKBannerButton, 'href', item.OLSKBannerButtonLink);
		});

		it('sets title', function () {
			browser.assert.attribute(OLSKBannerButton, 'title', 'Visit link');
		});

	});

	describe('OLSKBannerButtonImage', function() {

		it('sets src', function () {
			browser.assert.attribute(OLSKBannerButtonImage, 'src', 'https://static.rosano.ca/_shared/_OLSKSharedGoIcon.svg');
		});

	});

});
