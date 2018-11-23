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
more complete list is available on the [Magenta site](https://magen