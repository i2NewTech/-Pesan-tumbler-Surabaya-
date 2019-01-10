
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
  description: string;  // A short human-readable description of the trained model.
  url: string;  // Path to the checkpoint directory.
}
```

While we do not plan to remove any of the current checkpoints, we will be adding more in the future.

If your application has a high QPS, you must mirror these files on your own server.

## Table

ID|Model|Description|Size MB|URL
---|---|---|---|---
drums_2bar_lokl_small|MusicVAE|A 2-bar, 9-class onehot drum model with a strong prior (low KL divergence), which is better for sampling. Less accurate, but smaller in size than full model.|18.5|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_lokl_small)
drums_2bar_hikl_small|MusicVAE|A 2-bar, 9-class onehot drum model with a weak prior (higher KL divergence), which is better for reconstructions and interpolations. Less accurate, but smaller in size than full model.|18.5|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_hikl_small)
drums_2bar_nade_9_q2|MusicVAE|A 2-bar, 9-class multilabel drum model with a NADE decoder. Quantized to 2-byte weights.|27.6|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_nade_9_q2)
drums_4bar_med_q2|MusicVAE|A medium-sized 2-bar, 9-class onehot drum model with a weak prior (higher KL divergence), which is better for reconstructions and interpolations. Quantized to 2-byte weights.|68.2|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2)
drums_4bar_med_lokl_q2|MusicVAE|A medium-sized 2-bar, 9-class onehot drum model with a strong prior (lower KL dive