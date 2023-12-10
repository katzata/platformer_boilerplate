// import fs from "fs-extra";
const fs = require("fs");

function assetsManifest(options) {
	const manifest = {};
	const folderContents = fs.readdirSync("./src/game/assets/scenes", { recursive: true });

	for (const item of folderContents) {
		if (item.indexOf("\\") === -1) {
			manifest[item] = [];
		} else {
			const key = item.split("\\")[0];

			const path = getFilePath(item);
			if (path) manifest[key].push(path);
		}
	}

	fs.writeFileSync("./src/game/assets/assetsManifest.json", JSON.stringify(manifest, undefined, 4));
}

function getFilePath(string) {
	let isPath = false;

	for (let i = string.length; i > 0; i--) {
		if (string[i] === ".") isPath = true;
		if (string[i] === "\\") break;
	}

	return isPath ? handleString(string) : null;
}

function handleString(item) {
	return "./assets/scenes/" + item.split("\\").join("/");
}

module.exports = assetsManifest;
