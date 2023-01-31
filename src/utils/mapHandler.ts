// x and y must be this way around for the coordinates to work properly
const getUrl = (x: number, y: number, zoom: number = 13) => `https://www.google.com/maps/@${y},${x},${zoom}z`

export {
  getUrl
}
