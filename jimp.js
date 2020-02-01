Jimp = require('jimp')

module.exports = async (images, width, height = Jimp.AUTO, quality) => {
    await Promise.all(
        images.map(async imgPath => {
            const image = await Jimp.read(imgPath)
            await image.resize(width, height)
            await image.quality(quality)
            await image.writeAsync(imgPath)
        })
    )
}