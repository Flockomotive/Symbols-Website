const SIZE = 256

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

async function renderPng(url) {
  const img = await loadImage(url)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SIZE
  canvas.getContext('2d').drawImage(img, 0, 0, SIZE, SIZE)
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
  )
}

// Clipboard only reliably accepts PNG, so the SVG is rasterised first.
export function copyIconAsPng(url) {
  return navigator.clipboard.write([
    new ClipboardItem({ 'image/png': renderPng(url) }),
  ])
}
