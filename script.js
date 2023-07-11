// Toggle class active untuk hamburger
const navbarNav = document.querySelector('.navbar-nav');
//ketika hamburger-menu di klik 
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};




// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
//ketika search form di klik 
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};


//klik diluar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');


document.addEventListener('click', function(e){
    if(!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }

});

//membuat menu dan shopping cart
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

//open dan close shopping button
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

//menu
let products = [
    {
        id: 1,
        name: 'Nasi Goreng',
        image: 'nasigoreng.jpeg',
        price: 12000
    },
    {
        id: 2,
        name: 'Mie Goreng',
        image: 'migoreng.jpeg',
        price: 8000
    },
    {
        id: 3,
        name: 'Nasi Bakar',
        image: '2.jpg',
        price: 8000
    },
    {
        id: 4,
        name: 'Soto Ayam',
        image: 'soto.jpeg',
        price: 10000
    },
    {
        id: 5,
        name: 'Es Jeruk',
        image: 'esjeruk.jpeg',
        price: 4000
    },
    {
        id: 6,
        name: 'Es Teh',
        image: 'esteh.jpeg',
        price: 3000
    },
    {
        id: 7,
        name: 'Coffee latte',
        image: 'kopilatte.jpeg',
        price: 7000
    },
    {
        id: 8,
        name: 'Wedang Jahe',
        image: 'wedangjahe.jpeg',
        price: 5000
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
