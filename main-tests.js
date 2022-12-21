const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKBannerInfoObject', function test_OLSKBannerInfoObject() {

	const _OLSKBannerInfoObject = function (inputData = {}) {
		return mod.OLSKBannerInfoObject(Object.assign({
			location: {
				hostname: Math.random().toString(),
			},
		}, inputData, {
			fetch: (function () {
				if (inputData._fetch) {
					inputData._fetch(...arguments);
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
		const hostname = Math.random().toString();
		const href = 'https://' + Math.random().toString();
		deepEqual(await uCapture(function (_fetch) {
			return _OLSKBannerInfoObject({
				_fetch,
				location: {
					hostname,
					href,
				},
			});
		}), [mod.OLSKBannerEndpointURL() + '?domain=' + hostname + '&link=' + encodeURIComponent(href) , {
			method: 'GET',
		}]);
	});

	it('returns response.json', async function () {
		const json = uItem({
			[Math.random().toString()]: Math.random().toString(),
		});
		deepEqual(await _OLSKBannerInfoObject({
			json,
		}), json);
	});

	it('returns null if response.json not valid', async function () {
		const json = {};
		deepEqual(await _OLSKBannerInfoObject({
			json,
		}), null);
	});

});

describe('OLSKBannerInfoIsValid', function test_OLSKBannerInfoIsValid () {

	const _OLSKBannerInfoIsValid = function (inputData = {}) {
		return mod.OLSKBannerInfoIsValid(uItem(inputData));
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKBannerInfoIsValid(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if OLSKBannerInfoHTML not string', function () {
		deepEqual(_OLSKBannerInfoIsValid({
			OLSKBannerInfoHTML: null,
		}), false);
	});

	it('returns false if OLSKBannerInfoURL not string', function () {
		deepEqual(_OLSKBannerInfoIsValid({
			OLSKBannerInfoURL: null,
		}), false);
	});

	it('returns true', function () {
		deepEqual(_OLSKBannerInfoIsValid(), true);
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
				async OLSKBannerInfoObject () {
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
