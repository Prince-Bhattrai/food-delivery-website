// import React, { useContext } from 'react';
// import './Cart.css';
// import { StoreContext } from '../../Context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr className='item-div' />

//         {food_list
//           .filter(item => cartItems[item._id] > 0)
//           .map(item => (
//             <div key={item._id}>
//               <div className='cart-items-title cart-items-item'>
//                 <img src={url + "/images/" + item.image} alt={item.name} />
//                 <p>{item.name}</p>
//                 <p>RS.{item.price}</p>
//                 <p>{cartItems[item._id]}</p>
//                 <p>RS.{item.price * cartItems[item._id]}</p>
//                 <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
//               </div>
//               <hr />
//             </div>
//           ))}
//       </div>

//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart total-details">
//               <p>Subtotal</p>
//               <p>Rs:{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart total-details">
//               <p>Delivery Fee</p>
//               <p>Rs{getTotalCartAmount() === 0 ? 0 : 60}</p>
//             </div>
//             <hr />
//             <div className="cart total-details">
//               <b>Total</b>
//               <b><span>Rs</span>:{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 60}</b>
//             </div>
//           </div>
//           <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>

//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, Enter it here </p>
//             <div className="cart-promocode-input">
//               <input type="text" placeholder='Promocode' />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;








import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Calculate total once
  const total = getTotalCartAmount();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='item-div' />

        {food_list
          .filter(item => cartItems[item._id] > 0)
          .map(item => {
            const quantity = cartItems[item._id] || 0;
            const price = Number(item.price) || 0;
            const totalPrice = price * quantity;

            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${price}</p>
                  <p>{quantity}</p>
                  <p>${totalPrice}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart total-details">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <hr />
            <div className="cart total-details">
              <p>Delivery Fee</p>
              <p>${total === 0 ? 0 : 0.5}</p>
            </div>
            <hr />
            <div className="cart total-details">
              <b>Total</b>
              <b><span>$</span>:{total === 0 ? 0 : total + 0.5}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


