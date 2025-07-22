import { Reporter } from '@reportportal/agent-js-webdriverio';
import allure_cmd from 'allure-commandline';
//
import fs from 'fs';
import * as fsextra from 'fs-extra';
import os from 'os';
import path from 'path';
import setGlobalSettingFromAdmin_api from '../api/apiFlows/setGlobalSettingFromAdmin_api.js';
import fileUtils from '../utils/fileUtils.js';
import RPClient from '@reportportal/client-javascript';
import axios from 'axios';
import { glob } from 'glob';
import userActions from '../utils/userActions.js';
import zephyrConfig from '../projectConfigs/zephyrConfig.js';
import zephyrApiFlows from '../api/zephyr/zephyrApiFlows.js';
import nameFetcher from '../utils/nameFetcher.js';

const downloadFolder = process.cwd() + path.sep + 'downloads';
const screenshots = process.cwd() + path.sep + 'screenshots';
const junit_reports = process.cwd() + path.sep + 'reports' + path.sep + 'junit';
const allure_results = process.cwd() + path.sep + 'reports' + path.sep + 'allure-results';
const tmp = process.cwd() + path.sep + 'tmp';
const allure_report = process.cwd() + path.sep + 'allure-report';
const env = process.env.ENV;
let testCase_testCycle_MetaData, testStartTime, testEndTime, testDuration, donotPublishResultInZephyr;

const getAppUrl = () => {
	let url;
	if (env == undefined) {
		url = 'https://dev-my.innago.com';
	} else if (env == prod) {
		url = 'https://my.innago.com';
	} else if (env == qa) {
		('https://qa-my.innago.com');
	}
};
