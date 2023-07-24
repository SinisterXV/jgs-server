# jgs-server

## Installation

In order to install the server just run `npm install` in the root folder (where `app.js`) is located

## Usage

Make sure you're in the server's root folder, and run `npm start`.
To download the files, connect to the host's IP address using a device connected to the host's hotspot and then navigate using the UI.
If you want to change the folder from which files can be downloaded, replace the value of the `desktopPath` variable in `app.js` with the full path of your target folder.

## Known Issues

When you start the server, the host IP address is printed: if it says "not found", you forgot to turn on the computer's hotspot.
