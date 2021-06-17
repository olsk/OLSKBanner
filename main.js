const mod = {

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

};

if (process.env.npm_lifecycle_script === 'olsk-spec') {
	Object.assign(exports, mod);
}
