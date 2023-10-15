# Discord OCR Bot

![image](https://github.com/Ashesh3/discord-ocr/assets/3626859/97f14882-8696-4722-a7ca-ef9943494d79)

## Description

The Discord OCR (Optical Character Recognition) Bot is a powerful tool that utilizes the Tesseract OCR engine to read text from images sent in Discord channels. Upon receiving an image, the bot processes it, extracts any text present, and then sends the extracted text in an embed message. It has the capacity to selectively operate in specified channels and can acknowledge messages with specific reactions.

## Features
- Automatic OCR: Instantly converts images sent in specified channels into text.
- Real-time feedback: Reacts to images with a 🔍 emoji to indicate that OCR is in progress.
- Supports only image files: Ensures non-image attachments are ignored.
- Displays text in a neatly formatted embed.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Discord Bot Token

### Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/Ashesh3/discord-ocr
    cd discord-ocr
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Configuration**

    Line 24 - Add a mapping for the channels you want the bot to operate in.
    ```js
    channels = {
        'source_channel_id (This is where the images will be sent)': 'destination_channel_id (This is where the extracted text will be sent)'
    }
    ```
    Line 79 - Add your Discord Bot Token
    
4. **Start the bot**
    ```bash
    node index.js
    ```

## Usage

1. **Send an Image**: Upload an image containing text to a monitored Discord channel.
2. **Get Text**: The bot will process the image and send an embed containing the extracted text.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [Tesseract.js](https://github.com/naptha/tesseract.js): Pure JavaScript OCR for 100 Languages 📖🎉🖥