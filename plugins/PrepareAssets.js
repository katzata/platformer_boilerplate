const fs = require("fs");

module.exports = class PrepareAssets {
	assetsFolder = fs.readdirSync("./src/game/assets/scenes", { recursive: true });
	manifest = {};
	assetsLog = {};

	constructor(options) {
		this.options = options ?? { allowedExtensions: [] };
	}

	apply(compiler) {
		compiler.hooks.afterEmit.tap("Hello World Plugin", (stats) => this.assetsManifest());
	}

	assetsManifest() {
		const { allowedExtensions, destFolder } = this.options;
		let totalAssets = 0;

		for (let i = 0; i < this.assetsFolder.length; i++) {
			if (this.assetsFolder[i].indexOf("\\") === -1) {
				this.manifest[this.assetsFolder[i]] = [];
			} else {
				const filePath = this.getFilePath(this.assetsFolder[i]);

				if (!filePath) continue;
				if (!allowedExtensions.filter((ext) => filePath.indexOf(ext) > -1)[0]) continue;

				const key = this.assetsFolder[i].split("\\")[0];
				const file = filePath.match(/\/\w*\.\w*$/)[0];
				const folder = filePath.slice(0, filePath.length - file.length);

				if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
				this.copyFile(`./src/game/${filePath.slice(destFolder.length + 3)}`, filePath);

				if (this.manifest[key]) this.manifest[key].push(filePath);
				totalAssets++;
			}
		}

		if (!fs.existsSync(`./${destFolder}/assets`)) fs.mkdirSync(`./${destFolder}/assets`);

		fs.writeFileSync(
			`./${destFolder}/assets/assetsManifest.json`,
			JSON.stringify(this.manifest, null, 4),
		);

		console.log(`\nMoved ${totalAssets} files across ${Object.keys(this.manifest).length} scene folders`);
		console.log("assetsManifest.json created\n");
	}

	copyFile(from, filePath) {
		const temp = from.split("/");
		const assetKey = temp
			.slice(temp.length - 2)
			.join("-")
			.replace(".", "");

		const copy = (from, filePath) => {
			fs.copyFileSync(from, filePath, 1, (err) => {
				if (err) console.log("Error Found:\n", err);
			});

			assetsLog[assetKey] = fs.statSync(from).size;
		};

		try {
			copy(from, filePath);
		} catch (err) {
			if (assetsLog[assetKey] === fs.statSync(from).size) return;

			fs.unlinkSync(filePath);
			copy(from, filePath);
		}
	}

	getFilePath(string) {
		let isPath = string.indexOf(".") >= 0 ? string : null;
		return isPath ? `./${this.options.destFolder}/assets/scenes/${isPath.split("\\").join("/")}` : null;
	}
};
