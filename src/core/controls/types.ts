export namespace controlsTypes {
	export interface Binding {
		autoFireException?: boolean;
		active?: boolean;
		callback?: action;
	}

	export interface Settings {
		autoFire?: boolean;
		autoFireExceptions?: string[];
	}

	export type action = (delta?: number, offset?: number) => void;
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
			bindings: Record<string, controlsTypes.Binding>;
			options: AxisOptions;
		};
	}

	export interface AxisOptions extends controlsTypes.Settings {
		invertLeftY?: boolean;
		invertRightY?: boolean;
	}

	export interface Settings extends controlsTypes.Settings {
		deadZone: number;
	}
}
