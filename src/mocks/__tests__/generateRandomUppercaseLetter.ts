
export const generateRandomUppercaseLetter = () => {
  const charCode = Math.floor(Math.random() * 26) + 65
  return String.fromCharCode(charCode)
}