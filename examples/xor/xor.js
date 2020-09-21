let NEAT = require("./build/NEATbundle_cjs");

let func = function(a) {
	let fitness = 4;
	fitness -= Math.abs(a.activate([1, 1])[0]);
	fitness -= Math.abs(a.activate([1, 0])[0] - 1);
	fitness -= Math.abs(a.activate([0, 1])[0] - 1);
	fitness -= Math.abs(a.activate([0, 0])[0]);
	if (a.connections.length < 2) fitness *= .001;
	return Math.max(fitness, 0.001);
}

let config = {
	populationSize: 1500,
	structure: {
		in: 2,
		hidden: 0,
		out: 1,
		activationFunc: NEAT.ActivationFunction.RELU
	},
	mutationRate: {
		addNodeMR: 0.005,
		addConnectionMR: .01,
		removeNodeMR: 0.0001,
		removeConnectionMR: 0.01,
		changeWeightMR: 0.1
	},
	distanceConstants: {
		c1: 2,
		c2: .5,
		c3: 1,
		compatibilityThreshold: 1.5
	},
	fitnessThreshold: 3.5,
	fitnessFunction: func,
	maxEpoch: 450
}

var neat = new NEAT.NEAT(config);

neat.run();