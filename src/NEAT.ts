import { Genome, StructureConfig, IFitnessFunction } from "./Genome";
import { Connection } from "./Connection";
import { Node, NodeType } from "./Node";
import { Species } from "./Species";

interface NEATConfig {
	populationSize: number;
	structure: StructureConfig;
	fitnessThreshold: number;
	maxEpoch: number;
	mutationRate?: MutationRateConfig;
	distanceConstants?: DistanceConfig;
	fitnessFunction: IFitnessFunction;
}

interface MutationRateConfig {
	addNodeMR: number;
	addConnectionMR: number;
	removeNodeMR: number;
	removeConnectionMR: number;
	changeWeightMR: number;
}

interface DistanceConfig {
	c1: number;
	c2: number;
	c3: number;
	compatibilityThreshold: number;
}

class NEAT {
	config: NEATConfig;
	species: Species[] = [];
	nodeInnovation: number;
	connectionInnovation: number;
	connectionDB: Connection[] = [];
	nodeDB: Node[] = [];

	constructor(config: NEATConfig) {

		this.config = config;

		config.structure.hidden = (config.structure.hidden !== undefined) ? config.structure.hidden : 0;
		this.nodeInnovation = config.structure.in + config.structure.hidden + config.structure.out - 1;
		this.connectionInnovation = 0;

		if (config.mutationRate) {
			config.mutationRate.addNodeMR = (config.mutationRate.addNodeMR !== undefined) ? config.mutationRate.addNodeMR : 0.02;
			config.mutationRate.addConnectionMR = (config.mutationRate.addConnectionMR !== undefined) ? config.mutationRate.addConnectionMR : 0.1;
			config.mutationRate.removeNodeMR = (config.mutationRate.removeNodeMR !== undefined) ? config.mutationRate.removeNodeMR : 0.05;
			config.mutationRate.removeConnectionMR = (config.mutationRate.removeConnectionMR !== undefined) ? config.mutationRate.removeConnectionMR : 0.1;
			config.mutationRate.changeWeightMR = (config.mutationRate.changeWeightMR !== undefined) ? config.mutationRate.changeWeightMR : 0.1;
		} else {
			config.mutationRate = { addNodeMR: 0.02, addConnectionMR: 0.1, removeNodeMR: 0.05, removeConnectionMR: 0.1, changeWeightMR: 0.1 };
		}

		this.species.push(new Species());
		for (let i = 0; i < config.populationSize; i++) {
			this.species[0].addGenome(new Genome({ in: config.structure.in, hidden: config.structure.hidden, out: config.structure.out, activationFunc: config.structure.activationFunc }));
		}
	}

	mutate() {
		this.species.forEach(specie => {
			specie.mutateNode(this.config.mutationRate.addNodeMR, this);
			specie.mutateConnection(this.config.mutationRate.addConnectionMR, this);
			specie.mutateDeactivateNode(this.config.mutationRate.removeNodeMR);
			specie.mutateDeactivateConnection(this.config.mutationRate.removeConnectionMR);
			specie.mutateWeight(this.config.mutationRate.changeWeightMR);
		});
	}

	speciate() {
		let genomes: Genome[] = [];
		for (let i = 0; i < this.species.length; i++) {
			genomes = genomes.concat(this.species[i].getGenomes());
		}

		this.species = Species.speciate(genomes, this.config.distanceConstants);
	}
}

export { NEAT, Connection, Node, NEATConfig, NodeType, Genome, MutationRateConfig, DistanceConfig, Species };
export * from "./ActivationFunction"; // This stupid thing is here because of an issue with rollup-plugin-typescript. Don't judge me.