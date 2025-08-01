import * as path from 'https://deno.land/std/path/mod.ts'

const getVideoDuration = async ({ inputFile }: { inputFile: string }) => {
  const command = new Deno.Command("ffprobe", {
    args: [
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        inputFile
    ]
  });
  const { stdout } = await command.output();
  const durationStr = new TextDecoder().decode(stdout);
  return parseFloat(durationStr);
}

export default async ({ frames, inputFile, framesOutputDir }: any) => {
  try {
    await Deno.mkdir(framesOutputDir, { recursive: true })

    const duration = await getVideoDuration({ inputFile })
    const numFrames = Math.min(frames, Math.floor(duration))
    const frameRate = numFrames / duration
    const frameInterval = duration / numFrames

    const command = new Deno.Command("ffmpeg", {
        args: [
            "-i", inputFile,
            "-vf", `fps=${frameRate}`,
            "-frames:v", numFrames.toString(),
            "-q:v", "2",
            `${framesOutputDir}/frame_%03d.jpg`,
            "-loglevel", "error"
        ]
    });
    await command.output();

    const images = Array.from({ length: numFrames }, (_, i) =>
      path.resolve(framesOutputDir, `frame_${String(i + 1).padStart(3, '0')}.jpg`)
    )

    const videoPrompt = `Analyze these ${numFrames} frames from a ${duration.toFixed(1)}-second video. One frame every ${frameInterval.toFixed(1)} seconds.`

    return {
      images,
      videoPrompt
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
