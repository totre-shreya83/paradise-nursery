import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../CartSlice';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=300', price: '$15' },
      { name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300', price: '$12' },
      { name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=300', price: '$18' },
      { name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1591958911259-bee2173bdcc5?w=300', price: '$14' },
      { name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1611211232932-da3113c5b03c?w=300', price: '$20' },
      { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300', price: '$10' },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Echeveria', image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=300', price: '$8' },
      { name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=300', price: '$10' },
      { name: 'Haworthia', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300', price: '$9' },
      { name: 'Zebra Plant', image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300', price: '$11' },
      { name: 'Burro\'s Tail', image: 'https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=300', price: '$13' },
      { name: 'Panda Plant', image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300', price: '$12' },
    ],
  },
  {
    category: 'Flowering Plants',
    plants: [
      { name: 'Orchid', image: 'https://images.unsplash.com/photo-1524598171353-e0d1c4c0e9f4?w=300', price: '$25' },
      { name: 'Hibiscus', image: 'https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?w=300', price: '$18' },
      { name: 'African Violet', image: 'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=300', price: '$14' },
      { name: 'Begonia', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300', price: '$16' },
      { name: 'Geranium', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=300', price: '$15' },
      { name: 'Azalea', image: 'https://images.unsplash.com/photo-1560717845-968823efbee1?w=300', price: '$20' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});
  const [showCart, setShowCart] = useState(false);

  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.name]: true }));
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          Paradise Nursery
        </div>
        <div className="navbar-links">
          <span onClick={() => navigate('/')}>Home</span>
          <span onClick={() => navigate('/products')}>Plants</span>
          <span className="cart-icon-wrapper" onClick={goToCart}>
            🛒 Cart
            <span className="cart-count">{totalItemsInCart}</span>
          </span>
        </div>
      </nav>

      <h1 className="page-title">Our Plant Collection</h1>

      {plantsArray.map((categoryGroup) => (
        <div key={categoryGroup.category} className="category-section">
          <h2>{categoryGroup.category}</h2>
          <div className="plants-grid">
            {categoryGroup.plants.map((plant) => (
              <div key={plant.name} className="plant-card">
                <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                <h3>{plant.name}</h3>
                <p className="plant-price">{plant.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedItems[plant.name]}
                >
                  {addedItems[plant.name] ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;