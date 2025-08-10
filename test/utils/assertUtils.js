import userActions from './userActions';
import { expect, browser } from '@wdio/globals';

class assertUtils {
	async assertForEquality(textOne, textTwo) {
		await console.log(`>>>Asserting for Equality :: ${textOne} == ${textTwo}`);
		await expect(textOne).toEqual(textTwo);
	}

	async verifyElementExistOnPage(locator) {
		await console.log(`>>Asserting selector :: "${locator}" exists on page`);
		const selector = await userActions.getLocator(locator);
		await expect(selector).toBeExisting({ message: 'Element does not exists on page' });
	}
}

export default new assertUtils();
