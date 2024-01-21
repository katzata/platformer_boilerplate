module.exports = {
	parseArgs: (args) => {
		const parsedArgs = [];

		args.forEach((arg) => {
			if (arg.slice(0, 2) !== "--") return;
			const [key, val] = arg.split("=");
			parsedArgs.push([key.slice(2) ?? arg, val || null]);
		});

		return parsedArgs;
	},
};
