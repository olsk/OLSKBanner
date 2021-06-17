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

};

if (process.env.npm_lifecycle_script === 'olsk-spec') {
	Object.assign(exports, mod);
}
