let originalSpeed = 1;
const findAndFastForward = () => {
  const video = document.querySelector("video");
  const player = document.querySelector("#movie_player");

  if (!video || !player) return;

  const isAd = player.classList.contains("ad-showing") || 
               player.classList.contains("ad-interrupting");

  if (isAd) {
    if (video.playbackRate !== 16) {
      originalSpeed = video.playbackRate;
      video.playbackRate = 16;
      video.muted = true;
      console.log("speeding up ad");
    }
  } else {
    if (video.playbackRate === 16) {
      video.playbackRate = originalSpeed;
      video.muted = false;
      console.log("resetting speed to:", originalSpeed);
    }
  }
};

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      findAndFastForward();
    }
  }
});

const targetNode = document.querySelector("#movie_player");
if (targetNode) {
  observer.observe(targetNode, { attributes: true });
} else {
  setTimeout(() => {
    const retryNode = document.querySelector("#movie_player");
    if (retryNode) observer.observe(retryNode, { attributes: true });
  }, 2000);
}
