interface IActivationFunction {
	(input: number): number;
}

let SIGMOID: IActivationFunction = function (input: number): number {
	return 1 / (1 + Math.exp(-input));
}

let TANH: IActivationFunction = function (input: number): number {
	return Math.tanh(input);
}

let RELU: IActivationFunction = function (input: number): number {
	return input > 0 ? input : 0;
}

let ActivationFunction = { SIGMOID: SIGMOID, TANH: TANH, RELU: RELU };


export { IActivationFunction, ActivationFunction };