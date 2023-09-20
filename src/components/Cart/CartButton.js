import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const toggleHandler = () => { dispatch( uiActions.toggle() )}

  const itemCount = useSelector(state => state.cart.itemCount);

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default CartButton;
