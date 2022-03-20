import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import pixabayAPI from '../services/pixabayApi.js';
import Button from './Button/Button.js';
import Loader from './Loader/Loader.js';
import Modal from './Modal/Modal.js';
import Error from './Error/Error.js';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [largeImg, setLargeImg] = useState('');
  const [showMore, setShowMore] = useState(true);

  const onBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    onFetchImg();
  }, [query, page]);

  const handleGalleryImg = fullImgUrl => {
    setLargeImg(fullImgUrl);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onFetchImg = () => {
    setIsLoading(true);
    pixabayAPI.fetchGallery(query, page).then(({ hits, totalHits }) => {
      setImages([...images, ...hits]);
      setShowMore(true);
      setIsLoading(false);
      if (hits.length >= totalHits && totalHits !== 0) {
        toast.warning('Sorry,you`ve reach the end of search result');
        setShowMore(false);
      }
    });
  };

  const queryChange = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const showMoreCheck = images.length !== 0 && !isLoading && showMore;
  const errorCheck = images.length === 0 && query !== '' && !isLoading;
  return (
    <div>
      <Searchbar onSubmit={queryChange} />
      <div className={s.App}>
        {showModal && <Modal largeImage={largeImg} onClose={toggleModal} />}
        <ImageGallery Images={images} onImgClick={handleGalleryImg} />
        {isLoading && <Loader />}
        {showMoreCheck && <Button onClick={onBtnClick} />}
        {errorCheck && (
          <Error
            message={`Sorry, There is no picture matching search query: ${query}`}
          />
        )}
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
}
