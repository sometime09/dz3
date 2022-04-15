const products = [
    {
        id: 1,
        name: "Apple",
        price: 12000,
        imgUrl: "img/ap.png"
    },
    {
        id: 2,
        name: "Nokia",
        price: 20000,
        imgUrl: "img/ap2.png"
    },
    {
        id: 3,
        name: "Apple 2",
        price: 10000,
        imgUrl: "img/ap3.png"
    },
    {
        id: 4,
        name: "Samsung",
        price: 5000,
        imgUrl: "img/ap.png"
    },
    {
        id: 5,
        name: "Samsung",
        price: 5000,
        imgUrl: "img/ap.png"
    }
]

const productsId = document.getElementById('products');
const ad = document.getElementById('ad');
const basketTotal = document.getElementById('total');

products.forEach(product => {
    productsId.innerHTML += `
            <div class="col-lg-3 mb-3">
                <div class="product">
                    <img src=${product.imgUrl} alt="#">
                    <h5>${product.name}</h5>
                    <h6>${product.price} сом</h6>
                    <button class="product__basket-btn" data-id=${product.id} data-name=${product.name} data-price=${product.price}>Добавить в корзину</button>
                </div
            </div>
`
})

const addBasketBtns = document.querySelectorAll('.product__basket-btn');
addBasketBtns.forEach(btn => btn.addEventListener('click', addToBasket));


/// добавление рекламы
const handleAd = {
    closeBtn: document.getElementById('closeBtn'),
    counter: document.getElementById('ad__counter-count'),
    handleShow: function () {
        setTimeout(() => {
            ad.classList.add('active');
            handleAd.interval();
        }, 1000)
    },
    interval: function () {
        let counter = 4;
        handleAd.idInterval = setInterval(function () {
            counter -= 1;
            handleAd.counter.textContent = counter;
            if (counter == 0) {
                clearInterval(handleAd.idInterval);
                handleAd.closeBtn.disabled = false;
            }
        }.bind(this), 1000)
    },
    hideAd: function () {
        ad.classList.remove('active');
    }
}


// добавление товара в корзину
let cart = {};

function showTotalSumm() {
    const totalSumm = JSON.parse(localStorage.getItem('totalSumm'));
    basketTotal.textContent = totalSumm;

}

function setTotalSumm () {
    let totalSumm = 0;
    const cartLocalStorage = localStorage.getItem('cart')
    const cartPlace  = JSON.parse(cartLocalStorage)

    console.log(cartPlace);

    for(let i in cartPlace) {
        totalSumm += cartPlace[i].productSumm
    }

    localStorage.setItem('totalSumm', totalSumm)
    showTotalSumm()

}

function setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function addElementBuskets () {

}

function addToBasket(e) {
    e.preventDefault();
    const dataset = e.target.dataset
    const data = {
        id: dataset.id,
        name: dataset.name,
        price: +dataset.price,
        photo: dataset.photo,
        things: +dataset.things,
    }
    const cartLocalStorage = localStorage.getItem('cart');
    const cartObj = JSON.parse(cartLocalStorage)

    cart = {...cartObj}

    if (cart[data.id]) {
            cart[data.id].count++,
            cart[data.id].productSumm = cart[data.id].count * data.price
    } else {
        cart[data.id] = {
            count: 1,
            name: data.name,
            price: +data.price,
            productSumm: +data.price
        }
    }
    setLocalStorage();
    setTotalSumm();
}

handleAd.closeBtn.addEventListener('click', handleAd.hideAd)


//Удаление товара из корзины
const deleteBasketBtns = document.querySelectorAll('.product__basket-btn-delete');
deleteBasketBtns.forEach(btn => btn.addEventListener('click', deleteInBasket));


function deleteInBasket(e) {
    e.preventDefault()
    const dataset = e.target.dataset

    const data = {
        id: dataset.id,
        name: dataset.name,
        price: +dataset.price
    }  

    if (cart[data.id]) {
        if (cart[data.id].count > 1) {
            cart[data.id].count--
            cart[data.id].productSumm = cart[data.id].count * data.price
        } else {
            delete cart[data.id]
        }
    } else {
        alert('Этого товара в корзине нету')
    }

    let cart = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify(cart))

    setTotalSumm();
}





















//Поик товара

// const searchBtn = document.getElementById('search__btn');
// const searchInput = document.getElementById('search__input');

// function search(text) {
//     productsId.forEach((element) => {
//         if(element.searchInput.search(productsId) === -1) {
//             console.log(element)
//         }
//     })
// };

// searchInput.addEventListener('click', (e) => {
//     e.preventDefault();
//     search(searchInput.value)
// });