import * as PIXI from "pixi.js";
import { controlsTypes, gamepadTypes } from "../types";
import { gamepadDefaults, gamepadDefaultMap } from "./defaults";
import { utils } from "../../core";

interface Mapping extends controlsTypes.Binding {
	active?: boolean;
}

interface ButtonMap extends gamepadTypes.GamepadScheme {
	playerId?: string;
	buttons?: Record<string, Mapping>;
}

/**
 * Handles all gamepad instances.
 *
 * Applies default controller mapping and settings.
 *
 * Activates and deactivates a ticker (the ticker stops if no gamepads are connected).
 */
export default class GamepadController {
	buttonMaps: ButtonMap[] = [];
	controllerMaps: Record<string, string> = gamepadDefaultMap[0].scheme;
	tickerActive: boolean = false;
	settings: gamepadTypes.Settings = {
		deadZone: 0.1,
		autoFire: false,
		autoFireExceptions: ["up", "down", "left", "right"],
	};

	constructor() {
		const inputCheck = (e) => this.handleInput(e);

		window.addEventListener("gamepadconnected", () => {
			if (!this.tickerActive) {
				PIXI.Ticker.shared.add(inputCheck);
				this.tickerActive = true;
			}
		});

		window.addEventListener("gamepaddisconnected", () => {
			const gamepadsCheck = window.navigator.getGamepads().filter((pad) => pad !== null).length === 0;

			if (this.tickerActive && gamepadsCheck) {
				PIXI.Ticker.shared.remove(inputCheck);
				this.tickerActive = false;
			}
		});
	}

	/**
	 * Add a controls scheme to the gamepad controller.
	 * Replaces existing schemes if the playerName is the same.
	 * @param playerName The player name.
	 * @param controlScheme The player controls scheme.
	 */
	public addScheme(playerName: string, controlScheme?: gamepadTypes.GamepadScheme) {
		const playerId = utils.removeSpaces(playerName);
		const index = this.buttonMaps.find((buttonMap, idx) => {
			if (buttonMap.playerId) return idx;
		}) as undefined as number;

		const buttons = this.formatScheme((controlScheme ?? gamepadDefaults).buttons);
		const axes = (controlScheme ?? gamepadDefaults).axes;

		if (!index) {
			this.buttonMaps.push({ playerId, buttons, axes });
		} else {
			this.buttonMaps[index] = { playerId, buttons, axes };
		}
	}

	/**
	 * Add the necessary object keys to the control scheme mappings.
	 * @param {gamepadTypes.GamepadScheme} scheme The player gamepad control scheme.
	 * @returns A newly constructed object containing the additional keys.
	 */
	private formatScheme(scheme: Record<string, any>) {
		const newScheme = { ...scheme };
		let exceptions = [...this.settings.autoFireExceptions];

		for (const key in scheme) {
			newScheme[key] = scheme[key];
			newScheme[key].active = false;

			const index = exceptions.indexOf(key);

			if (index > -1) {
				newScheme[key].autoFireException = true;
				exceptions = exceptions.splice(index, 1);
			}
		}

		return newScheme;
	}

	/**
	 * Remove an already existing scheme
	 */
	public removeScheme(playerName: string) {
		const playerId = utils.removeSpaces(playerName);
		this.buttonMaps = this.buttonMaps.filter((buttonMap) => buttonMap.playerId !== playerId);
	}

	/**
	 * Handle button and analog stick input.
	 * Will be passed to the pixi ticker.
	 */
	private handleInput(delta: number) {
		const gamepads = window.navigator.getGamepads();
		let playerIdx = 0;

		for (let i = 0; i < gamepads.length; i++) {
			if (!gamepads[i] || !this.buttonMaps[playerIdx]) continue;

			this.handleButtons(delta, playerIdx, gamepads[i]);
			this.handleAnalogs(delta, playerIdx, gamepads[i]);

			playerIdx++;
		}
	}

	/**
	 * Handle all button presses.
	 * Block buttons in order to prevent auto fire if necessary (accepts exceptions).
	 * @param {controlsTypes.GamepadExtended} gamepad The actual Gamepad instance.
	 */
	private handleButtons(delta: number, playerIdx: number, gamepad: Gamepad) {
		const buttons = gamepad.buttons;
		const bindingCheck = (binding) => {
			return !this.settings.autoFire ? binding?.autoFireException ?? !binding?.active : true;
		};

		for (let i = 0; i < buttons.length; i++) {
			const end = buttons.length - 1 - i;
			const binding = this.buttonMaps[playerIdx].buttons[this.controllerMaps[i]];
			const binding2 = this.buttonMaps[playerIdx].buttons[this.controllerMaps[end]];

			if (!buttons[i].pressed && binding?.active) binding.active = false;
			if (!buttons[end].pressed && binding2?.active) binding2.active = false;

			if (!this.controllerMaps[i] || !this.buttonMaps[playerIdx].buttons[this.controllerMaps[i]]) continue;
			if (i >= end) break;

			if (buttons[i].pressed && bindingCheck(binding) && binding?.callback) {
				binding.callback(delta);
				binding.active = true;
			}

			if (buttons[end].pressed && bindingCheck(binding2) && binding2?.callback) {
				binding2.callback(delta);
				binding2.active = true;
			}
		}
	}

	/**
	 * Handle analog stick offsets....
	 * Apply dead zone.
	 * Apply Y axis inversion.
	 * Trigger a predefined
	 * @param delta Delta from the pixi ticker.
	 * @param playerIdx The player index.
	 * @param gamepad The gamepad from the api.
	 */
	private handleAnalogs(delta: number, playerIdx: number, gamepad: Gamepad) {
		const invertLeftY = this.buttonMaps[playerIdx].axes?.options.invertLeftY;
		const invertRightY = this.buttonMaps[playerIdx].axes?.options.invertRightY;

		const buttons = this.buttonMaps[playerIdx].buttons;
		const axes = Object.entries(this.buttonMaps[playerIdx].axes.bindings);

		for (let i = 0; i < gamepad.axes.length; i++) {
			let directionCalc =
				gamepad.axes[i] > 0
					? (gamepad.axes[i] - this.settings.deadZone) / (1 - this.settings.deadZone)
					: (gamepad.axes[i] - this.settings.deadZone * -1) / (1 - this.settings.deadZone);

			if ((invertLeftY && i === 1) || (invertRightY && i === 3)) directionCalc *= -1;
			if (Math.abs(gamepad.axes[i]) < this.settings.deadZone) continue;

			const [action, func] = axes[i];

			if (
				(action === "moveX" || action === "moveY") &&
				(buttons.left.active || buttons.right.active || buttons.up.active || buttons.down.active) &&
				directionCalc !== 0
			) {
				continue;
			}

			func?.callback(delta, directionCalc);
		}
	}
}
