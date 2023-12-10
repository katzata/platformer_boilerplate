import filters from "./filters/filters";
import effects from "./effects/effects";
import controls from "./controls/controls";
import Application from "./App";
import Stage from "./scene/Stage";
import Scene from "./scene/Scene";

import * as stageTypes from "./scene/Stage";

export const components = { Application, Scene, Stage };
export { controls, effects, filters };

export namespace types {
	// export import StageTypes = stageTypes.StageScene;
}
