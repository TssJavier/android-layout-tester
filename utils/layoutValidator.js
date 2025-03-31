const { $, browser, driver } = require('@wdio/globals');
const fs = require('fs');
const path = require('path');

// 🔐 Carga de variables de entorno (email, password, etc.)
require('dotenv').config();

// 📸 Captura una screenshot con timestamp
async function captureScreenshot(description) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const basePath = process.env.DEVICEFARM_LOG_DIR || './screenshots';

    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }

    const fileName = path.join(basePath, `failure-${description}-${timestamp}.png`);
    await browser.saveScreenshot(fileName);
    console.log(`📸 Screenshot guardada: ${fileName}`);
}

// 🧪 Función principal que ejecuta toda la validación de layout de una actividad
async function runSanityTest(activityId) {
    console.log(`\n🚀 Ejecutando test de layout para actividad: ${activityId}`);

    const errors = [];

    // ⚙️ Valores de márgenes seguros
    const safeAreaTopMargin = 50;
    const edgeMargin = 10;

    const elementsToVerify = [
        { name: 'close button', selector: 'android=new UiSelector().className("android.widget.Button").instance(0)' },
        { name: 'check button', selector: 'android=new UiSelector().text("COMPROBAR")' },
        { name: 'attempt text', selector: 'android=new UiSelector().text("INTENTO")' }
    ];

    try {
        // 1️⃣ Inicia app y espera carga
        await browser.pause(5000);

        const startButton = await $('android=new UiSelector().text("EMPEZAR")');
        await startButton.waitForDisplayed({ timeout: 5000 });
        await startButton.click();
        console.log("✅ Botón 'EMPEZAR' pulsado");

        // 2️⃣ Login
        const emailInput = await $('android=new UiSelector().resourceId("mat-input-0")');
        const passwordInput = await $('android=new UiSelector().resourceId("mat-input-1")');

        await emailInput.setValue(process.env.EMAIL || '');
        await passwordInput.setValue(process.env.PASSWORD || '');
        console.log("✅ Credenciales introducidas");

        const loginButton = await $('android=new UiSelector().text("ENTRAR")');
        await loginButton.click();
        await browser.pause(3000);

        // 3️⃣ Navega hasta actividad
        await openActivityById(activityId);

        // 4️⃣ Ejecuta fases hasta finalizar
        let hasNextPhase = true;
        let phase = 1;

        while (hasNextPhase) {
            console.log(`\n🧪 Validando fase ${phase}...`);
            await verifyElements(elementsToVerify, safeAreaTopMargin, edgeMargin, errors, activityId);
            const nextResult = await goToNextPhase();

            if (!nextResult || await detectContinueButton()) {
                hasNextPhase = false;
                const continueButton = await $('android=new UiSelector().text("CONTINUAR")');
                if (await continueButton.isDisplayed()) {
                    await continueButton.click();
                    console.log("✅ Botón 'CONTINUAR' pulsado");
                }
            } else {
                phase++;
            }
        }

        // 5️⃣ Reset app
        await driver.startActivity("cognifit.android.clevermind.children", "cognifit.android.clevermind.children.MainActivity");
        await browser.pause(8000);
        console.log("♻️ App reiniciada para siguiente actividad");

    } catch (error) {
        console.error(`❌ Error en ejecución de actividad ${activityId}: ${error.message}`);
        errors.push(error.message);
        await captureScreenshot(`fatal-error-${activityId}`);
    }

    if (errors.length > 0) {
        throw new Error(`Errores encontrados en actividad ${activityId}:\n- ${errors.join('\n- ')}`);
    }
}

// 🔍 Verifica elementos de la fase actual
async function verifyElements(elementsToVerify, safeAreaTopMargin, edgeMargin, errors, activityId) {
    const { width: deviceWidth, height: deviceHeight } = await driver.getWindowRect();

    for (const element of elementsToVerify) {
        try {
            const el = await $(element.selector);
            const visible = await el.isDisplayed();
            if (!visible) {
                await captureScreenshot(`${element.name}-no-visible-${activityId}`);
                throw new Error(`Elemento '${element.name}' no visible`);
            }

            const bounds = await el.getAttribute('bounds');
            const [x1, y1, x2, y2] = bounds.match(/\d+/g).map(Number);
            const withinBounds = (
                x1 >= edgeMargin &&
                x2 <= deviceWidth - edgeMargin &&
                y1 >= safeAreaTopMargin &&
                y2 <= deviceHeight - edgeMargin
            );

            if (!withinBounds) {
                await captureScreenshot(`${element.name}-fuera-limite-${activityId}`);
                throw new Error(`Elemento '${element.name}' fuera de límites en pantalla`);
            }

        } catch (e) {
            errors.push(e.message);
        }
    }
}

// 📲 Ir al siguiente paso de la actividad (WebView)
async function goToNextPhase() {
    try {
        await waitForWebViewContextAndSwitch();

        const result = await browser.executeScript(
            `try { window["ng"].getComponent(document.querySelector("cog-advance-questions-container")).next(0); return true; } catch (e) { return false; }`,
            []
        );

        await browser.switchContext('NATIVE_APP');
        await browser.pause(5000);
        return result;
    } catch {
        return false;
    }
}

// 🌐 Espera a que WebView esté disponible y cambia
async function waitForWebViewContextAndSwitch() {
    const maxTries = 5;
    for (let i = 0; i < maxTries; i++) {
        const contexts = await browser.getContexts();
        const webview = contexts.find(ctx => ctx.includes('WEBVIEW'));
        if (webview) {
            await browser.switchContext(webview);
            return;
        }
        await browser.pause(2000);
    }
    throw new Error('No se encontró WebView');
}

// ✅ Detectar botón "CONTINUAR"
async function detectContinueButton() {
    try {
        const btn = await $('android=new UiSelector().text("CONTINUAR")');
        return await btn.isDisplayed();
    } catch {
        return false;
    }
}

// 📍 Navega hasta la actividad por su ID
async function openActivityById(activityId) {
    const profileButton = await $('android=new UiSelector().text("PERFIL")');
    await profileButton.click();
    await browser.pause(3000);

    const qaButton = await $('android=new UiSelector().text("[ QA ]")');
    await qaButton.click();
    await browser.pause(3000);

    const studyTask = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().resourceIdMatches("mat-expansion-panel-header-(3|7)"))'
    );
    await studyTask.click();
    await browser.pause(3000);

    const activitySelector = `new UiSelector().resourceId("${activityId}")`;
    const scrollable = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(${activitySelector})`;
    const activityButton = await $(`android=${scrollable}`);
    await activityButton.click();
    console.log(`✅ Actividad ${activityId} encontrada y seleccionada`);

    const playSelector = `//android.view.View[@resource-id="${activityId}"]/android.widget.TextView[4]`;
    const playButton = await $(playSelector);
    await playButton.waitForDisplayed({ timeout: 5000 });
    await playButton.click();
    console.log("▶️ Actividad iniciada");
    await browser.pause(15000);
}

module.exports = { runSanityTest };
