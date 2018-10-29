import { app, BrowserWindow } from 'electron'
const ipc = require('electron').ipcMain
    /**
     * Set `__static` path to static files in production
     * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
     */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 700,
        useContentSize: true,
        width: 1200,
        frame: false,
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
    ipc.on('window-min', () => {
        mainWindow.minimize()
    })

    ipc.on('window-max', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    })

    ipc.on('window-close', () => {
        mainWindow.minimize()
        setTimeout(() => {
            mainWindow.close()
        }, 150)
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */