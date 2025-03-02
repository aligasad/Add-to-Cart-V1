const arrProduct = [
  {
    id: 1,
    quantity: 0,
    name: "product-1",
    price: 145,
  },
  {
    id: 2,
    quantity: 0,
    name: "product-2",
    price: 200,
  },
  {
    id: 3,
    quantity: 0,
    name: "product-3",
    price: 332,
  },
  {
    id: 4,
    quantity: 0,
    name: "product-4",
    price: 450,
  },
  {
    id: 5,
    quantity: 0,
    name: "product-5",
    price: 450,
  },
];

const cartItems = [];

const products = document.querySelector("#products");
const cart = document.querySelector(".list");
cart.classList.add('right')
const totalBtn = document.querySelector("#cart>p");
let total = 0;


function updatePrice() {
  total = 0;
  cartItems.forEach((id)=>{
    let p = arrProduct.find((p) => p.id == id);
    total += (p.price * p.quantity);
  });
  totalBtn.innerHTML = 'Total: '+ total;
  totalBtn.classList.add('tBtn');
}

function addProduct(item) {
  if (!cartItems.includes(item.id)) {
    cartItems.push(item.id);
    console.log(cartItems);
    cart.innerHTML += `<div class='items' id='cart${item.id}'>
    <p>${item.name}</p>
    <p class='quantity'>${item.quantity} x ${item.price}</p>
    </div>`;
  } else {

    let cI = document.querySelector(`#cart${item.id} .quantity`);
    cI.innerHTML = `${item.quantity} x ${item.price}`;
    
  }
  updatePrice()
}





function onInIt() {
  arrProduct.forEach((item) => {
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("items");
    let name = document.createElement("p");
    name.innerText = item.name;

    let price = document.createElement("p");
    price.innerText = `${item.price}`;

    let addbtn = document.createElement("p");
    let minus = document.createElement("span");
    let noOfItens = document.createElement("span");
    let plus = document.createElement("span");

    minus.innerText = "-";
    minus.classList.add('minPls');
    noOfItens.innerText = item.quantity;
    plus.innerText = "+";
    plus.classList.add('minPls');

    plus.addEventListener("click", () => {
      arrProduct.find((p) => p.id == item.id).quantity++;
      noOfItens.innerText = item.quantity;
      addProduct(item);
    });

    minus.addEventListener("click", (e) => {
      if (item.quantity) {
        arrProduct.find((p) => p.id == item.id).quantity--;
        noOfItens.innerText = item.quantity;
      } 
      updatePrice();
      if(item.quantity === 0){
        document.querySelector(`#cart${item.id}`).remove();
        let toDelIdx = cartItems.findIndex((e)=> e.id == item.id);
        cartItems.splice(toDelIdx, 1);
      }
    });

    

    addbtn.append(minus, noOfItens, plus);
    addbtn.classList.add("sp");
    itemDiv.append(name, price, addbtn);
    products.classList.add("list");
    products.append(itemDiv);
  });
}

onInIt();
