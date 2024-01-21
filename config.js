const path = require("path");
const { argv } = require("process");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PrepareAssets = require("./plugins/PrepareAssets");
const { parseArgs } = require("./scripts/parseArgs");

const args = parseArgs(argv);
const { mode } = Object.fromEntries(args);
const destFolder = mode === "development" ? "public" : "build";

module.exports = {
	entry: {
		main: "./src/index.ts",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
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
		path: path.join(__dirname, destFolder),
		publicPath: "",
		filename: "bundle.js",
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: false,
			verbose: false,
			cleanAfterEveryBuildPatterns: [destFolder],
		}),
		new CopyPlugin({
			patterns: [{ from: `./src/styles`, to: "styles" }],
		}),
		new PrepareAssets({
			allowedExtensions: ["png", "json"],
			destFolder,
		}),
		new HtmlWebpackPlugin({
			title: "Platformer boilerplate",
			template: "./src/index.html",
		}),
	],
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		static: {
			directory: path.join(__dirname, destFolder),
		},
		compress: true,
		port: 9000,
	},
};
