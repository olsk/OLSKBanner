(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OLSKBanner = global.OLSKBanner || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		async OLSKBannerObject (debug) {
			const response = await (debug || window).fetch(mod.OLSKBannerEndpointURL(), {
				method: 'GET',
			});

			try {
				const outputData = await response.json();
				
				if (mod.OLSKBannerIsValid(outputData)) {
					return outputData;
				}

				throw new Error('ErrorInputNotValid');
			} catch {
				return null;
			}
		},

		OLSKBannerIsValid (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof inputData.OLSKBannerBlurbHTML !== 'string') {
				return false;
			}

			if (typeof inputData.OLSKBannerButtonText !== 'string') {
				return false;
			}

			if (typeof inputData.OLSKBannerButtonLink !== 'string') {
				return false;
			}

			return true;
		},

		OLSKBannerEndpointURL () {
			return 'https://rosano.ca/en/api/banner';
		},

		OLSKBannerLoad (inputData) {
			const target = document.createElement('div');
			document.body.appendChild(target);
			target.innerHTML = `<div class="OLSKBanner OLSKDecor">
			<span class="OLSKBannerBlurb">${ inputData.OLSKBannerBlurbHTML }</span>
			<a class="OLSKBannerButton OLSKDecorPress OLSKDecorPressCall" href="${ inputData.OLSKBannerButtonLink }">${ inputData.OLSKBannerButtonText }</a>
		</div>`;
			document.body.style.paddingBottom = document.querySelector('.OLSKBanner').getBoundingClientRect().height + 'px'
		},

		// MESSAGE

		async DOMContentLoaded () {
			const _mod = (typeof process !== 'undefined' && process.env.npm_lifecycle_script === 'olsk-spec') ? this : mod;

			if (typeof window === 'object' && window.origin.match('loc.tests')) {
				return;
			}

			_mod.OLSKBannerLoad(await _mod.OLSKBannerObject());
		},

		// LIFECYCLE

		LifecycleModuleDidLoad (debug) {
			(debug || window).document.addEventListener('DOMContentLoaded', mod.DOMContentLoaded);
		},

	};

	if (typeof process !== 'undefined' && process.env.npm_lifecycle_script === 'olsk-spec') {
		Object.assign(exports, mod);
	}

	if (typeof window === 'object') {
		mod.LifecycleModuleDidLoad();
	}

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));
