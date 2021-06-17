const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

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
		deepEqual(mod.OLSKBannerEndpointURL(), 'https://rosano.ca/api/banner');
	});

});

describe('DOMContentLoaded', function test_DOMContentLoaded() {

	const _DOMContentLoaded = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			OLSKBannerLoad: (function () {}),
		}, inputData).DOMContentLoaded();
	};

	it('calls OLSKBannerLoad', async function () {
		const item = Math.random().toString();
		deepEqual(await uCapture(function (OLSKBannerLoad) {
			_DOMContentLoaded({
				async OLSKBannerObject () {
					return item;
				},
				OLSKBannerLoad,
			});
		}), [item]);
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
