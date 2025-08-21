export let cart= JSON.parse(localStorage.getItem('cart'))
if(!cart){
  cart=[{
  id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  deliveryoptionId: '1'
},{
  id:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryoptionId: '2'
}];
}


function savetostorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addtocart(productId){
  let matchingitem;
   cart.forEach((cartItem)=>{
    if(productId===cartItem.id){
      matchingitem=cartItem;
    }
   });
   if(matchingitem){
    matchingitem.quantity+=1;
   }
   else{
    cart.push({
    id: productId,
    quantity:1,
    deliveryoptionId:'1'
   });
   }
   savetostorage();
}

 export function removeFromCart(productId){
  let newcart=[];

  cart.forEach((cartItem)=>{
    if(cartItem.id!== productId){
      newcart.push(cartItem);
    }
  });
  cart=newcart;
  savetostorage();
}