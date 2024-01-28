const fs = require("fs");

module.exports = class PrepareAssets {
	assetsFolder = fs.readdirSync("./src/game/assets/scenes", { recursive: true });
	manifest = {};
	assetsLog = {};

	constructor(options) {
		this.options = options ?? { allowedExtensions: [] };
	}

	apply(compiler) {
		compiler.hooks.afterEmit.tap("Assets Manifest Plugin", (stats) => this.assetsManifest(stats));
	}

	assetsManifest(stats) {
		const { allowedExtensions, destFolder } = this.options;
		let totalAssets = 0;

		for (const asset of this.assetsFolder) {
			if (asset.indexOf("\\") === -1) {
				this.manifest[asset] = [];
			} else {
				const filePath = this.getFilePath(asset);

				if (!filePath) continue;
				if (!allowedExtensions.filter((ext) => filePath.indexOf(ext) > -1)[0]) continue;

				const originPath = `${asset.split("\\").join("/")}`;
				const key = asset.split("\\")[0];
				const file = originPath.match(/\/\w*\.\w*$/)[0];
				const folder = `assets/scenes/${originPath.slice(0, originPath.length - file.length)}`;

				if (!fs.existsSync(`./${this.options.destFolder}/${folder}`))
					fs.mkdirSync(`./${this.options.destFolder}/${folder}`, { recursive: true });

				this.copyFile(`./src/game/${filePath.slice(destFolder.length + 3)}`, filePath);

				if (this.manifest[key]) this.manifest[key].push(`./${folder}/${file}`);
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

			this.assetsLog[assetKey] = fs.statSync(from).size;
		};

		try {
			copy(from, filePath);
		} catch (err) {
			if (fs.statSync(from) && this.assetsLog[assetKey] === fs.statSync(from).size) return;

			fs.unlinkSync(filePath);
			copy(from, filePath);
		}
	}

	getFilePath(string) {
		const path = string.indexOf(".") >= 0 ? string : null;
		return path ? `./${this.options.destFolder}/assets/scenes/${path.split("\\").join("/")}` : null;
	}
};
