import { cart } from "../../data/cart.js";

export function updatecartquantity() {
  let cartQuantity = 0;j
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelectorAll(".js-cart-quantity").forEach((element) => {
    element.innerHTML = cartQuantity;
  });
}
