const path = require('path')
const { v4: uuidv4 } = require('uuid')

const isImage = require('../utils/isImage')
const isVideo = require('../utils/isVideo')
const saveFile = require('../utils/saveFile')
const getNewName = require('./getNewName')
const extractFrames = require('../utils/extractFrames')
const readFileContent = require('../utils/readFileContent')
const deleteDirectory = require('../utils/deleteDirectory')
const isProcessableFile = require('../utils/isProcessableFile')

module.exports = async options => {
  try {
    const { frames, filePath, inputPath } = options

    const fileName = path.basename(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const relativeFilePath = path.relative(inputPath, filePath)

    if (fileName === '.DS_Store') return

    if (!isProcessableFile({ filePath })) {
      console.log(`🟡 Unsupported file: ${relativeFilePath}`)
      return
    }

    let content
    let videoPrompt
    let images = []
    let framesOutputDir
    if (isImage({ ext })) {
      images.push(filePath)
    } else if (isVideo({ ext })) {
      framesOutputDir = `/tmp/ai-renamer/${uuidv4()}`
      const _extractedFrames = await extractFrames({
        frames,
        framesOutputDir,
        inputFile: filePath
      })
      images = _extractedFrames.images
      videoPrompt = _extractedFrames.videoPrompt
    } else {
      content = await readFileContent({ filePath })
      if (!content) {
        console.log(`🔴 No text content: ${relativeFilePath}`)
        return
      }
    }

    const newName = await getNewName({ ...options, images, content, videoPrompt, relativeFilePath })
    if (!newName) return

    const newFileName = await saveFile({ ext, newName, filePath })
    const relativeNewFilePath = path.join(path.dirname(relativeFilePath), newFileName)
    console.log(`🟢 Renamed: ${relativeFilePath} to ${relativeNewFilePath}`)

    if (isVideo({ ext }) && framesOutputDir) {
      await deleteDirectory({ folderPath: framesOutputDir })
    }
  } catch (err) {
    console.log(err.message)
  }
}
