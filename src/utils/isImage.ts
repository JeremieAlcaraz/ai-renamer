export default ({ ext }: { ext: string }) => {
  const imageTypes = ['.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff']
  return imageTypes.includes(ext)
}
