import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';
function App() {
  /**
   * İlgili state parçasına useSelector ile ulaşırız
   * store.cart ifadesindeki cart store.js'teki reducer ismine karşılık gelir
   * Initial State objesi döndürülür ve içindeki verileri destructing ile alırız
   */
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  /**
   * dispatch ile reducerlar tetiklenir. Öncesinde useDispatch hooku çağrılmalıdır
   */
  const dispatch = useDispatch();

  useEffect(() => {//state fonksiyonları useEffect içinden bile çağrılabilir sıkıntı yok

    dispatch(calculateTotals());//reducerlar, dispatch içinde () kullanılarak çağrılmalıdır
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random'));//"random" async thunk içindeki name'e -ilk parametre- karşılık gelir
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
