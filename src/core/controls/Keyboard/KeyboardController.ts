import * as PIXI from "pixi.js";
import { keyboardDefaults, keyboardDefaultMap } from "./defaults";
import { utils } from "../../core";

export namespace keyboardTypes {
	export interface KeyMap {
		action?: string;
		active?: boolean;
		playerId?: string;
		callback?: (delta?: number) => void;
	}
}

export default class KeyboardController {
	keyBindings: Record<string, string> = {};
	controlSchemes: Record<string, keyboardTypes.KeyMap> = {};
	defaults: Record<string, Record<string, string>> = keyboardDefaultMap;

	constructor() {
		window.addEventListener("keydown", this.onEvent);
		window.addEventListener("keyup", this.onEvent);

		this.initBindings();

		PIXI.Ticker.shared.add(this.monitorKeys);
	}

	/**
	 * Initialize the keyboard bindings
	 */
	private initBindings() {
		this.keyBindings = this.defaults.scheme1;
	}

	/**
	 * Add a controls scheme to the main controls ticker.
	 * @param playerName The name of the player that will use the controls scheme.
	 * @param controlScheme The controls scheme.
	 */
	public addScheme(playerName: string, controlScheme: Record<string, keyboardTypes.KeyMap>) {
		const filteredScheme = this.removeDuplicateKeys(playerName, controlScheme);
		const newScheme = {};
		const playerId = utils.removeTextSpaces(playerName);

		for (const key in filteredScheme) {
			newScheme[key] = {
				active: false,
				playerId,
				...filteredScheme[key],
			};
		}

		Object.assign(this.controlSchemes, newScheme);
		console.log(this.controlSchemes);
	}

	/**
	 * Apply new keys over existing ones.
	 * @param playerName The name of the player that has used the controls scheme.
	 * @param controlScheme The controls scheme.
	 * @returns The updated key bindings.
	 */
	private removeDuplicateKeys(playerName: string, controlScheme: Record<string, keyboardTypes.KeyMap>) {
		if (!Object.keys(this.controlSchemes).length) return controlScheme;

		const playerId = utils.removeTextSpaces(playerName);
		const filteredBindings = Object.entries(this.controlSchemes).filter(
			(binding) => binding[1].playerId === playerId,
		);

		for (const [filteredKey, binding] of filteredBindings) {
			for (const key in controlScheme) {
				if (filteredKey !== key && controlScheme[key].callback) continue;

				binding.callback = controlScheme[key].callback;
			}
		}

		return filteredBindings;
	}

	/**
	 * Remove an already existing scheme
	 */
	public removeScheme(playerName: string) {
		const playerId = utils.removeTextSpaces(playerName);
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
		for (const key in this.controlSchemes) {
			if (this.controlSchemes[key].active && this.controlSchemes[key].callback) {
				this.controlSchemes[key].callback(delta);
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
			if (!this.controlSchemes[keyBinding]?.callback) {
				console.warn(`Key binding ${keyEvent.code} is not assigned.`);
				return;
			}

			if (this.controlSchemes[keyBinding].active === keyState) return;

			this.controlSchemes[keyBinding].active = keyState;
		}
	};
}
