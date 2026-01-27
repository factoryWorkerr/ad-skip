console.log("Speed Demon initialized.");

// We check every 500ms. This is light on the CPU but fast enough to catch ads.
setInterval(() => {
  const video = document.querySelector("video");
  const adShowing = document.querySelector(".ad-showing, .ad-interrupting");

  if (video) {
    if (adShowing) {
      // If an ad is playing, go warp speed and mute it
      if (video.playbackRate !== 16) {
        console.log("Ad detected. Engaging warp drive...");
        video.playbackRate = 16;
        video.muted = true;
      }
    } else {
      // If no ad is showing, but speed is still 16x, reset it
      if (video.playbackRate === 16) {
        console.log("Ad finished. Resuming normal speed.");
        video.playbackRate = 1;
        video.muted = false;
      }
    }
  }
}, 500);
