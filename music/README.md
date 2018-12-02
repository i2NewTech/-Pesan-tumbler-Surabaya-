# @magenta/music

[![npm version](https://badge.fury.io/js/%40magenta%2Fmusic.svg)](https://badge.fury.io/js/%40magenta%2Fmusic) [![](https://data.jsdelivr.com/v1/package/npm/@magenta/music/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@magenta/music)

This JavaScript implementation of Magenta's musical note-based models uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference. For the Python TensorFlow implementations, see the [main Magenta repo](https://github.com/tensorflow/magenta).

Complete API documentation is available [here](https://magenta.github.io/magenta-js/music).

# Table of Contents

- [Getting started](#getting-started)
- [Usage](#usage)
  - [In the browser](#in-the-browser)
  - [In Node](#in-node)
- [API docs](https://magenta.github.io/magenta-js/music)
- [Supported Models](#supported-models)
  - [Onsets and Frames](#piano-transcription-w-onsets-and-frames)
  - [MusicRNN](#musicrnn)
  - [MusicVAE](#musicvae)
  - [MidiMe](#midime)
  - [Piano Genie](#piano-genie)
  - [GANSynth](#gansynth)
  - [SPICE](#spice)
  - [DDSP](#ddsp)
- [Model Checkpoints](#model-checkpoints)
  - [Pre-trained hosted checkpoints](#pre-trained-hosted-checkpoints)
  - [Your own checkpoints](#your-own-checkpoints)
- [Soundfonts](#soundfonts)
- [How To](#how-to)
  - [Use with a WebWorker](#use-with-a-web-worker)
  - [Use with a ServiceWorker](#use-with-a-service-worker)
  - [Use with TypeScript](#use-with-typescript)

## Getting started
If you want to get hands-on with Magenta, we've put together a small
[interactive tutorial](https://hello-magenta.glitch.me/) that takes you through
generating a small melody in the browser using a Machine Learning model.

Here are some examples of applications that have been built with `@magenta/music`. A
more complete list is available on the [Magenta site](https://magenta.tensorflow.org/demos).

- [Tone Transfer](http://g.co/tonetransfer) by [AIUX x Magenta](http://g.co/tonetransfer)
- [Fruit Genie](https://magenta.tensorflow.org/fruitgenie) by [Deeplocal](https://www.deeplocal.com/)
- [Drumbot](https://drumbot.glitch.me) by [Monica Dinculescu](https://github.com/notwaldorf)
- [Neural Drum Machine](https://goo.gl/magenta/neuraldrum) by [Tero Parviainen](https://github.com/teropa)
- [Piano Scribe](https://piano-scribe.glitch.me) by [Monica Dinculescu](https://github.com/notwaldorf) and [Adam Roberts](https://github.com/adarob)
- [Beat Blender](https://g.co/beatblender) by [Google Creative Lab](https://github.com/googlecreativelab)
- [Melody Mixer](https://g.co/melodymixer) by [Google Creative Lab](https://github.com/googlecreativelab)
- [Latent Loops](https://goo.gl/magenta/latent-loops) by [Google Pie Shop](https://github.com/teampieshop)

You can also try our [hosted demos](https://magenta.github.io/magenta-js/music/demos) for each model and have a look at their [code](./demos).

## Usage
There are several ways to get `@magenta/music` in your JavaScript project,
either in the browser, or in Node:

### In the browser
The models and the core library is split into smaller ES6 bundles (not ESModules, unfortunately 😢), so that you can use a model independent of the rest of the
library. These bundles don't package the `Tone.js` or `TensorFlow.js` dependencies (since
there would be a risk of downloading multiple copies on the same page). Here is an abbreviated example:

```html
<html>
<head>
  ...
  <!-- You need to bring your own Tone.js for the player, and tfjs for the model -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.58/Tone.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tensorflow/1.2.8/tf.min.js"></script>
  <!-- Core library, since we're going to use a player -->
  <script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0/es6/core.js"></script>
  <!--Model we want to use -->
  <script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0/es6/music_vae.js"></script>
</head>
<script>
  // Each bundle exports a global object with the name of the bundle.
  const player = new core.Player();
  //...
  const mvae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');
  mvae.initialize().then(() => {
    mvae.sample(1).then((samples) => player.start(samples[0]));
  });
</script>
</html>
```

- [click here](https://codepen.io/adarob/pen/gzwJZL) for a CodePen version
- [click here](https://hello-magenta-one-file.glitch.me/) to remix the code on Glitch

We also have an [ES5 bundle](https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0) that contains all the models and the core functions, but using in production is not recommended due to its size.

### In Node

You can use [@magenta/music][mm-npm] in your project using [yarn](https://yarnpkg.com/en/)
(by calling `yarn add @magenta/music`) **or** [npm](https://docs.npmjs.com/cli/npm)
(by calling `npm install --save @magenta/music`).

The node-specific bundles (that don't transpile the CommonJS modules) are under
`@magenta/music/node`. For example:

```js
const mvae = require('@magenta/music/node/music_vae');
const core = require('@magenta/music/node/core');

// Your code:
const model = new mvae.MusicVAE('/path/to/checkpoint');
const player = new core.Player();
model
  .initialize()
  .then(() => model.sample(1))
  .then(samples => {
    player.resumeContext();
    player.start(samples[0])
  });
```

#### Example Commands
`yarn install` to install dependencies.

`yarn test` to run tests.

`yarn build` to produce the different bundled versions.

`yarn run-demos` to build and serve the demos, with live reload.

*(Note: the default behavior is to build/watch all demos - specific demos can be built by passing a comma-separated list of specific demo names as follows: `yarn run-demos --demos=transcription,visualizer`)*

## Supported Models

We have made an effort to port our most useful 