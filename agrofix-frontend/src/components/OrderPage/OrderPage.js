import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import './OrderPage.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
  buyer_name: yup.string().required('Name is required'),
  buyer_contact: yup
    .string()
    .required('Contact is required')
    .matches(/^[0-9+\-() ]{8,20}$/, 'Enter a valid contact number'),
  delivery_address: yup.string().required('Delivery address is required'),
});

function OrderPage() {
  const { t } = useLanguage();
  const { cart, dispatch } = useCart();
  const [message, setMessage] = React.useState('');
  const [trackingId, setTrackingId] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, msg: '', severity: 'success' });
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [formSnapshot, setFormSnapshot] = React.useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(orderSchema),
    mode: 'onTouched',
  });

  const handleRazorpayDemo = () => {
    setShowPaymentModal(false);
    setTimeout(() => alert('Razorpay Demo: Payment Successful!'), 200);
    placeOrder();
  };

  const handleUPIDemo = () => {
    setShowPaymentModal(false);
    setTimeout(() => alert('BHIM UPI Demo: Payment Successful!'), 200);
    placeOrder();
  };

  const handleCODDemo = () => {
    setShowPaymentModal(false);
    setTimeout(() => alert('Order placed with Cash on Delivery!'), 200);
    placeOrder();
  };

  const onSubmit = (form) => {
    setMessage('');
    if (cart.items.length === 0) {
      setMessage(t('emptyCart') || 'Your cart is empty.');
      setSnackbar({ open: true, msg: t('emptyCart') || 'Your cart is empty.', severity: 'error' });
      return;
    }
    setFormSnapshot(form); // Save form values for use in placeOrder
    setShowPaymentModal(true);
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem('buyerToken');
      const userId = 1; // Example static userId, replace with real user id
      const region = 'DefaultRegion'; // Replace with actual region
      const quantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
      const orderData = {
        userId,
        userDetails: {
          name: formSnapshot?.buyer_name || '',
          contact: formSnapshot?.buyer_contact || '',
          address: formSnapshot?.delivery_address || ''
        },
        products: cart.items.map(i => i.id),
        quantity,
        region
      };
      const res = await axios.post('https://agrofix-2-czmk.onrender.com/api/orders', orderData, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
      setTrackingId(res.data.id);
      setShowModal(true);
      dispatch({ type: 'CLEAR_CART' });
      setSnackbar({ open: true, msg: t('orderPlaced') || 'Order placed successfully!', severity: 'success' });
      reset();
      setFormSnapshot(null);
    } catch (err) {
      setMessage(t('orderFailed'));
      setSnackbar({ open: true, msg: t('orderFailed') || 'Order failed!', severity: 'error' });
    }
  };

  const handleCopy = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Razorpay loader
  useEffect(() => {
    const scriptId = 'razorpay-checkout-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = '/razorpay-checkout.js';
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="order-main">
      <div className="order-title">
        <AddShoppingCartIcon className="order-title-icon" /> {t('placeOrder') || 'Place Your Order'}
      </div>
      {/* Enhanced Cart Section: All items in one card with controls */}
      {cart.items.length === 0 ? (
        <div className="order-empty-message">
          <AddShoppingCartIcon style={{ fontSize: 60, color: '#bdbdbd', marginBottom: 16 }} />
          <div style={{ fontSize: 20, fontWeight: 700, color: '#888', marginBottom: 8 }}>
            {t('emptyCart') || 'Your basket is empty.'}
          </div>
          <div style={{ fontSize: 16, color: '#388e3c', marginBottom: 18 }}>
            {t('addItemsToCart') || 'Browse the catalogue and add items to your basket to place an order.'}
          </div>
          <a href="/catalogue" className="btn-primary" style={{ fontSize: 18, padding: '10px 28px', borderRadius: 8 }}>
            {t('shopNow') || 'Shop Now'}
          </a>
        </div>
      ) : (
        <div className="order-cart-list order-cart-card">
          <div className="order-cart-header">{t('cart') || 'Your Basket'}</div>
          {cart.items.map(item => (
            <div className="order-cart-row" key={item.id}>
              <span className="order-cart-name">{item.name}</span>
              <span className="order-cart-price">₹{item.price * item.quantity}</span>
              <div className="order-cart-controls">
                <button type="button" className="order-cart-btn" onClick={() => dispatch({ type: 'DECREASE_QUANTITY', id: item.id })} disabled={item.quantity <= 1} aria-label="Decrease quantity">
                  <RemoveCircleIcon />
                </button>
                <span className="order-cart-qty">{item.quantity}</span>
                <button type="button" className="order-cart-btn" onClick={() => dispatch({ type: 'INCREASE_QUANTITY', id: item.id })} aria-label="Increase quantity">
                  <AddCircleIcon />
                </button>
                <button type="button" className="order-cart-btn order-cart-remove" onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} aria-label="Remove item">
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="order-cart-total">
            <span>{t('total') || 'Total'}:</span>
            <span className="order-cart-total-value">₹{cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
          </div>
        </div>
      )}
      {cart.items.length > 0 && (
        <form className="order-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <label htmlFor="buyer_name">{t('name') || 'Your Name'}
            <input id="buyer_name" placeholder="e.g. Ramesh Kumar" {...register('buyer_name')} />
          </label>
          {errors.buyer_name && <div className="order-error">{errors.buyer_name.message}</div>}

          <label htmlFor="buyer_contact">{t('contact') || 'Contact'}
            <input id="buyer_contact" placeholder="e.g. 9876543210" {...register('buyer_contact')} />
          </label>
          {errors.buyer_contact && <div className="order-error">{errors.buyer_contact.message}</div>}

          <label htmlFor="delivery_address">{t('deliveryAddress') || 'Delivery Address'}
            <input id="delivery_address" placeholder="e.g. 123 Main St, City" {...register('delivery_address')} />
          </label>
          {errors.delivery_address && <div className="order-error">{errors.delivery_address.message}</div>}

          <button type="submit" className="order-submit-btn">{t('bookBasket') || 'Book Basket'}</button>
        </form>
      )}
      {/* Payment Options Modal */}
      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <div className="payment-modal-title">Choose Payment Method</div>
            <button className="payment-option-btn" onClick={handleRazorpayDemo}>Razorpay (Demo)</button>
            <button className="payment-option-btn" onClick={handleUPIDemo}>BHIM UPI (Demo)</button>
            <button className="payment-option-btn" onClick={handleCODDemo}>Cash on Delivery (Demo)</button>
            <button className="payment-modal-close" onClick={() => setShowPaymentModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="order-modal">
          <div className="order-modal-content">
            <div className="order-modal-title">{t('important') || 'Important'}</div>
            <div className="order-modal-message">{t('saveTrackingId') || 'Please save your Tracking ID for order tracking.'}</div>
            <div className="order-modal-tracking-id">
              <span>{t('trackingId') || 'Tracking ID'}: {trackingId}</span>
              <button className="btn-copy" onClick={handleCopy} type="button">{copied ? t('copied') || 'Copied!' : t('copy') || 'Copy'}</button>
            </div>
            <button className="btn-primary order-modal-close-btn" onClick={() => setShowModal(false)}>{t('close') || 'Close'}</button>
          </div>
        </div>
      )}
      {snackbar.open && (
        <div className={`order-snackbar order-snackbar-${snackbar.severity}`}>{snackbar.msg}</div>
      )}
    </div>
  );
}

export default OrderPage;
