import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cms-firebase-35b91-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetch cart failed!");
      }

      console.log(response);
      const data = await response.json();

      return data;
    };

    try {
      const data = await fetchData();
      //console.log(data);
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          itemCount: data.itemCount || 0,
          totalPrice: data.totalPrice || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error fetching cart data",
        })
      );
      dispatch(cartActions.replaceCart({
        items: [],
        totalPrice: 0,
        itemCount: 0
      }))
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      //console.log(cart);
      const response = await fetch(
        "https://cms-firebase-35b91-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            itemCount: cart.itemCount,
            totalPrice: cart.totalPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error sending cart data",
        })
      );
    }
  };
};
