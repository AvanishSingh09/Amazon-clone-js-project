const xhr= new XMLHttpRequest();
const xhr2= new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});
xhr.addEventListener('load',()=>{
    console.log(xhr2.response);
});

xhr.open('GET','https://supersimplebackend.dev/products/first');//response type is json in this url 
xhr.send();
xhr2.open('GET','https://supersimplebackend.dev/documentation');
xhr2.send();
