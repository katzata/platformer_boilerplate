import * as PIXI from "pixi.js";

import Application from "./App";
import Stage, { stageTypes } from "./scene/Stage";
import Scene, { sceneTypes } from "./scene/Scene";
import Char, { charTypes } from "./scene/chars/Char";

import controls from "./controls/controls";
import { controlsTypes } from "./controls/types";

import effects from "./effects/effects";
import filters from "./filters/filters";

import * as shakerOptions from "./effects/Shaker";
import * as utils from "./utils/utils";

export const emitter = new PIXI.utils.EventEmitter();
export const components = { Application, Scene, Stage, Char };

export { controls, effects, filters, utils, PIXI };

export namespace types {
	export import StageScene = stageTypes.StageScene;
	export import SceneOptions = sceneTypes.SceneOptions;
	export import Char = charTypes.IChar;
	export import CharOptions = charTypes.CharOptions;
	export import Binding = controlsTypes.Binding;
	export import ShakerOptions = shakerOptions.ShakerOptions;
}
