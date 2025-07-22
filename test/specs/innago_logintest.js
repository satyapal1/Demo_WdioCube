//const { expect, browser } = require('@wdio/globals');
//const innago_login = require('../pageobjects/innago_login');
//const { default: userActions } = require('../utils/userActions');

import { expect, browser } from '@wdio/globals';
import innago_login from '../pageobjects/innago_login';
import userActions from '../utils/userActions';
import assertUtils from '../utils/assertUtils';
import userData from '../../mocks/userData';

const environmentIs = process.env.ENV;
const newPO = process.env.testWithNewPO;
// const newPO = false;

describe('verify innago login screen', function () {
	let poUsers;
	before(async function () {
		await innago_login.launchInnagoUrl();
		await innago_login.resizeBrowser();
		poUsers = userData.env.qa.poUsers.po0001;
	});

	it('should log into the dashboard successfully', async function () {
		// Better than pause — wait for login field
		await browser.pause(10000);
		await userActions.logDataToReports('............verifying Login screen............');
		await assertUtils.verifyElementExistOnPage(innago_login.locator.signInButton);
		await assertUtils.verifyElementExistOnPage(innago_login.locator.signInAc);
		await userActions.addDescriptionToTest('Verifying description method');
		//await userActions.clickOn(innago_login.locator.googleIcon);
		//let handles = await userActions.getWindowHandles();
		//await userActions.switchToWindow(handles[1]);
		await browser.pause(5000);
		await innago_login.loginIntoDashboard(poUsers.userName, poUsers.passWord);
		await browser.pause(10000);
	});
});
