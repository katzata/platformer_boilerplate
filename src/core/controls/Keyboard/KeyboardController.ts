import * as PIXI from "pixi.js";
import { keyboardDefaults, keyboardDefaultMap } from "./defaults";
import { controlsTypes, keyboardTypes } from "../types";
import { utils } from "../../core";

/**
 * Handles all keyboard presses.
 *
 * Applies default keyboard mapping and settings.
 */
export default class KeyboardController {
	keyBindings: Record<string, keyboardTypes.KeyMap> = {};
	controlSchemes: Record<string, keyboardTypes.KeyMap> = {};
	defaults: Record<string, Record<string, string>> = keyboardDefaultMap;
	activeKeys: keyboardTypes.KeyMap[] = [];
	players: Record<string, Record<string, string>> = {
		"1": null,
		"2": null,
	};
	settings: keyboardTypes.Settings = {
		autoFire: false,
		autoFireExceptions: ["up", "down", "left", "right"],
	};

	constructor() {
		window.addEventListener("keydown", this.onEvent);
		window.addEventListener("keyup", this.onEvent);

		// this.initBindings();

		PIXI.Ticker.shared.add(this.monitorKeys);
	}

	/**
	 * Add a controls scheme to the main controls ticker.
	 * @param playerName The name of the player that will use the controls scheme.
	 * @param controlScheme The controls scheme.
	 */
	public addScheme(playerName: string, controlScheme: Record<string, controlsTypes.Binding>) {
		let newScheme = {};
		const playerId = utils.removeSpaces(playerName);

		for (const [index, data] of Object.entries(this.players)) {
			if (!data) {
				const mapping = { ...this.defaults[`mapping${index}`] };

				for (const key in mapping) {
					newScheme[key] = {
						...controlScheme[mapping[key]],
						active: false,
						playerId,
					};
				}

				this.players[index] = newScheme;
				break;
			}
		}

		Object.assign(this.keyBindings, newScheme);
	}

	/**
	 * Remove an already existing scheme
	 */
	public removeScheme(playerName: string) {
		const playerId = utils.removeSpaces(playerName);
		const toRemove = Object.entries(this.controlSchemes).filter((binding) => binding[1].playerId === playerId);

		for (const [key] of toRemove) {
			if (this.controlSchemes[key]) delete this.controlSchemes[key];
		}
	}

	/**
	 * Monitor for key presses and call the appropriate function.
	 * @param delta The difference between each frame.
	 */
	private monitorKeys = (delta: number) => {
		const keys = [...this.activeKeys];

		for (const key of keys) {
			if (key.active && key.callback) {
				key.callback(delta);
			}
		}
	};

	/**
	 * An event listener that is fired on "keydown" and "keyup".
	 * @param keyEvent The keyboard event.
	 */
	private onEvent = (keyEvent: KeyboardEvent) => {
		const keyState = keyEvent.type === "keydown";
		const keyBinding = this.keyBindings[keyEvent.code];

		if (keyBinding) {
			if (!keyBinding?.callback) {
				console.warn(`Key binding ${keyEvent.code} is not assigned.`);
				return;
			}

			if (keyBinding.active === keyState) return;

			keyBinding.active = keyState;

			if (keyState) {
				this.activeKeys.push(keyBinding);
			} else {
				const index = this.activeKeys.indexOf(keyBinding);
				this.activeKeys.splice(index, 1);
			}
		}
	};
}
