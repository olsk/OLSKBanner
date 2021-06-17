const mod = {

	async OLSKBannerObject (debug) {
		const response = await (debug || window).fetch(mod.OLSKBannerEndpointURL(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
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
		return 'XXXXX';
	},

	// MESSAGE

	async DOMContentLoaded () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod.OLSKBannerLoad(await _mod.OLSKBannerObject())
	},

	// LIFECYCLE

	LifecycleModuleDidLoad (debug) {
		(debug || window).document.addEventListener('DOMContentLoaded', mod.DOMContentLoaded);
	},

};

if (process.env.npm_lifecycle_script === 'olsk-spec') {
	Object.assign(exports, mod);
}

if (typeof window === 'object') {
	mod.LifecycleModuleDidLoad();
}
