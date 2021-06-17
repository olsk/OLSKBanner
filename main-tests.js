const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKBannerIsValid', function test_OLSKBannerIsValid () {

	const _OLSKBannerIsValid = function (inputData = {}) {
		return mod.OLSKBannerIsValid(Object.assign({
			OLSKBannerBlurbHTML: Math.random().toString(),
			OLSKBannerButtonText: Math.random().toString(),
			OLSKBannerButtonLink: Math.random().toString(),
		}, inputData));
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKBannerIsValid(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if OLSKBannerBlurbHTML not string', function () {
		deepEqual(_OLSKBannerIsValid({
			OLSKBannerBlurbHTML: null,
		}), false);
	});

	it('returns false if OLSKBannerButtonText not string', function () {
		deepEqual(_OLSKBannerIsValid({
			OLSKBannerButtonText: null,
		}), false);
	});

	it('returns false if OLSKBannerButtonLink not string', function () {
		deepEqual(_OLSKBannerIsValid({
			OLSKBannerButtonLink: null,
		}), false);
	});

	it('returns true', function () {
		deepEqual(_OLSKBannerIsValid(), true);
	});
	
});

describe('OLSKBannerEndpointURL', function test_OLSKBannerEndpointURL () {

	it('returns string', function () {
		deepEqual(mod.OLSKBannerEndpointURL(), 'XXXXX');
	});
	
});
