export namespace controlsTypes {
	export interface Binding {
		autoFireException?: boolean;
		callback?: (delta?: number) => void;
	}

	export interface Settings {
		autoFire: boolean;
		autoFireExceptions: string[];
	}

	export interface ControlSchemes {
		[key: string]: Record<string, controlsTypes.Binding>;
	}
}

export namespace keyboardTypes {
	export interface KeyMap extends controlsTypes.Binding {
		active?: boolean;
		playerId?: string;
	}

	export interface Settings extends controlsTypes.Settings {}
}

export namespace gamepadTypes {
	export interface GamepadScheme {
		buttons?: Record<string, controlsTypes.Binding>;
		axes?: {
			bindings: AxesMap;
			options: GamepadAxesOptions;
		};
	}

	export interface GamepadAxesOptions {
		invertLeftY?: boolean;
		invertRightY?: boolean;
	}

	interface AxesMap {
		[key: string]: {
			callback: (delta: number, offset: number) => void;
		};
	}

	export interface Settings extends controlsTypes.Settings {
		deadZone: number;
	}
}
