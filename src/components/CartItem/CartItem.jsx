import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from '../CartSlice';
import './CartItem.css';

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  const parsePrice = (price) => parseFloat(price.replace('$', ''));

  const calculateTotalCost = (item) => {
    return (parsePrice(item.price) * item.quantity).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="cart-container">
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          Paradise Nursery
        </div>
        <div className="navbar-links">
          <span onClick={() => navigate('/')}>Home</span>
          <span onClick={() => navigate('/products')}>Plants</span>
          <span onClick={() => navigate('/cart')}>
            🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </span>
        </div>
      </nav>

      <h1 className="cart-title">Shopping Cart</h1>
      <h2 className="cart-total">Total: ${calculateTotalAmount()}</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.price}</p>
                <p>Total: ${calculateTotalCost(item)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="delete-button" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-shopping-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;