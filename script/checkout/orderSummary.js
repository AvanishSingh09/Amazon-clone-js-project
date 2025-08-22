import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatcurrency } from '../utils/money.js';
import { updatecartquantity } from '../utils/cart-quantity.js';

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { deliveryoptions } from '../../data/deliveryoptions.js';

export function renderOrderSummary() {
    let cartsummaryhtml = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.id;

        // Find the matching product
        const matchingproduct = products.find(product => product.id === productId);

        // Get delivery option safely
        const deliveryoptionId = cartItem.deliveryoptionId;
        const deliveryoption = deliveryoptions.find(option => option.id === deliveryoptionId) 
                        || deliveryoptions[0]; // fallback to first option

        // If no product found, skip this cart item
        if (!matchingproduct) {
            console.warn(`Product with ID ${productId} not found.`);
            return;
        }

        // Calculate delivery date
        const today = dayjs();
        const deliverydate = today.add(deliveryoption.deliverydays, 'days');
        const dateString = deliverydate.format('dddd, MMMM D');

        // Build cart item HTML
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
                        <span class="delete-quantity-link link-primary js-delete-link" 
                            data-product-id="${matchingproduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryoptionsHTML(matchingproduct, cartItem)}
                </div>
            </div>
        </div>
        `;
    });

    // Renders all delivery options for a product
    function deliveryoptionsHTML(matchingproduct, cartItem) {
        let html = '';
        deliveryoptions.forEach((deliveryoption) => {
            const today = dayjs();
            const deliverydate = today.add(deliveryoption.deliverydays, 'days');
            const dateString = deliverydate.format('dddd, MMMM D');

            const priceString = deliveryoption.pricecents === 0 
                ? 'Free' 
                : `${formatcurrency(deliveryoption.pricecents)} -`;

            const isChecked = deliveryoption.id === cartItem.deliveryoptionId;

            html += `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingproduct.id}"
                    data-delivery-option-id="${deliveryoption.id}">
                    <input type="radio" 
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingproduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }

    // Insert cart summary into page
    document.querySelector('.js-order-summary').innerHTML = cartsummaryhtml;

    // Update cart quantity in header
    updatecartquantity();

    // Delete button listeners
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

    // Delivery option listeners (FIXED ✅)
    document.querySelectorAll('.delivery-option-input')
        .forEach((input) => {
            input.addEventListener('change', () => {
                const parent = input.closest('.js-delivery-option');
                const productId = parent.dataset.productId;
                const deliveryoptionId = parent.dataset.deliveryOptionId;

                updateDeliveryOption(productId, deliveryoptionId);
                renderOrderSummary();
            });
        });
}
renderOrderSummary();
