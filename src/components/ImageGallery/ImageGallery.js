import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';
import s from './ImageGallery.module.css';

const ImageGallery = ({ Images, onImgClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {Images &&
        Images.map(img => (
          <ImageGalleryItem
            key={img.id}
            webformatURL={img.webformatURL}
            largeformatURL={img.largeImageURL}
            onImgClick={onImgClick}
          />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  Images: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
export default ImageGallery;
