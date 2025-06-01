// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [food_list, setFoodList] = useState([]);
//   const [token, setToken] = useState("");
//   const url = "http://localhost:4000";

//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }

//     if (token) {
//       await axios.post(
//         url + "/api/cart/add",
//         { itemId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => {
//       const newCount = (prev[itemId] || 1) - 1;
//       if (newCount <= 0) {
//         const { [itemId]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [itemId]: newCount };
//     });

//     if (token) {
//       await axios.post(
//         url + "/api/cart/remove",
//         { itemId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const itemId in cartItems) {
//       if (cartItems[itemId] > 0) {
//         const itemInfo = food_list.find((product) => product._id === itemId);
//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[itemId];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(url + "/api/food/list");
//       setFoodList(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch food list:", error);
//     }
//   };

//   const loadCartData = async (token) => {
//     try {
//       const response = await axios.post(
//         url + "/api/cart/get",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCartItems(response.data.cartData);
//     } catch (error) {
//       console.error("Failed to load cart data:", error);
//     }
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const savedToken = localStorage.getItem("token");
//       if (savedToken) {
//         setToken(savedToken);
//         await loadCartData(savedToken);
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  // Reload cart data when token changes (login or logout)
  useEffect(() => {
    if (token) {
      loadCartData(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  const addToCart = async (itemId) => {
    if (!token) {
      // User not logged in, update local cart only
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
      return;
    }
    try {
      const response = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await loadCartData(token);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) {
      // User not logged in, update local cart only
      setCartItems((prev) => {
        const newCount = (prev[itemId] || 1) - 1;
        if (newCount <= 0) {
          const { [itemId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [itemId]: newCount };
      });
      return;
    }
    try {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await loadCartData(token);
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // Initial load: fetch food list and check for saved token in localStorage
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        // cart will load from the useEffect above on token change
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
