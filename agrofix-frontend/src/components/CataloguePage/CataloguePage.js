import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import './CataloguePage.css';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Tomato', price: 25, description: 'Fresh farm tomatoes', stock: 120, imageUrl: 'https://img.icons8.com/color/96/tomato.png' },
  { id: 2, name: 'Potato', price: 18, description: 'Organic potatoes', stock: 200, imageUrl: 'https://img.icons8.com/color/96/potato.png' },
  { id: 3, name: 'Carrot', price: 30, description: 'Crunchy carrots', stock: 150, imageUrl: 'https://img.icons8.com/color/96/carrot.png' },
  { id: 4, name: 'Apple', price: 80, description: 'Juicy apples', stock: 90, imageUrl: 'https://img.icons8.com/color/96/apple.png' }
];

function CataloguePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const { cart, dispatch } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://agrofix-2-czmk.onrender.com/api/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts(DUMMY_PRODUCTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts(DUMMY_PRODUCTS);
        setLoading(false);
      });
  }, []);
  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    setAddedId(product.id);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 1500);
  };

  return (
    <div className="catalogue-root">
      <main>
        {loading ? (
          <div className="catalogue-list">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div className="catalogue-card skeleton" key={idx}>
                <div className="catalogue-img skeleton-img" />
                <div className="catalogue-card-content">
                  <div className="skeleton-text skeleton-title" />
                  <div className="skeleton-text skeleton-price" />
                  <div className="skeleton-text skeleton-desc" />
                  <div className="skeleton-text skeleton-stock" />
                </div>
                <div className="skeleton-btn" />
              </div>
            ))}
          </div>
        ) : (
          <div className="catalogue-list">
            {Array.isArray(products) && products.map((p) => {
              const cartItem = cart.items.find(i => i.id === p.id);
              return (
                <div className="catalogue-card" key={p.id}>
                  <div className="catalogue-img">
                    <img src={p.imageUrl || 'https://img.icons8.com/color/96/vegetarian-food-symbol.png'} alt={p.name} />
                  </div>
                  <div className="catalogue-card-content">
                    <div className="catalogue-name">{p.name}</div>
                    <div className="catalogue-price">
                      <span className="catalogue-price-value">₹{p.price}</span>
                      <span className="catalogue-price-unit">per crate</span>
                    </div>
                    {/* Description: removed info icon and text as per user request */}
                    {/* <div className="catalogue-description hide-on-mobile">
                      <InfoOutlinedIcon className="catalogue-info-icon" /> {p.description}
                    </div> */}
                    <div className="catalogue-stock">{p.stock} {t('crates_available') || 'crates available'}</div>
                    {/* Offer tag */}
                    {p.offer && (
                      <div className="catalogue-offer-tag">{p.offer}</div>
                    )}
                  </div>
                  <div className="catalogue-action-bar">
                    {cartItem ? (
                      <div className="catalogue-qty-bar">
                        <button className="qty-btn-pill" aria-label="Decrease quantity" onClick={() => dispatch({ type: 'DECREASE_QUANTITY', id: p.id })} disabled={cartItem.quantity <= 1}>-</button>
                        <span className="qty-value-pill">{cartItem.quantity}</span>
                        <button className="qty-btn-pill" aria-label="Increase quantity" onClick={() => dispatch({ type: 'INCREASE_QUANTITY', id: p.id })} disabled={cartItem.quantity >= p.stock}>+</button>
                      </div>
                    ) : (
                      <button
                        className="btn-addtocart-pill"
                        type="button"
                        onClick={() => handleAddToCart(p)}
                        disabled={addedId===p.id && showSnackbar}
                      >
                        {t('add_to_basket') || 'Add to basket'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default CataloguePage;
