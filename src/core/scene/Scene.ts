import * as PIXI from "pixi.js";

export default class Scene extends PIXI.Container {
	name: string;
	loadedComponents = [];

	constructor(parent: PIXI.Container, name: string) {
		super();

		this.name = name || `${parent} child ${parent.children.length - 1}`;
		this.parent = parent;

		this.init();

		this.onLoad();
	}

	// onLoad(): any;
	private init() {}
	onLoad(...props: any) {}
}
