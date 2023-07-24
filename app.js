import express from "express";
import os from "os";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

const __dirname = path.resolve();
const desktopPath = "C:\\Users\\jgsil\\Desktop";

const networkInterfaces = os.networkInterfaces();
let hostIp;
if (networkInterfaces["WiFi"]) {
	hostIp = networkInterfaces["WiFi"][1].address;
} else if (networkInterfaces["Local Area Connection* 3"]) {
	hostIp = networkInterfaces["Local Area Connection* 3"][1].address;
} else {
	hostIp = "not found"
}

app.use(express.static(__dirname + "/homepage"));

app.listen(port, () => {
	console.log(`Application running on port ${port} \nIP address: ${hostIp}`);
});

app.get("/", (req, res) => {
	return res.sendFile(path.join(__dirname, "homepage", "index.html"));
});

app.get("/desktop/list", (req, res) => {
	try {
		let filesArray = [];
		fs.readdir(desktopPath, (err, files) => {
			files.forEach((file) => {
				if (fs.lstatSync(path.resolve(desktopPath, file)).isFile()) {
					const exclusionRegex = /\.(lnk|url|bat|bkp)$/;
					if (!exclusionRegex.test(file)) {
						filesArray.push(file);
					}
				}
			});

			return res.status(200).json({ desktopFiles: filesArray });
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

app.get("/desktop/:filename", (req, res) => {
	try {
		res.download(path.join(desktopPath, req.params.filename));
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});
