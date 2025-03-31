// ============================= //
// 🚀 CÓMO INSTALAR Y LANZAR TESTS
// ============================= //
/*
  1️⃣ REQUISITOS:
    - Tener instalado Node.js → https://nodejs.org
    - Tener Appium v2 instalado globalmente:
        npm install -g appium@next
        appium driver install uiautomator2
    - Tener Android Studio y los dispositivos/emuladores configurados
    - Tener los dispositivos ADB conectados (`adb devices`)

  2️⃣ INSTALACIÓN DEL PROYECTO:
    - Clona o descarga este repositorio
    - En la carpeta raíz, abre terminal y ejecuta:
        npm install

  3️⃣ CONFIGURA TUS CREDENCIALES:
    - Crea un archivo `.env` en la raíz con:
        EMAIL=tu.email@ejemplo.com
        PASSWORD=tu_contraseña

  4️⃣ LANZAR TEST EN 4 DISPOSITIVOS:
    - Abre 4 terminales y en cada una ejecuta:
        npx wdio run ./config/wdio.device1.conf.js
        npx wdio run ./config/wdio.device2.conf.js
        npx wdio run ./config/wdio.device3.conf.js
        npx wdio run ./config/wdio.device4.conf.js

    (o usa el comando automático: `npm run test:all`)
*/

require('dotenv').config();
const { runSanityTest } = require('../utils/layoutValidator');
const { getRandomActivitiesFromJSON } = require('../utils/activityUtils');

describe('📲 Sanity Layout Test en Android', async () => {
  const activities = getRandomActivitiesFromJSON('./activities.json', 4); // 4 actividades por dispositivo

  activities.forEach((activityId, index) => {
    it(`Actividad ${index + 1}: Validación visual y de layout`, async () => {
      await runSanityTest(activityId);
    });
  });
});
