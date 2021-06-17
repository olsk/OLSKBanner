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

	});

	describe('OLSKBannerBlurb', function() {

		it('sets html', function () {
			browser.assert.OLSKInnerHTML(OLSKBannerBlurb, item.OLSKBannerBlurbHTML);
		});

	});

	describe('OLSKBannerButton', function() {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(OLSKBannerButton, 'OLSKDecorPress');
		});

		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(OLSKBannerButton, 'OLSKDecorPressCall');
		});

		it('sets href', function () {
			browser.assert.attribute(OLSKBannerButton, 'href', item.OLSKBannerButtonLink);
		});

		it('sets text', function () {
			browser.assert.text(OLSKBannerButton, item.OLSKBannerButtonText);
		});

	});

});
