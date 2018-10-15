# @magenta/image

[![npm version](https://badge.fury.io/js/%40magenta%2Fimage.svg)](https://badge.fury.io/js/%40magenta%2Fimage)

This JavaScript implementation of Magenta's image models uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference.

Complete documentation is available at https://magenta.github.io/magenta-js/image.

## Contents

- [Example Applications](#example-applications)
- [Supported Models](#supported-models)
- [Getting Started](#getting-started)

## Example Applications

You can try our [hosted demos](https://magenta.github.io/magenta-js/image/demos) for each model and have a look at the [demo code](./demos).

## Supported Models

### Fast Arbitrary Image Stylization

Implements Ghiasi et al.'s fast arbitrary style transfer model ([paper](https://arxiv.org/abs/1705.06830), [code](https://github.com/tensorflow/magenta/tree/master/magenta/models/arbitrary_image_stylization)). Wraps around Reiichiro Nakano's [TensorFlow.js port](https://github.com/reiinakano/arbitrary-image-stylization-tfjs) of the model checkpoint.

## Getting started

There are two main ways to get MagentaImage.js in your JavaScript project:
via [script tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage) **or** by installing it from [NPM](https://www.npmjs.com/)
and using a build tool like [yarn](https://yarnpkg.com/en/).

### via Script Tag

Add the following code to an HTML file, and place a content (`content.jpg`) and style (`style.jpg`) image i