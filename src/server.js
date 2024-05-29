const express = require("express");
const dotenv =require ("dotenv");
const stripe=require("stripe");
const path = require("path");

dotenv.config();
const staticpath=path.join(__dirname,"../public")
// Start server
const app = express();


app.use(express.static(staticpath));
app.get('/',(req,resp)=>{
    resp.sendFile("index.html",{root:"public"});
})
//success
app.get('/success',(req,resp)=>{
    resp.sendFile("success.html",{root:"public"});
})
app.get('/cancel',(req,resp)=>{
    resp.sendFile("cancel.html",{root:"public"});
})
//stripe
let stripegateway=stripe(process.env.stripe_api);
let DOMAIN=process.env.DOMAIN;
app.post('/stripe-checkout',async(req,resp)=>{
    const lineitems=req.body.items.map((item)=>{
        const unitamount=parseInt(item.price.replace(/[^0-9.-]+/g, '')* 100);
        console.log('itemprice',item.price);
        console.log('unitamount',unitamount);
        return{
            price_data:{
                currency:'usd',
                product_data:{
                    name:item.title,
                    images:[item.image]
                },
                unit_amount:unitamount,
            },
            price:item.price
        };
    });
    console.log(lineitems);
    //create checkout session
    const session=await stripegateway.checkout.session.create({
        payment_method_type:['card'],
        mode:'payment',
        success_url:`${DOMAIN}/success`,
        cancel_url:`${DOMAIN}/cancel`,
        line_items:lineitems,
        //asking address in stripe checkout
        billing_address_collection:'required'
    });
    resp.join(session.url);
});

app.use(express.json());

app.listen(8000,()=>{
    console.log("listening");
});