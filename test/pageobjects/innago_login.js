import userActions from '../utils/userActions';

class innago_login {
	locator = {
		userName: 'input[data-locator="loginUsername"]',
		passWd: 'input[data-locator="loginPassword"]',
		signInButton: 'button[id="signin-button"]',
		signInAc: '//h1[text() = "Please sign in to your account"]',
		googleIcon: 'button>img[alt="google img"]',
		signInWithGoogle: '//div[text()="Sign in with Google"]',
		facebookIcon: 'button>img[alt="facebook img"]',
		appleIcon: 'button>img[alt="apple img"]',
	};

	async loginIntoDashboard(username, password) {
		//await userActions.waitForElementToDisplay(this.locator.userName);
		await userActions.enterText(this.locator.userName, username);
		await userActions.enterText(this.locator.passWd, password);
		await userActions.clickOn(this.locator.signInButton);
		
	}

	async launchInnagoUrl() {
		await userActions.logDataToReports('----------->>>Launching Innago URL');
		await userActions.navigateToGivenUrl('/');
	}
	async resizeBrowser() {
		await userActions.setWindowSize(1920, 1080);
		await userActions.maximizeWindow();
	}
}
//module.exports = new innago_login();
export default new innago_login();
