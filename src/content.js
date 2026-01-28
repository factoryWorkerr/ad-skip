// Variable to store the user's playback speed
let originalSpeed = 1;

const findAndFastForward = () => {
  const video = document.querySelector("video");
  const player = document.querySelector("#movie_player");

  if (!video || !player) return;

  // Check if the ad-showing class is present on the player
  const isAd = player.classList.contains("ad-showing") || 
               player.classList.contains("ad-interrupting");

  if (isAd) {
    if (video.playbackRate !== 16) {
      // Store current speed (if it's not already the 16x boost)
      originalSpeed = video.playbackRate;
      video.playbackRate = 16;
      video.muted = true;
      console.log("Warp speed engaged!");
    }
  } else {
    // If ad is gone but we are still at 16x, reset
    if (video.playbackRate === 16) {
      video.playbackRate = originalSpeed;
      video.muted = false;
      console.log("Back to reality. Speed restored to:", originalSpeed);
    }
  }
};

// Create the observer
const observer = new MutationObserver((mutations) => {
  // We only care about changes to the 'class' attribute
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      findAndFastForward();
    }
  }
});

// Start watching the movie player
const targetNode = document.querySelector("#movie_player");
if (targetNode) {
  observer.observe(targetNode, { attributes: true });
} else {
  // Fallback: If the player isn't loaded yet, try again in a second
  setTimeout(() => {
    const retryNode = document.querySelector("#movie_player");
    if (retryNode) observer.observe(retryNode, { attributes: true });
  }, 2000);
}
