
"""A script to produce the coefficients in mel_sparse_coeffs.ts.

Rather than recompute the Mel2Linear coefficients in javascript each time, we
save them as a large array in mel_sparse_coeffs.ts. When you run this scipt it
outputs to stdout a list of lists, with each list containing sparse information