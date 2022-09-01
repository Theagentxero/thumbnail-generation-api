# Thumbnail Generation API

Built on Express, written in vanilla javascript, this is an example api for thumbnail resizing

Accepts multi-part form data posted to the endpoint `/` the form should have a file attached named `image`;

This endpoint also responds on `/thumb` and `/resize`.

Optionally also accepts a `size` query, which is just a number. This is the requested result image size. Outputs will always be square. Default size value is 256.

The response is a webp of the image, cropped to thumbnail using shannon entropy, encoded as a base64 string.

Created as a practical example of the sharp image processing library, used on my website at [howdytaylor.com](https://howdytaylor.com)

For example code showing how to use sharp with detailed explainations visit my [sharp-example repo](https://github.com/Theagentxero/sharp-example)

For Sharp documentation visit [Sharp's Documentation](https://sharp.pixelplumbing.com/)


## How To Use This Project

Clone this repo

Open the project directory

Run the commands:
```
npm install
```

```
node index.js
```

The thumbnail generation api will now be running on your local machine at port 5000.
