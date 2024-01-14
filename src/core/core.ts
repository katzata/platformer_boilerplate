import * as PIXI from "pixi.js";

import Application from "./App";
import Stage, { stageTypes } from "./scene/Stage";
import Scene, { sceneTypes } from "./scene/Scene";
import Char, { charTypes } from "./scene/chars/Char";

import controls from "./controls/controls";
import { controlsTypes } from "./controls/types";

import * as utils from "./utils/utils";

import filters from "./filters/filters";
import effects from "./effects/effects";

const emitter = new PIXI.utils.EventEmitter();

export { controls, effects, filters, emitter, utils, PIXI };
export const components = { Application, Scene, Stage, Char };
export namespace types {
	export import StageScene = stageTypes.StageScene;
	export import SceneOptions = sceneTypes.SceneOptions;
	export import Char = charTypes.IChar;
	export import Binding = controlsTypes.Binding;
}
