import * as PIXI from "pixi.js";
import filters from "./filters/filters";
import effects from "./effects/effects";
import controls, { controlsTypes } from "./controls/controls";
import Application from "./App";
import Stage, { stageTypes } from "./scene/Stage";
import Scene, { sceneTypes } from "./scene/Scene";
import Char, { charTypes } from "./scene/chars/Char";

import * as utils from "./utils/utils";

export const components = { Application, Scene, Stage, Char };
export namespace components2 {
	Scene;
}

const emitter = new PIXI.utils.EventEmitter();

export { controls, effects, filters, emitter, utils };

export namespace types {
	export import StageScene = stageTypes.StageScene;
	export import SceneOptions = sceneTypes.SceneOptions;
	export import Char = charTypes.IChar;
	export import Binding = controlsTypes.Binding;
}
