let slidebtnleft=document.getElementById("slide-btn-left");
let slidebtnright=document.getElementById("slide-btn-right");
let imageno=document.querySelectorAll(".imageno");

// Add an event listener to the sign-in link
// Add an event listener to the sign-in link





//console.log(imageno.length-1);
let startslider=0;
let endslider=(imageno.length-1)*100;
//console.log(endslider);
slidebtnleft.addEventListener("click",handleftbtn)

function handleftbtn(){
    
        if(startslider<0){
        startslider=startslider+100;}
        else{
            startslider=-400;
          
        }
        imageno.forEach(element=>{
            //console.log(startslider);
           element.style.transform=`translateX(${startslider}%)`;
        })
        
    
    
}


slidebtnright.addEventListener("click",handlerightbtn)


function handlerightbtn(){
    
        if(startslider>=-endslider+100){
        startslider=startslider-100;}
        else{
            startslider=0;
        }
        imageno.forEach(element=>{
          //  console.log(startslider);
           element.style.transform=`translateX(${startslider}%)`;
        })
       
        
}


//automatic render button
function renderslideauto(){
    if(startslider>=-endslider+100){
        handlerightbtn();
    }
    else{
        startslider=0;
    }
}
setInterval(renderslideauto,2000)





let slidebar_navigation=document.getElementById("slidebar_section_id");
let all_border=document.getElementById("all_border1");
all_border.addEventListener("click",()=>{
slidebar_navigation.classList.toggle("slidebar_showbar");
//console.log(slidebar_navigation);
})
const buttoncls=document.getElementById("closebutton")
buttoncls.addEventListener("click",()=>{
    slidebar_navigation.classList.toggle("slidebar_showbar");
})

let signin_section=document.getElementById("hsign");
let container=document.querySelector(".container")
signin_section.addEventListener("click",()=>{
   container.classList.add("active-popup");
  
})


/*

    let productcont = document.querySelector('.products');
  
    let generateshop=async(url)=>{
    
            let data = await fetch(url);
            let res = await data.json();
       console.log(res);
            // Use map to create an array of product elements
            let productElements = res.map((product) => {
                let description = product.description;
                let title = product.title;
                let imageUrl = product.image; // Update to use 'image' property
                let id=product.id;
            
               
                    return `
                        <div class="product">
                            <div class="product_container_img">
                            <img src="${imageUrl}" alt="${product.category}" class="product-img">
                             </div>
                            <div class="product-content">
                                <h2 class="product-title">${title.length > 18 ? title.substring(0, 18).concat(' ...') : title}</h2>
                                <h4 class="product-category">${product.category}</h4>
                                <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ...more') : description}</p>
                                <div class="product-price-container">
                                    <h3 class="product-price">$${product.price}</h3>
                                    <button onclick="cartitem('${id}','${title}','${imageUrl}')"  class="add-to-cart" >add to cart </button>
                                </div>
                            </div>
                        </div>
                    `;          

            });
            
        
            // Join the array elements to form the inner HTML
            productcont.innerHTML = productElements.join('');
          
        }
    let cartitem =(id,price,image)=>{
        alert(id);
    }
        let today_deal_prev_btn=document.getElementById("tday_deal_prev_btn");
        let today_deal_next_btn=document.getElementById("tday_deal_next_btn");
        let today_deal_productitems=document.querySelectorAll(".product");
        let startproduct=0;
        today_deal_prev_btn.addEventListener("click",()=>{
           
           if(startproduct<0)
            {startproduct+=400;}
            if(startproduct>-2000){
          today_deal_productitems.forEach(el=>{
            el.style.transform=`translateX(${startproduct}%)`
        })
    }
           
        })

     today_deal_next_btn.addEventListener("click",()=>{
        if(startproduct>=-1500){
        
        startproduct-=500;}
          today_deal_productitems.forEach(el=>{
            el.style.transform=`translateX(${startproduct}%)`
          })
        })
        

    
    

   

  
    generateshop('https://fakestoreapi.com/products');// Replace with your actual API endpoint

*/
let basket = JSON.parse(localStorage.getItem('data')) || []

let productcontainer = document.querySelector('.products');

// Function to generate shop content
async function generateshop(url) {
    try {
        let data = await fetch(url);
        let res = await data.json();

        let shopContent = res.map((product) => {
            let description = product.description;
            let title = product.title;
            let imageUrl = product.image;
            let id = product.id;
            let price=product.price;

            return `
            <div class="product">
                <div class="product_container_img">
                    <img src="${imageUrl}" alt="${product.category}" class="product-img">
                </div>
                <div class="product-content">
                    <h2 class="product-title">${title.length > 18 ? title.substring(0, 18).concat(' ...') : title}</h2>
                    <h4 class="product-category">${product.category}</h4>
                    <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ...more') : description}</p>
                    <div class="product-price-container">
                        <h3 class="product-price">$${product.price}</h3>
                        <button onclick="cartitem('${id}','${title}','${imageUrl}','${price}')" class="add-to-cart">add to cart</button>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        productcontainer.innerHTML = shopContent;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to handle adding item to cart
function cartitem(id, title, imageUrl,price) {
    basket.push({
        id: id,
        item: 1,
        name: title,
        price: price,
        img:imageUrl,
        qty: 1
        })
    
      localStorage.setItem('data',JSON.stringify(basket))
    
    
      calculate();
}

// Event listeners for navigation buttons
let today_deal_prev_btn = document.getElementById("tday_deal_prev_btn");
let today_deal_next_btn = document.getElementById("tday_deal_next_btn");
let startproduct = 0;

today_deal_prev_btn.addEventListener("click", () => {
    if (startproduct < 0) {
        startproduct += 100;
    }
    if (startproduct > -2000) {
        productcontainer.style.transform = `translateX(${startproduct}%)`;
    }
});

today_deal_next_btn.addEventListener("click", () => {
    if (startproduct >= -1500) {
        startproduct -= 100;
    }
    productcontainer.style.transform = `translateX(${startproduct}%)`;
});
let calculate = () => {
    let cart_icon = document.getElementById('carts')
    let cart_amount = basket.length
  
     cart_icon.innerHTML = cart_amount
  }
  
  
  calculate()
// Generating shop content after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateshop('https://fakestoreapi.com/products');
});


const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

