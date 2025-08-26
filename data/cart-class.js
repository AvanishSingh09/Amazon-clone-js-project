class Cart{

    cartItem=undefined;
    loadFromStorage() {
        this.cartItem= JSON.parse(localStorage.getItem('cart-oop'));
    if(!this.cartItem){
    this.cartItem=[{
    id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryoptionId: '1'
    },{
    id:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryoptionId: '2'
    }];
    }
    }
    savetostorage(){
    localStorage.setItem('cart-oop',JSON.stringify(this.cartItem));
    }
    addtocart(productId){
     let matchingitem;
      this.cartItem.forEach((cartItem)=>{
       if(productId===cartItem.id){
         matchingitem=cartItem;
       }
      });
      if(matchingitem){
       matchingitem.quantity+=1;
      }
      else{
       this.cartItem.push({
       id: productId,
       quantity:1,
       deliveryoptionId:'1'
      });
      }
     
    }
    removeFromCart(productId){
     let newcart=[];
    
     this.cartItem.forEach((cartItem)=>{
       if(cartItem.id!== productId){
         newcart.push(cartItem);
       }
     });
    this.cartItem=newcart;
     savetostorage();
    },
    updateDeliveryOption(productId,deliveryoptionId){
        let matchingitem;
       this.cartItem.forEach((cartItem)=>{
        if(productId===cartItem.id){
          matchingitem=cartItem;
        }
       });
       matchingitem.deliveryoptionId = deliveryoptionId;
    
       savetostorage();
    }
}
cart.loadFromStorage();