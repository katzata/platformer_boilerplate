const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const assetsManifest = require("./scripts/assetsManifest");

assetsManifest({
	extensions: ["png"],
});

module.exports = {
	mode: "development",
	entry: {
		main: "./src/index.ts",
	},
	module: {
		rules: [
			{
				test: /.s?css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.js/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		modules: ["node_modules", "/abs_path/to/global/node_modules"],
		extensions: [".ts", ".js"],
	},
	output: {
		path: path.join(__dirname, "public"),
		publicPath: "",
		filename: "bundle.js",
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: false,
			verbose: false,
			cleanOnceBeforeBuildPatterns: ["public"],
		}),
		new CopyPlugin({
			patterns: [
				{ from: `./src/game/assets`, to: "assets" },
				{ from: `./src/styles`, to: "styles" },
			],
		}),
		new HtmlWebpackPlugin({
			title: "Platformer boilerplate",
			template: "./src/index.html",
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 9000,
	},
};
