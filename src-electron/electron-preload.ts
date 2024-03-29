/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import { contextBridge } from 'electron';
import { BrowserWindow } from '@electron/remote';
// highlight-next-line
//import { dialog } from '@electron/remote';

import { ElectronFileFilter } from './../src/types/common';

contextBridge.exposeInMainWorld('electronApi', {
  openFileDialog: async (
    title: string,
    folder: string,
    filters: ElectronFileFilter[]
  ) => {
    // const response = await dialog.showOpenDialog({      title,      filters,      properties: ['openFile', 'multiSelections'],
    // });
    // return response.filePaths;
    console.log(title);
    console.log(folder);
    console.log(filters);
  },
  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
      //BrowserWindow.getFocusedWindow().minimize();
    }
  },
  // close: () => BrowserWindow.getFocusedWindow()?.close(),
  // minimize: () => BrowserWindow.getFocusedWindow()?.minimize(),
  close: () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.close();
  },
  minimize: () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.minimize();
  },
});
