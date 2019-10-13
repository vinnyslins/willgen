const jimp = require('jimp')

const SIZE = 256
const QUALITY = 10
const MAX_LENGTH = 16
const TEXT_HEIGHT = 192

const getImage = async filename => {
  const image = await jimp.read(filename)
  image.resize(SIZE, SIZE)
  image.quality(QUALITY)

  return image
}

const addText = async (image, text) => {
  if (text.length > MAX_LENGTH) {
    throw new Error('The text cannot be longer than 16 characters')
  }

  const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
  const width = jimp.measureText(font, text)

  const padding = (SIZE - width) / 2

  image.print(font, padding, TEXT_HEIGHT, text)
}

(async () => {
  try {
    const image = await getImage('./will-smith.jpg')
    await addText(image, 'gostosa')

    image.write('new-will-smith.jpg');
  } catch (error) {
    console.error(error);
  }
})()
