# DDSP

## Preset Checkpoints

There are [4 DDSP Preset models](../../checkpoints) you can use, you can also create and use your own.

## Using DDSP

To start using DDSP, create a new instance of DDSP and initialize it:

```
const violinDDSP = new DDSP(
  "https://storage.googleapis.com/magentadata/js/checkpoints/ddsp/violin"
);
await violinDDSP.initialize();
```
