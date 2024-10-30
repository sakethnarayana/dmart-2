import React, { useEffect, useState } from "react";
import { useCart } from "../stores/context/CartContext";
import Navbar from "./components/Navbar";

const UserCart = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [cartItems]);

  // Calculate total
  const total = cartItems.length > 0 
  ? cartItems.reduce((acc, item) => {
      return acc + (Number(item.productId.price) * item.quantity || 0);
    }, 0) 
  : 0;

  if (loading) return <p>Loading cart...</p>;

  return (
    <>
      <Navbar />
      <div>
        <h2 className="y-cart">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty">Your cart is empty!!</p>
        ) : (
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <table className="cart-tabl">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Model</th>
                  <th>Quantity</th>
                  <th>Cumulative Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} > 
                    <td>
                      <img
                        src={item.productId.image}
                        alt={item.productId.model}
                        className="cart-image"
                      />
                    </td>
                    <td>{item.productId.model}</td>
                    <td>
                      <button
                        onClick={() => decreaseQuantity(item.productId._id)}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          border: "none",
                          backgroundColor: "#007bff",
                          color: "white",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      &nbsp;&nbsp;
                      <span>{item.quantity}</span>
                      &nbsp;&nbsp;
                      <button
                        onClick={() => addToCart(item.productId)}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          border: "none",
                          backgroundColor: "#007bff",
                          color: "white",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td>₹{(item.productId.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.productId._id)}
                        className="removeBtn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="total-section">
            <h2>Total Amount: ₹{total.toFixed(2)}</h2>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCart;
