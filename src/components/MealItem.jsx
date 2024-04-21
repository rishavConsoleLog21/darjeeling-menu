import { useContext } from 'react';
import {formatPrice} from '../util/formatting.js'; 
import Button from './UI/Button.jsx';
import CartContext from '../context/CartContext.jsx';

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  function handleAddToCart() {
    cartCtx.addItem({ ...meal, quantity: 1 });
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formatPrice.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p>
          <Button onClick={handleAddToCart}>Add</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
