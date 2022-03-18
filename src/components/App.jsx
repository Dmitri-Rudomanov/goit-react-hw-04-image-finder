import React, { Component } from 'react';
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

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: null,
    showModal: null,
    largeImg: '',
    error: null,
    showMore: true,
  };

  onBtnClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.onFetchImg();
    }
  }

  handleGalleryImg = fullImgUrl => {
    this.setState({
      largeImg: fullImgUrl,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  queryChange = query => {
    this.setState({ query });
    this.setState({ page: 1, images: [] });
  };

  onFetchImg = () => {
    this.setState({ isLoading: true });
    pixabayAPI
      .fetchGallery(this.state.query, this.state.page)
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoading: false,
        }));
        if (this.state.images.length === 0) {
          this.setState({ error: 'true' });
        }
        if (this.state.images.length >= totalHits) {
          toast.warning('Sorry,you`ve reach the end of search result');
          this.setState({ showMore: false });
        }
      });
  };

  render() {
    const { showModal, isLoading, largeImg, images, error, query, showMore } =
      this.state;
    const showMoreCheck = images.length !== 0 && !isLoading && showMore;

    return (
      <div>
        <Searchbar onSubmit={this.queryChange} />
        <div className={s.App}>
          {showModal && (
            <Modal largeImage={largeImg} onClose={this.toggleModal} />
          )}
          <ImageGallery
            Images={this.state.images}
            onImgClick={this.handleGalleryImg}
          />
          {this.state.isLoading && <Loader />}
          {showMoreCheck && <Button onClick={this.onBtnClick} />}
          {error && (
            <Error
              message={`Sorry, There is no picture matching search query: ${query}`}
            />
          )}
        </div>
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
