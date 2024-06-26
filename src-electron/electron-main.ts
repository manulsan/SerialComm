import { app, BrowserWindow, nativeTheme } from 'electron';
import { initialize, enable } from '@electron/remote/main';
import path from 'path';
import os from 'os';

initialize();

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | null = null; //let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      //mainWindow.webContents.closeDevTools();
      (mainWindow as BrowserWindow).webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  enable(mainWindow.webContents);
}

// import * as SerialPort from 'serialport';
// //let port: SerialPort | null = null;
// let port: SerialPort | null = null;
// function openPort() {
//   port = new SerialPort('/dev/ttyUSB0', {
//     baudRate: 9600,
//   });
//   port.on('open', () => {
//     console.log('Serial port opened');
//   });
//   port.on('data', (data: Buffer) => {
//     console.log('Received data:', data.toString());
//   });
//   port.on('error', (err) => {
//     console.error('Error:', err.message);
//   });
// }

// function closePort() {
//   if (port) {
//     port.close((err) => {
//       if (err) {
//         console.error('Error closing port:', err.message);
//       } else {
//         console.log('Serial port closed');
//       }
//     });
//   }
// }

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});
//app.on('before-quit', closePort);
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
