const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

const uItem = function (inputData = {}) {
	return Object.assign({
		OLSKBannerBlurbHTML: Math.random().toString(),
		OLSKBannerButtonText: Math.random().toString(),
		OLSKBannerButtonLink: Math.random().toString(),
	}, inputData);
};

describe('OLSKBannerObject', function test_OLSKBannerObject() {

	const _OLSKBannerObject = function (inputData = {}) {
		return mod.OLSKBannerObject(Object.assign({
			fetch: (function () {
				if (inputData.fetch) {
					inputData.fetch(...arguments);
				}

				return {
					response: 200,
					json: (function () {
						return inputData.json || {};
					}),
				};
			}),
		}));
	};

	it('calls window.fetch', async function () {
		deepEqual(await uCapture(function (fetch) {
			return _OLSKBannerObject({
				fetch,
			});
		}), [mod.OLSKBannerEndpointURL(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}]);
	});

	it('returns response.json', async function () {
		const json = uItem({
			[Math.random().toString()]: Math.random().toString(),
		});
		deepEqual(await _OLSKBannerObject({
			json,
		}), json);
	});

	it('returns null if response.json not valid', async function () {
		const json = {};
		deepEqual(await _OLSKBannerObject({
			json,
		}), null);
	});

});

describe('OLSKBannerIsValid', function test_OLSKBannerIsValid () {

	const _OLSKBannerIsValid = function (inputData = {}) {
		return mod.OLSKBannerIsValid(uItem(inputData));
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

describe('LifecycleModuleDidLoad', function test_LifecycleModuleDidLoad() {

	it('listens for DOMContentLoaded', function () {
		deepEqual(uCapture(function (addEventListener) {
			mod.LifecycleModuleDidLoad({
				document: {
					addEventListener,
				},
			});
		}), ['DOMContentLoaded', mod.DOMContentLoaded]);
	});

});
