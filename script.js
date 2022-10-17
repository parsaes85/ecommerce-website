let products = document.querySelectorAll('.product')
let productDetails = document.querySelector('.product-details-parent')
let productDetailsCloseBtn = document.querySelector('.product-details-close-btn')
let productDetailsImg = document.querySelector('.product-details-img')
let productDetailsName = document.querySelector('.product-details-name')
let productDetailsPrice = document.querySelector('.product-details-price')
let cart = document.querySelector('.cart-parent')
let cartOpenBtn = document.querySelector('nav .bx-shopping-bag')
let cartCloseBtn = document.querySelector('.cart-close-btn')
let addToCartBtn = document.querySelectorAll('.add-to-cart-btn')
let productParent = document.querySelector('.products-in-cart')
let orderProductNumber = document.querySelector('.order-product-number')
let buyBtn = document.querySelector('.buy-btn') 


let orderProducts = JSON.parse(localStorage.getItem('orderProducts')) || []

addToCartBtn.forEach(btn=>{
    btn.addEventListener('click',e=>{
        orderProductInfo = {
            Pimg : e.target.closest('.product').firstElementChild.src,
            Pname : e.target.closest('.product-info').firstElementChild.firstElementChild.innerText,
            Pprice : e.target.closest('.product-info').firstElementChild.lastElementChild.innerText,
        }

        orderProducts.push(orderProductInfo)

        orderProducts = orderProducts.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === orderProducts.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
        });

        localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
        addProductToCart()

        productOrderedNumber()
    })
})
localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
addProductToCart()

products.forEach(product=>{
    product.addEventListener('click',e=>{
        if(e.target.className == 'details-btn'){
            productDetails.id = 'show-product-details'
            productDetailsImg.src = e.target.closest('.product').firstElementChild.src
            productDetailsName.innerText = e.target.closest('.product-info').firstElementChild.firstElementChild.innerText
            productDetailsPrice.innerText = e.target.closest('.product-info').firstElementChild.lastElementChild.innerText
        }
    })
})

productDetailsCloseBtn.addEventListener('click',e=>{
    productDetails.id = ''
})

cartOpenBtn.addEventListener('click',e=>{
    cart.id = 'show-cart'
})
cartCloseBtn.addEventListener('click',e=>{
    cart.id = ''
})



function addProductToCart() {
    document.querySelector('.products-in-cart').innerHTML = ''
    
    orderProducts.forEach(orderProduct=>{
        let product = document.createElement('div')
        product.classList = 'product-in-cart'

        let deleteIcon = document.createElement('i')
        deleteIcon.classList = 'bx bxs-trash-alt'

        let div = document.createElement('div')

        let productImg = document.createElement('img')
        productImg.classList = 'product-in-cart-img'
        productImg.src = orderProduct.Pimg

        let productInfo = document.createElement('div')
        productInfo.classList = 'product-in-cart-info'

        let productName = document.createElement('h4')
        productName.classList = 'product-in-cart-name'
        productName.innerText = orderProduct.Pname

        let productPrice = document.createElement('p')
        productPrice.classList = 'product-in-cart-price'
        productPrice.innerText = orderProduct.Pprice

        let productNumber = document.createElement('input')
        productNumber.classList = 'product-in-cart-number'
        productNumber.type = 'number'
        productNumber.value = 1

        productInfo.appendChild(productName)
        productInfo.appendChild(productPrice)
        productInfo.appendChild(productNumber)
        div.appendChild(productImg)
        div.appendChild(productInfo)
        product.appendChild(div)
        product.appendChild(deleteIcon)

        document.querySelector('.products-in-cart').appendChild(product)
            
        deleteIcon.addEventListener('click',e=>{
            product.remove()
            orderProducts = orderProducts.filter(p=> p != orderProduct)
            localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
            addProductToCart()

            productOrderedNumber()
        })

        function calculeteTotalPrice() {
            if(productNumber.value <= 0){
                productNumber.value = 1
            }

            let total = 0
            let quantity = productNumber.value
            let price = parseFloat(orderProduct.Pprice.replace('$', ''))
            total = (price*quantity)
            total = Math.round(total*100)/100

            productPrice.innerText = '$' + total
        }
        

        productNumber.addEventListener('change',e=>{
            calculeteTotalPrice()
        })

        calculeteTotalPrice()
    })
}

function productOrderedNumber() {
    orderProductNumber.innerText = orderProducts.length

    if(orderProducts.length == 0){
        orderProductNumber.style.display = 'none'
    }else{
        orderProductNumber.style.display = 'flex'
    }
}
productOrderedNumber()

buyBtn.addEventListener('click',e=>{
    if(orderProducts.length >= 1){
        document.querySelector('.alert').id = 'show-alert'
        setTimeout(function(){
            document.querySelector('.alert').id = ''
        },2000)
        
        cartCloseBtn.click()

        document.querySelector('.alert button').addEventListener('click',e=>{
            document.querySelector('.alert').id = ''
        })
    }
    
    orderProducts = []
    localStorage.setItem('orderProducts', JSON.stringify(orderProducts))
    addProductToCart()
    productOrderedNumber()
})

