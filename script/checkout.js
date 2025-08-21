import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatcurrency } from './utils/money.js';
import { updatecartquantity } from './utils/cart-quantity.js';


import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import {deliveryoptions} from '../data/deliveryoptions.js';

let cartsummaryhtml = '';

cart.forEach((cartItem) => {
    const productId = cartItem.id;
    
    // Using find() to directly get the matching product
    const matchingproduct = products.find(product => product.id === productId);
    
    const deliveryoptionId=cartItem.deliveryoptionId;
    let deliveryoption;

    deliveryoptions.forEach((option)=>{
      if(option.id===deliveryoptionId){
        deliveryoption=option;
      }
     });
     const today=dayjs();
    const deliverydate=today.add(
        deliveryoption.deliverydays,
        'days'
    );
    const dateString=deliverydate.format('dddd, MMMM D');

    if (matchingproduct) {
        // Proceed only if the matching product is found
        cartsummaryhtml += `
        <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingproduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingproduct.name}
                </div>
                <div class="product-price">
                    ${formatcurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                 ${deliveryoptionsHTML(matchingproduct,cartItem)}
                </div>
            </div>
        </div>
        `;
    } else {
        // Optional: Handle the case where a matching product is not found
        console.warn(`Product with ID ${productId} not found.`);
    }
});

function deliveryoptionsHTML(matchingproduct,cartItem){
let html=''
deliveryoptions.forEach((deliveryoption)=>{
    const today=dayjs();
    const deliverydate=today.add(
        deliveryoption.deliverydays,
        'days'
    );
    const dateString=deliverydate.format('dddd, MMMM D');
    const priceString=deliveryoption.pricecents=== 0 ? 'free'
    :`${formatcurrency(deliveryoption.pricecents)} -`;

    const isChecked=deliveryoption.id===cartItem.deliveryoptionId;

     html+=
     `
                <div class="delivery-option">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="${matchingproduct.id}">
                    <div>
                    <div class="delivery-option-date">
                       ${dateString}
                    </div>
                    <div class="delivery-option-price">
                       ${priceString} Shipping
                    </div>
                    </div>
                </div>
     `
}); 
return html;
}

document.querySelector('.js-order-summary').innerHTML = cartsummaryhtml;

updatecartquantity();

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            updatecartquantity();
        });
    });
