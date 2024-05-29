const json  = require("express");

let place_order = document.getElementById("place_order");
let name = document.getElementById("name");
let city = document.getElementById("city");
let num = document.getElementById("num");
let email = document.getElementById("email");
let sadress = document.getElementById("sadress");

// function placeOrder(){
//   if(name.value && city.value && num.value && email.value && sadress.value){
//     alert("Plce Order Successfully");
//     window.location.href = "index.html";
//   }else{
//     alert("Plz Fill Out this All Fields!");
//   }
// }

place_order.addEventListener("click" , ()=>{
  fetch('/stripe-checkout',{
    headers:new Headers({'Content-type':'application/Json'}),
    body:JSON.stringify({
      items:JSON.parse(localStorage.getItem('data')),
    }),
  })
  .then((res)=>res.json())
  .then((url)=>{
    location.href=url;
  })
  .catch((err)=>console.log(err));

});
