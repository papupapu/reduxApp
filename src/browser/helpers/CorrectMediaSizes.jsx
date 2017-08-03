import { IMAGE_SIZES, IMAGE_SERVER } from '../../common/constants/Settings';

function isObject(obj) {
  return obj === Object(obj);
}

function CorrectMediaSizes(device, category, media) {
  let correctMedia;
  if (
    (isObject(media) && media[0].src.indexOf('/images') < 0) ||
    (!isObject(media) && media.indexOf('/images') < 0)
  ) {
    switch (isObject(media)) {
      case false:
        correctMedia = `${IMAGE_SERVER}/${category}/${IMAGE_SIZES[device]}/${media}`;
        break;
      default:
        correctMedia = [];
        media.forEach(
          (el) => {
            correctMedia.push({
              src: `${IMAGE_SERVER}/${category}/${IMAGE_SIZES[device]}/${el.src}`,
              type: el.type,
            });
          },
        );
    }
  } else {
    correctMedia = media;
  }
  return correctMedia;
}

export default CorrectMediaSizes;
