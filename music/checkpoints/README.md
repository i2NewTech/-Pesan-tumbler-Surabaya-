
# Hosted Checkpoints

Short link: https://goo.gl/magenta/js-checkpoints

You can load the pre-trained checkpoints below in your app directly from our
server with the links provided. If you would like to download the checkpoint
to use locally or host yourself, pass the link to our
[checkpoint downloader script](/scripts/checkpoint_downloader.py).

For example, to download the `basic_rnn` checkpoint, you would run:

```bash
python ./scripts/checkpoint_downloader https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn ./my-checkpoints/
```

## JSON Index

A JSON index of available checkpoints is at
https://goo.gl/magenta/js-checkpoints-json, formatted as a list of entries with
the following interface:

```ts
interface Checkpoint {
  id: string;  // A unique id for this checkpoint.
  model: 'MusicRNN'|'MusicVAE';  // The model class.
  sizeMb: number;  // The size of the weights in megabytes.
  description: string;  // A short