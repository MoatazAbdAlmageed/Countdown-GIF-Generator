## Countdown GIF Generator

This Node.js script generates a GIF image that displays a countdown to a specific date. The generated GIF can be used for various purposes, such as creating countdown timers or displaying time remaining for an upcoming event.

### Prerequisites

- Node.js (version X.X.X or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository or download the script files to your local machine.

1. Open a terminal or command prompt and navigate to the project folder.

1. Install the required dependencies by running the following command:

   ```shell
   npm install
   ```

### Usage

1. Open the `countdown.js` file in a text editor.

1. Adjust the script parameters according to your requirements:

   - `targetDate`: The target date and time for the countdown. Modify the `new Date()` argument to set the desired target date.
   - `outputFile`: The name of the output GIF file. Update the string argument to set the desired file name.

1. Save the changes to `countdown.js`.

1. In the terminal or command prompt, run the script using the following command:

   ```shell
   node countdown.js
   ```

1. The script will generate a countdown GIF image and save it to the specified output file.

### Customization

- Canvas Dimensions: By default, the canvas dimensions are set to 200x200 pixels. Modify the `canvasWidth` and `canvasHeight` variables in `countdown.js` to change the canvas size.
- Font and Styling: The countdown text is displayed using a bold 48px Arial font. Modify the `ctx.font`, `ctx.fillStyle`, and other styling properties in `countdown.js` to customize the appearance.
- Frame Delay and Quality: The script is configured to generate one frame per second with a lower quality setting (`encoder.setQuality(10)`) to reduce the file size. Adjust the `encoder.setDelay()` and `encoder.setQuality()` values in `countdown.js` to modify the frame delay and image quality.

### License

This project is licensed under the [MIT License](LICENSE).

### Acknowledgments

The script uses the following npm packages:

- `canvas`: A Cairo-backed Canvas implementation for Node.js.
- `gifencoder`: A GIF encoding library for Node.js.

### Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

### Authors

- [MOATAZ MPOHAMMADY](https://moatazabdalmageed.github.io/)
