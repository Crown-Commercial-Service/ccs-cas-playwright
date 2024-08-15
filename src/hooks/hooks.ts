import { BeforeAll, AfterAll, After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber"
import { Browser, Page, BrowserContext, chromium, request } from "@playwright/test"
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
require('dotenv').config();
const fs = require('fs-extra');
const { getDevice, browserstack } = require('../../browserstack');
const device = process.env.npm_config_browser;
const caps = getDevice(device);
setDefaultTimeout(process.env.PWDEBUG ? -1 : 120 * 1000)
let page: Page;
let browser: Browser;
let context: BrowserContext

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
})

Before(async function ({ pickle }) {
    const scenarioName = pickle.name.replace(/\s/g, "_");
    if (browserstack) {

        console.log("RUUNING ON BS::", browserstack, "::", caps, "device::", device)
        console.log("RUNNING TEST ON BROWSERSTACK");
        caps.name = scenarioName + "_";
        global.browser = await chromium.connect({
            wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
        });

        global.context = await global.browser.newContext({
            recordVideo: {
                dir: `test-results/videos/${scenarioName}.webm`,
            },
        });

        global.page = await global.context.newPage();
        pageFixture.page = global.page;
    } else {
        context = await browser.newContext({

            recordVideo: {
                dir: `test-results/videos/${scenarioName}.webm`,
            },
        });

        const page = await context.newPage();
        pageFixture.page = page;
        pageFixture.page.setDefaultTimeout(120000)
    }
})

After(async function ({ pickle, result }) {
    const scenarioName = pickle.name.replace(/\s/g, "_");
    let videoName: string;
    if (result?.status == Status.FAILED) {
        const img = await pageFixture.page.screenshot({ path: `test-results/screenshots/${pickle.name}.png`, type: "png" })
        await this.attach(img, "image/png");
        // videoName = await pageFixture.page.video().path();
        // fs.rename(videoName, `test-results/videos/${scenarioName}.webm`)
    }

    if (browserstack) {
        // await global.browser.connection.send('BrowserStack.setSessionStatus',{
        //     sessionId: global.context.page()[0].context().browserContextId,
        //     status: result?.status 
        // })

        // await request.newContext.
        await global.page.close();
        await global.context.close();
    } else {
        await pageFixture.page.close();
        await context.close();
    }

})

AfterAll(async () => {
    const timeout = setTimeout(() => {
        process.exit(1);
    }, 3000)

    try {
        if (browserstack) {
            await global.browser.close()
        } else {
            await browser.close()
        }
    } finally {
        clearTimeout(timeout)
    }
})

