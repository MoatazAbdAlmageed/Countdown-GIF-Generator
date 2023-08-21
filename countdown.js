const { createCanvas, loadImage } = require("canvas");
const GIFEncoder = require("gifencoder");
const fs = require("fs");

function generateCountdownGif(targetDate, backgroundImage, outputFile) {
  const canvasWidth = 400;
  const canvasHeight = 100;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  const encoder = new GIFEncoder(canvasWidth, canvasHeight);
  const outputStream = fs.createWriteStream(outputFile);

  encoder.createReadStream().pipe(outputStream);
  encoder.start();
  encoder.setRepeat(0); // Repeat forever
  encoder.setDelay(1000); // 1 frame per second
  encoder.setQuality(10);

  const updateCountdown = () => {
    const currentTime = new Date();
    const timeDiff = targetDate - currentTime;
    const secondsRemaining = Math.floor(timeDiff / 1000);
    const days = Math.floor(secondsRemaining / (3600 * 24));
    const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    // Set the text color to black
    ctx.fillStyle = "black";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      `${days}d ${hours}h ${minutes}m ${seconds}s`,
      canvasWidth / 2,
      canvasHeight / 2
    );

    encoder.addFrame(ctx);

    // Check if countdown has reached the target date
    if (secondsRemaining <= 0) {
      encoder.finish();
      console.log(`Countdown GIF generated and saved to ${outputFile}`);
      return;
    }

    setTimeout(updateCountdown, 1000);
  };

  updateCountdown();
}

// Usage example: generate a countdown GIF to August 22, 2023, 12:00:00 UTC with a background image
const targetDate = new Date("2023-08-22T12:00:00Z");
const backgroundImagePath =
  "https://placehold.co/400x100/FFFFFF/000000?text=\\n"; // Replace with the path to your background image
loadImage(backgroundImagePath).then((backgroundImage) => {
  generateCountdownGif(targetDate, backgroundImage, "countdown.gif");
});
