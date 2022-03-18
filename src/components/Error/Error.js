import s from './Error.module.css';

export default function PokemonErrorView({ message }) {
  return (
    <div role="alert" className={s.Error}>
      <p className={s.Text}>{message}</p>
    </div>
  );
}
