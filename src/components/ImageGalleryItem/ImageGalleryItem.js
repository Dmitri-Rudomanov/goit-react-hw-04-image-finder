import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeformatURL, onImgClick }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => onImgClick(largeformatURL)}
    >
      <img className={s.ImageGalleryItemImg} src={webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeformatURL: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
