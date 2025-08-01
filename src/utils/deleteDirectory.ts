export default async ({ folderPath }: { folderPath: string }) => {
  try {
    await Deno.remove(folderPath, { recursive: true })
  } catch (err) {
    console.log(err.message)
  }
}
