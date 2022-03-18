import PropTypes from 'prop-types';
import SearchFrom from '../SearchForm/SearchForm.js';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={s.Searchbar}>
      <SearchFrom onSubmit={onSubmit} />
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
