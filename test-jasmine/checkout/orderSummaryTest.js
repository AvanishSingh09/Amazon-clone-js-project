import {renderOrderSummary} from '../../script/checkout/orderSummary.js';
describe('test suite:renderorder summary',()=>{
   it('displays the cart',()=>{
     document.querySelector('.js-test-container').innerHTML=
    `<div class="js-order-summary></div>"`;
   });  
});