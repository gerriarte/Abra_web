# a:bra — Sky to Abyss Scroll Experience

## Setup

```bash
npm install
npm run dev
```

## Asset Pipeline

All creature assets go in `/public/creatures/`.

| File                          | Format  | Notes                                   |
|-------------------------------|---------|-----------------------------------------|
| `satellite.json`              | Lottie  | Rotating solar panels loop              |
| `airplane.webp`               | WebP    | Side view, transparent bg, facing right |
| `birds-flock.json`            | Lottie  | V-formation, wing flap loop             |
| `seagull.json`                | Lottie  | Single bird, soaring loop               |
| `jellyfish-blue.json`         | Lottie  | Bell pulse + tentacle secondary motion  |
| `jellyfish-purple.json`       | Lottie  | Bell pulse + tentacle secondary motion  |
| `fish-school.json`            | Lottie  | School movement, ~20 fish               |
| `sea-turtle.json`             | Lottie  | Flipper animation loop                  |
| `blue-whale.json`             | Lottie  | Tail fluke animation, massive           |
| `giant-squid.json`            | Lottie  | Tentacle secondary motion               |
| `manta-ray.json`              | Lottie  | Wing flap loop                          |
| `anglerfish.json`             | Lottie  | Lure pulse (bioluminescence)            |
| `dumbo-octopus.json`          | Lottie  | Ear fin flap loop                       |
| `vampire-squid.json`          | Lottie  | Gentle drift loop                       |

## Lottie Sources

1. **LottieFiles.com** — search each creature name, filter by "Free"
2. **IconScout** — premium animated illustrations
3. **Custom** — hire illustrator with brief in `ILLUSTRATION_BRIEF.md`

## Performance Notes

- All Lottie files load lazily (only when creature enters zone buffer)
- WebP assets should be max 200KB
- Lottie JSON should be max 150KB (use LottieFiles optimizer)
- Target: Lighthouse Performance > 90 on mobile

## Vercel Deployment

```bash
# vercel.json already configured for static assets caching
vercel --prod
```
