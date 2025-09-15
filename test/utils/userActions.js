const { expect, browser } = require('@wdio/globals');
//import { expect, browser } from '@wdio/globals';
import { ReportingApi } from '@reportportal/agent-js-webdriverio';
import allure from '@wdio/allure-reporter';
import path from 'path';

const downloadFolder = process.cwd() + path.sep + 'downloads';

let waitTimeOut = {
	wait: {
		DisplayTimeOut: 25000,
		clickAbleTimeOut: 15000,
		WaitAfterClick: 1000,
		WaitAfterTextEnter: 500,
		StaticWaitForPageLoad: 4000,
		StaticTimeout: 2000,
		HalfSecondTimeout: 500,
		OneSecondTimeout: 1000,
		TwoSecondTimeout: 2000,
		ThreeSecondTimeout: 3000,
		FourSecondTimeout: 4000,
	},
};

class userActions {
async clickOn(element, extraTime) {
		const webelement = await $(element);
		await webelement.waitForDisplayed({ timeout: 5000 });
		await webelement.click();
		console.log(`----Clicking on element----"${element}"`);
	}

	/**
	 * Logs a message to the console.
	 * @param {string} message The message to log.
	 */

	async logDataToReports(message) {
		await ReportingApi.log('INFO', message);
		await allure.addStep(message);
		await console.log(message);
	}

	/**
	 * Adds a description to the current test execution.
	 * @param {String} description the description to add
	 * @returns {Promise<void>}
	 */

	async addDescriptionToTest(description) {
		await allure.addDescription(description);
		await ReportingApi.setDescription(description);
	}
	async enterText(element, value, extraWaitTime) {
		const elemnt = await $(element);
		await elemnt.waitForDisplayed({ timeout: 5000 });
		await elemnt.clearValue(); // optional: clears previous text
		await elemnt.setValue(value); // types the new text
		console.log(`Entered text "${value}" in ${element}`);
	}

	async getLocator(locator) {
		const loc = await $(locator);
		return loc;
	}

	/**
	 * Opens a new browser window with the given url
	 * @param {String} url the url to open in the new window
	 * @returns {Promise<void>}
	 */

	async openNewWindow(url) {
		await this.logDataToReports(`Opening new window with url : ${url}`);
		await browser.newWindow(url);
		await this.waitFor(waitTimeOut.wait.FourSecondTimeout);
	}

	/**
	 * Closes the current browser window
	 * @returns {Promise<void>}
	 */

	async closeCurrentWindow() {
		await this.logDataToReports('Closing current Window');
		await browser.closeWindow();
	}

	/**
	 * Returns an array of window handles of all the currently open windows
	 * @returns {Promise<Array<String>>}
	 */

	async getWindowHandles() {
		await this.logDataToReports('getting window handles');
		return await browser.getWindowHandles();
	}

	/**
	 * Switches to the window with the given id
	 * @param {String} id the id of the window to switch to
	 * @returns {Promise<void>}
	 */

	async switchToGivenWindowById(id) {
		await this.logDataToReports(`switching to window with id : ${id}`);
		await browser.switchToWindow(id);
		await this.waitFor(waitTimeOut.wait.TwoSecondTimeout);
	}

	/**
	 * Switches to the iframe element with the given id
	 * @param {String} frameId the id of the iframe element to switch to
	 * @returns {Promise<void>}
	 */
	async switchToIframe(frameId) {
		let frameLocator = await this.getLocator(frameId);
		return await browser.switchToFrame(frameLocator);
	}

	/**
	 * Switches to the parent iframe of the current iframe
	 * @returns {Promise<void>}
	 */
	async switchToParentFrame() {
		return await browser.switchToParentFrame();
	}

	/**
	 * Switches to the window with the given title
	 * @param {String} titleLocator the title of the window to switch to
	 * @returns {Promise<void>}
	 */

	async switchToWindow(titlelocator) {
		return await browser.switchWindow(titlelocator);
	}

	/**
	 * Moves the mouse to the given element. Waits for the element to be displayed before attempting to move the mouse.
	 * @param {String} element the locator of the element to move the mouse to.
	 * @returns {Promise<void>}
	 */

	async moveToElement(element) {
		const WebElement = await this.getLocator(element);
		await this.waitUntilWebElementIsDisplayed(element);
		await WebElement.moveTo();
		await this.logDataToReports(`.....>Moved mouse to Element : ${element}`);
		await this.waitFor(waitTimeOut.wait.HalfSecondTimeout);
	}

	async waitUntilWebElementIsDisplayed(element, timeOut = 10000) {
		console.log(`>> Waiting for element to be displayed`);
		await element.waitForDisplayed({ timeOut, timeoutMsg: 'Element was not displayed within the given timeout' });
	}

	/**
	 * Sets the size of the current window.
	 * @param {number} width - the new width of the window
	 * @param {number} height - the new height of the window
	 * @return {Promise<void>}
	 */

	async setWindowSize(width, height) {
		return await browser.setWindowSize(width, height);
	}

	/**
	 * Checks if an element is clickable.
	 * @param {String} element the locator of the element to check.
	 * @returns {Promise<Boolean>} a promise that resolves with true if the element is clickable, false otherwise.
	 */

	async isElementClickable(element) {
		const webElement = await this.getLocator(element);
		const isClickable = await browser.isClickable();
		if (isClickable) {
			await this.logDataToReports(`.......Element is clickable : ${element}`);
		} else {
			await this.logDataToReports(`.......Element is Not clickable : ${element}`);
		}
	}

	/**
	 * Checks if an element is enabled.
	 * @param {String} element the locator of the element to check.
	 * @returns {Promise<Boolean>} a promise that resolves with true if the element is enabled, false otherwise.
	 */
	async isElementEnabled(element) {
		const webElement = await this.getLocator(element);
		const isEnabled = await webElement.isEnabled();
		return isEnabled;
	}

	/**
	 * Retrieves a random value from the given array.
	 * @param {Array<String|Number>} arrList the array to get a random value from.
	 * @returns {Promise<String|Number>} a promise that resolves with a random value from the array.
	 */

	async getRandomValueFromArray(arrList) {
		arrList[Math.floor(Math.random() * arrList.length())];
	}

	/**
	 * Refreshes the current page and waits until the loading overlay disappears.
	 * @returns {Promise<void>} a promise that resolves when the page is refreshed and the loading overlay is gone.
	 */

	async refreshPage() {
		await console.log('Refreshing page...');
		await browser.refresh();
		await this.waitFor(waitTimeOut.wait.ThreeSecondTimeout);
	}
	async navigateToGivenUrl(path) {
		await browser.url(path);
		await this.waitFor(waitTimeOut.wait.TwoSecondTimeout);
		await this.navigatedToUrlAndTitle();
	}

	async navigatedToUrlAndTitle() {
		const title = await browser.getTitle(),
			url = await browser.getUrl();
		return await this.logDataToReports(`Clicked and Navigated to URL :: ${url}`);
	}

	/**
	 * Maximizes the window size
	 */
	async maximizeWindow() {
		await browser.maximizeWindow();
	}

	/**
	 * Minimizes the window size
	 */
	async minimizeWindow() {
		await browser.minimizeWindow();
	}

	/**
	 * Pauses test execution for the given amount of time in milliseconds.
	 * @param {number} timeOut - The time to wait in milliseconds.
	 */
	async waitFor(timeOut) {
		// await this.logDataToReports(`Waiting for asked time :: ${timeOut}`);
		await browser.pause(timeOut);
	}
}
export default new userActions();
