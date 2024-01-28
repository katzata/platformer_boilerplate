export interface TexturePortionOptions {
	frame?: {
		x?: number;
		y?: number;
		width?: number;
		height?: number;
	};
}

export interface DelayOptions {
	callBack?: () => any;
	repeat?: boolean;
}
