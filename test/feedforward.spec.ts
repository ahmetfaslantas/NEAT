import { Genome } from "../src/Genome";
import { ActivationFunction, Connection } from "../src/NEAT";

describe("Feedforward test", () => {
	test("Check the result of the feedforward algorithm", () => {
		let structure = {
			in: 2,
			hidden: 0,
			out: 1,
			activationFunc: ActivationFunction.RELU
		};
		let genome = new Genome(structure);

		genome.connections.push(new Connection(genome.getNodes()[0], genome.getNodes()[2], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[1], genome.getNodes()[2], undefined, 1));
		genome.nodes = genome.nodes.sort(() => Math.random() - 0.5);
		expect(genome.activate([1, 1])[0]).toEqual(2);
	});

	test("Check the result of a complex network feedforward result", () => {
		let structure = {
			in: 2,
			hidden: 1,
			out: 1,
			activationFunc: ActivationFunction.RELU
		};
		let genome = new Genome(structure);

		genome.connections.push(new Connection(genome.getNodes()[0], genome.getNodes()[2], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[1], genome.getNodes()[2], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[2], genome.getNodes()[3], undefined, 1));
		expect(genome.activate([1, 1])[0]).toEqual(2);
	});

	test("Check the result of a even more complex network feedforward result", () => {
		let structure = {
			in: 2,
			hidden: 2,
			out: 1,
			activationFunc: ActivationFunction.RELU
		};
		let genome = new Genome(structure);

		genome.connections.push(new Connection(genome.getNodes()[0], genome.getNodes()[2], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[0], genome.getNodes()[3], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[1], genome.getNodes()[3], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[2], genome.getNodes()[4], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[2], genome.getNodes()[3], undefined, 1));
		genome.connections.push(new Connection(genome.getNodes()[3], genome.getNodes()[4], undefined, 1));
		expect(genome.activate([1, 1])[0]).toEqual(4);
	});
});