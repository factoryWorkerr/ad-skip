let video = document.querySelector("video");
console.log("started");

video.addEventListener("playing", function () {
    console.log("A video started playing!");

    video.addEventListener("timeupdate", () => {
      if (isAdPlaying()) {
        video.playbackRate = 16;
      }
    });
});
  


function isAdPlaying() {
  return document.querySelector("div.ad-showing");
}