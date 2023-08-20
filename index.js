const { createCanvas } = require("canvas");
const GIFEncoder = require("gifencoder");
const fs = require("fs");

function generateCountdownGif(targetDate, outputFile) {
  const canvasWidth = 600;
  const canvasHeight = 200;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  const encoder = new GIFEncoder(canvasWidth, canvasHeight);
  const outputStream = fs.createWriteStream(outputFile);

  encoder.createReadStream().pipe(outputStream);
  encoder.start();
  encoder.setRepeat(0); // Repeat forever
  encoder.setDelay(1000); // 1 frame per second
  encoder.setQuality(10); // Lower quality to reduce file size

  // Set the canvas background color to transparent
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const updateCountdown = () => {
    const currentTime = new Date();
    const timeDiff = targetDate - currentTime;
    const secondsRemaining = Math.floor(timeDiff / 1000);
    const days = Math.floor(secondsRemaining / (3600 * 24));
    const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "white";
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

// Usage example: generate a countdown GIF to December 31, 2023, 12:00:00 UTC
const targetDate = new Date("2023-08-22T12:00:00Z");
generateCountdownGif(targetDate, "countdown.gif");
