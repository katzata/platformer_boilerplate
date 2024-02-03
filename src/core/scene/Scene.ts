import * as PIXI from "pixi.js";
import { controls, utils } from "../core";

export namespace sceneTypes {
	export interface SceneOptions {
		assetPaths?: string[];
	}
}

export default class Scene extends PIXI.Container {
	name: string;
	assets: any;
	bundles: Record<string, Record<string, string>> = {};
	controls?: typeof controls = controls;

	constructor(name: string, options?: sceneTypes.SceneOptions) {
		super();

		this.name = name || "Scene";
		this.assets = options?.assetPaths ?? [];

		this.init();
	}

	private async init() {
		const total = this.assets?.length;
		let count = 0;
		let percentage = 0;

		for (const path of this.assets) {
			const extension = path.slice(2).split(".").pop();
			const folders = path.slice(2).split(".")[0].split("/");
			const fileName = folders.pop();

			if (PIXI.Assets.resolver.hasKey(fileName)) continue;

			if (path.slice(path.length - 4) !== "json") {
				await PIXI.Assets.load(path);
			} else {
				await PIXI.Assets.load({
					alias: fileName + `${path.split(".")[0]}`,
					src: path.slice(2),
				});
			}

			if (folders.length < 4) continue;

			this.handleBundles(folders.pop(), fileName, extension);

			percentage = Math.round((count++ / total) * 100);
		}

		percentage = 100;

		this.onLoad();
	}

	onLoad() {}

	private handleBundles(bundle: string, fileName: string, extension: string) {
		const normalizedName = utils.removeSpaces(fileName);

		if (!this.bundles[bundle]) {
			this.bundles[bundle] = {};

			this.bundles[bundle][normalizedName] = `${fileName}.${extension}`;
		} else {
			this.bundles[bundle][normalizedName] = `${fileName}.${extension}`;
		}
	}
}
