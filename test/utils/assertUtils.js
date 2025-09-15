import userActions from './userActions';
import { expect, browser } from '@wdio/globals';

class assertUtils {
	async assertForEquality(textOne, textTwo) {
		await console.log(`>>>Asserting for Equality :: ${textOne} == ${textTwo}`);
		await expect(textOne).toEqual(textTwo);
	}

	async assertForInEquality(textOne, textTwo) {
		console.log(`>>Asserting for inEquality :: ${textOne} !== ${textTwo}`);
		await expect(textOne).not.toEqual(textTwo);
	}

	async verifyElementExistOnPage(locator) {
		await console.log(`>>Asserting selector :: "${locator}" exists on page`);
		const selector = await userActions.getLocator(locator);
		await expect(selector).toBeExisting({ message: 'Element does not exists on page' });
	}

	async verifyElementIsClickabla(locator) {
		console.log(`>>>Asserting selector :: "${locator}" should be clickable`);
		const selector = await userActions.getLocator(locator);
		await expect(selector).toBeClickable();
	}
	async verifyElemntIsNotClickable(locator) {
		console.log(`>>> Asserting locator :: "${locator}" should not be clickable`);
		const selector = await userActions.getLocator(locator);
		await expect(selector).not.toBeClickable();
	}
}
export default new assertUtils();
