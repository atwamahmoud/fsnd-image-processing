import {IImageData} from "../interfaces/Image";
import {DEFAULT_SVG_BG_COLOR, DEFAULT_SVG_TEXT_COLOR} from "../utils/constants";

/**
 * @description Generates an svg image according to the input data
 * @param {IImageData} imageData
 * @param {number} imageData.width Image Width in pixels
 * @param {number} imageData.height Image height in pixels
 * @param {string} imageData.[bgColor=#000000] Background color of the image
 * @param {string} imageData.[textColor=#ffffff] Background color of the image
 * @param {string} imageData.[text={width}x{height}] Background color of the image
 * @returns {string} Contains the SVG markup for the image
 */
export function createSVGString(imageData: IImageData): string {
  const {width, height, bgColor, textColor, text} = {
    ...imageData,
    bgColor: imageData.bgColor || DEFAULT_SVG_BG_COLOR,
    textColor: imageData.textColor || DEFAULT_SVG_TEXT_COLOR,
    text: imageData.text || `${imageData.width}x${imageData.height}`,
  };
  return `<?xml version="1.0" standalone="no"?>
 <svg width="${width}" height="${height}" version="1.1"
      xmlns="http://www.w3.org/2000/svg" >
   <desc>Placeholder image with dimensions ${width}x${height}
   </desc>
   <rect x="0" y="0" stroke="${bgColor}" fill="${bgColor}" width="${width}" height="${height}" />
   <text  x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="32" fill="${textColor}">
     ${text}
   </text>
 </svg>
 `;
}
