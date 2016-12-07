# Minimizing JS bundle size with Webpack

I haven't been paying much attention to the bundle size of my JS files until recently I discovered it was almost 1mb (after minification)! Even after gzip the bundle was over 300kb. Although this site doesn't get much traffic this was unacceptable in my eyes.

## Why was it so big?

I had no idea why my bundle size was so huge because I wasn't using an large libraries or anything. I needed something like a profiler, or a way to analyze each mondule being loaded because I had no idea where to start.

## Webpack visualizer plugin

I came across this plugin and it is what saved me. I shows an interactive graph of each module being loaded along with sub modules. It was just what I needed! To my surprise, highlight.js was taking up almost 600kb (keep in mind webpack visualizer shows sizes before minification)