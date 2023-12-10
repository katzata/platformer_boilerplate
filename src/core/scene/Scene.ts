import * as PIXI from "pixi.js";

export default class Scene extends PIXI.Container {
	name: string;
	assets: any;
	bundles: Record<string, Record<string, string>> = {};

	constructor(parent: PIXI.Container, name: string, assetPaths?: string[]) {
		super();

		this.name = name || `${parent} child ${parent.children.length - 1}`;
		this.parent = parent;
		this.assets = assetPaths;

		parent.addChild(this);
		this.init();
	}

	private async init() {
		const total = this.assets.length;
		let count = 0;
		let percentage = 0;

		for (const path of this.assets) {
			const extension = path.slice(2).split(".").pop();
			const folders = path.slice(2).split(".")[0].split("/");
			const fileName = folders.pop();

			if (PIXI.Assets.resolver.hasKey(fileName)) continue;

			await PIXI.Assets.load({
				alias: fileName,
				src: path,
			});

			if (folders.length < 4) continue;

			this.handleBundles(folders.pop(), fileName, extension);

			percentage = Math.round((count++ / total) * 100);
		}

		percentage = 100;

		this.onLoad();
	}

	onLoad() {}

	private handleBundles(bundle: string, fileName: string, extension: string) {
		const normalizedName = this.handleSpaces(fileName);

		if (!this.bundles[bundle]) {
			this.bundles[bundle] = {};

			this.bundles[bundle][normalizedName] = `${fileName}.${extension}`;
		} else {
			this.bundles[bundle][normalizedName] = `${fileName}.${extension}`;
		}
	}

	// utils maybe ?
	private handleSpaces(fileName: string) {
		let newFileName = fileName;

		while (newFileName.indexOf(" ") > -1) {
			newFileName = newFileName.replace(" ", "_");
		}

		return newFileName;
	}
}
