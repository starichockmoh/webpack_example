import { useState } from 'react';
import { Count } from '@/components/Count/Count';
import { Link, Outlet } from 'react-router-dom';
import image from '@/assets/radio.png';
import Eye from '@/assets/eye.svg';

import styles from './App.module.scss';

export function App() {
  const [count, setCount] = useState(0);

  function incCount() {
    setCount((prev) => prev + 1);
  }
  function setZero() {
    setCount(0);
  }

  if (__PLATFORM__ === 'mobile') {
    return <div>Hello is mobile version</div>;
  }
  // webpack понимает, что если у нас запущена не мобильная версия
  // то добавлять в сборку весь последующий код нет смысла!
  return (
    <div>
      <h1>Hello!!!</h1>
      <h2>{__PLATFORM__}</h2>
      <div>
        <img src={image} alt={''}></img>
      </div>
      <div>
        <Eye width={'70px'} height={'70px'} style={{ color: 'red' }} />
      </div>
      {__ENV__ === 'development' && <div>Only dev element!</div>}
      <div className={styles.nav}>
        <Link to={'/about'}>About</Link>
        <Link to={'/shop'}>Shop</Link>
        <Link to={'/'}>Home</Link>
      </div>
      <div className={styles.elements}>
        <button className={styles.elements__btn_inc} onClick={incCount}>
          INCREASE
        </button>
        <button
          disabled={!count}
          className={styles.elements__btn_zero}
          onClick={setZero}
        >
          SET 0
        </button>
      </div>

      <Count count={count} />

      <Outlet />
    </div>
  );
}
