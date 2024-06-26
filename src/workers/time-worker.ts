// time-worker.ts

setInterval(() => {
  postMessage('tick');
}, 1000 / 60);
