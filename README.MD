# NEAT.js

# This README is not complete as well as the library which is still in production.

NeuroEvolution of Augmenting Topologies (NEAT) is a genetic algorithm (GA) for the generation of evolving artificial neural networks.

This library implements this technology in TypeScript which then gets compiles into JavaScript for use in Node.js or browsers.
 ![license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![issues](https://img.shields.io/github/issues/ExtensionShoe/NEAT.svg)



## Getting Started

You have the following choices to in order to include this library in your project:

### Option 1 (Node.js)

Use the following command in order to download the library:
```
npm install neatastic
```
NPM will download the library and build the JavaScript files automatically inside the ```./build``` folder without needing extra work.
To use the library inside a Node.js environment you need the following ```require()``` command.
```js
let NEAT = require("neatastic").NEAT;
```
You can later use the constructor as such:
```js
let config = {
   populationSize:150,
   structure:{
      in:5,
      hidden:0,
      out:2
   },
   mutationRate:{
      addNodeMR:0.01,
      addConnectionMR:0.02,
      removeNodeMR:0.01,
      removeConnectionMR:0.015,
      changeWeightMR:0.1
   },
   distanceConstants:{
      c1:1,
      c2:1,
      c3:1,
      compatibilityThreshold:.7
   },
    activationFunction:NEAT.ActivationFunction.RELU
}
let NEAT = require("neatastic").NEAT;
let neat = new NEAT(config);
```


### Option 2 (Browser)
Use the following command in order to download the library:
```
npm install neatastic
```
NPM will download the library and build the JavaScript files automatically inside the ```./build``` folder.

You can then include the ```NEATbundle_es.js``` file in your HTML file as such:
```html
<script src="./build/NEATbundle_es.js"></script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
