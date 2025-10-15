(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OLSKBanner = global.OLSKBanner || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		async OLSKBannerInfoObject (debug) {
			const _window = debug || window;

			const response = await _window.fetch(mod.OLSKBannerEndpointURL() + '?domain=' + _window.location.hostname + '&link=' + encodeURIComponent(_window.location.href), {
				method: 'GET',
			});

			try {
				const outputData = await response.json();
				
				if (mod.OLSKBannerInfoIsValid(outputData)) {
					return outputData;
				}

				throw new Error('ErrorInputNotValid');
			} catch {
				return null;
			}
		},

		OLSKBannerInfoIsValid (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof inputData.OLSKBannerInfoHTML !== 'string') {
				return false;
			}

			if (typeof inputData.OLSKBannerInfoURL !== 'string') {
				return false;
			}

			return true;
		},

		OLSKBannerEndpointURL () {
			return 'https://rosano.ca/api/banner';
		},

		_configureElement (el, info) {
			el.innerHTML = `<div class="OLSKBanner OLSKDecor" lang="en">
	<a class="OLSKBannerLink" href="${ info.OLSKBannerInfoURL }">
		<span class="OLSKBannerBlurb" aria-hidden="true">${ info.OLSKBannerInfoHTML }&nbsp;</span>
		<img class="OLSKBannerLinkImage" src="https://static.rosano.ca/_shared/_OLSKSharedGoIcon.svg" />
	</a>
</div>`;
			document.body.style.paddingBottom = document.querySelector('.OLSKBanner').getBoundingClientRect().height + 'px';
		},

		_OLSKBannerLoad (inputData) {
			const target = document.createElement('div');
			
			document.body.appendChild(target);

			mod._configureElement(target, inputData);
		},

		OLSKBannerLoad: () => _mod.OLSKBannerInfoObject().then(_mod._OLSKBannerLoad),

		// MESSAGE

		DOMContentLoaded () {
			const _mod = (typeof process !== 'undefined' && process.env.npm_lifecycle_script === 'olsk-spec') ? this : mod;

			if (typeof window === 'object' && window.origin.match('loc.tests')) {
				return;
			}

			if (document.querySelectorAll('script[data-banner-manual]')) {
				return
			}

			return mod.OLSKBannerLoad();
		},

		// LIFECYCLE

		LifecycleModuleDidLoad (debug) {
			(debug || window).document.addEventListener('DOMContentLoaded', mod.DOMContentLoaded);
		},

	};

	Object.assign(exports, mod);

	if (typeof window === 'object') {
		mod.LifecycleModuleDidLoad();
	}

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));
