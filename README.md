# 🧪 Android Layout Tester

![Android Layout Tester - Ready to Test](./banner-layout-tester.png)

### Automatiza tests visuales y de layout en apps Android  
Testea múltiples dispositivos en paralelo con tan solo un comando.  
Ideal para validar visualmente 4 actividades por dispositivo de forma autónoma.

---

## 🚀 ¿Qué hace este proyecto?

Este sistema ejecuta pruebas automáticas sobre la app **CleverMind Children** (Android), validando:

- ✅ Presencia y visibilidad de elementos clave del UI
- ✅ Posición y límites de cada elemento en pantalla (layout bounds)
- ✅ Navegación por fases dentro de actividades
- ✅ Captura automática de errores visuales
- ✅ Compatibilidad multi-dispositivo Android

---

## 🛠️ Instalación Rápida

### 1. Instala Node.js
🔗 https://nodejs.org

### 2. Clona el proyecto

```bash
git clone https://github.com/tu-usuario/android-layout-tester.git
cd android-layout-tester

### 3. Instala dependencias
npm install
npm install -g appium@next
appium driver install uiautomator2

### 4. Copia el archivo .env.example y añade tus credenciales

cp .env.example .env

✏️ Edita el archivo .env con tus datos reales:

EMAIL=tu.email@empresa.com
PASSWORD=123456

🔐 Importante: El archivo .env está en .gitignore y no se sube al repositorio.

### 📦 Estructura del Proyecto

android-layout-tester/
├── tests/                     # 💥 Test principal para ejecutar
│   └── sanityTest.js
├── utils/                     # 🧠 Lógica reutilizable y modular
│   ├── activityUtils.js       # Función para seleccionar actividades aleatorias
│   └── layoutValidator.js     # Toda la lógica visual, validación y navegación
├── config/                    # ⚙️ Config por dispositivo Android
│   └── wdio.deviceX.conf.js   # Uno por cada dispositivo conectado
├── activities.json            # 📚 Actividades por curso, materia y núcleo
├── .env.example               # 🔐 Plantilla para configurar credenciales
├── .gitignore                 # ❌ Ignora node_modules, .env, screenshots, logs
├── package.json               # 📦 Dependencias, scripts, config del proyecto
├── README.md                  # 📘 Guía completa del sistema
└── banner-layout-tester.png  # 🖼️ Imagen decorativa del README

### 📲 Cómo Ejecutar Tests

Asegúrate de tener al menos 4 dispositivos Android conectados o emulados.

### 📍 Verifica con:

adb devices

### ▶️ Ejecutar test en un solo dispositivo

npx wdio run config/wdio.device1.conf.js

### 🔁 Cambia device1 por device2, device3, device4, según corresponda.

### ⚡ Ejecutar los 4 dispositivos en paralelo

npm run test:all

### Esto lanza 4 procesos paralelos usando concurrently.

### 📷 Captura de errores
Todas las screenshots por error se guardan automáticamente en la carpeta /screenshots/, con:

Descripción del error

Nombre del elemento

Timestamp

ID de actividad

### 🔐 Seguridad
.env está protegido por .gitignore ✅

Nunca subas credenciales reales

Usa .env.example como referencia para tu equipo

### 🔄 Mantenimiento futuro

Área	Qué revisar cuando cambia
activities.json	Nuevas actividades de Santillana
.env	Si cambian los accesos o credenciales
layoutValidator.js	Si cambia el layout de la app o nuevos componentes
selectors	Si la app cambia botones, clases o estructuras
devices config	Si cambias de dispositivos/emuladores

### 🧠 Notas útiles

Puedes modificar el número de actividades por test en sanityTest.js

El banner de la cabecera está en banner-layout-tester.png, puedes personalizarlo

Los errores se loguean automáticamente y no interrumpen la ejecución total si se controlan correctamente

Puedes extender esto con Allure Reports o CI (Continuous Integration) si lo necesitas más adelante

### 💬 Soporte

¿Dudas? Contacta con el equipo QA o revisa este archivo.
Incluso sin conocimientos técnicos, cualquiera puede lanzar estos tests con total seguridad 🚀

¡Listo para testear! 🎯

