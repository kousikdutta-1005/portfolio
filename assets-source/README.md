# Source assets

These files are inputs to the build, not things the site serves. They live
outside `app/public/` so they are never copied into `dist/` and never deployed.

## `models/`

The original CAD exports the particle swarm was built from. They are not loaded
at runtime — `GlobalParticleEngine` and `MiniSwarm` both read the sampled point
cloud at `app/public/assets/models/points.json` instead.

They were previously inside `app/public/`, which meant 105 MB of GLB files were
copied into every build and published to GitHub Pages despite nothing ever
requesting them.

Keep them here if you want to resample the point cloud later. After
regenerating `points.json`, run:

```sh
npm run optimize:points
```
