const { app, BrowserWindow, globalShortcut , Menu} = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const setting = require("./setting.json")
app.whenReady().then(() => {
    const template = [
        {
            label: 'Info'
        },
        {
          label: 'Sites',
          submenu: [
            {
              label: 'Youtube  ' + setting["Youtube"],
              click () { win.loadURL("https://youtube.com") }
            },
            {
                label: 'Twitch  ' + setting["Twitch"],
                click () { win.loadURL("https://www.twitch.tv/") }
              }
          ]
        },
        {
            label: 'Sound',
            submenu: [
              {
                label: 'Mute  ' + setting["Mute"],
                click () { win.webContents.setAudioMuted(true) }
              },
              {
                  label: 'Unmute  ' + setting["Unmute"],
                  click () { win.webContents.setAudioMuted(false) }
                }
            ]
          },
          {
            label: 'Window',
            submenu: [
              {
                label: 'Hide  ' + setting["Hide"],
                click () { win.webContents.setAudioMuted(true);win.hide() }
              },
              {
                  label: 'Show  ' + setting["Show"],
                  click () { win.show() }
                }
            ]
          }
      ];

    globalShortcut.register(setting["Show"], () => {
        console.log('You pressed ' + setting["Show"]);
        win.show()
    })
    var win = new BrowserWindow()
    win.webContents.setAudioMuted(true)
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    win.loadURL("https://youtube.com")

    globalShortcut.register(setting["Hide"], () => {
        console.log('You pressed ' + setting["Hide"]);
        win.hide();
    });

    electronLocalshortcut.register(win, setting["Youtube"], () => {
        console.log('You pressed ' +  setting["Youtube"]);
        win.loadURL("https://youtube.com");
    });

    electronLocalshortcut.register(win, setting["Twitch"], () => {
        console.log('You pressed ' + setting["Twitch"]);
        win.loadURL("https://www.twitch.tv");
    });

    globalShortcut.register(setting["Unmute"], () => {
        console.log('You pressed ' + setting["Unmute"]);
        win.webContents.setAudioMuted(false);
    });

    globalShortcut.register(setting["Mute"], () => {
        console.log('You pressed ' + setting["Mute"]);
        win.webContents.setAudioMuted(true);
    });
})
app.on('window-all-closed', () => {
    app.quit()
})