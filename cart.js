let cartContainer = document.querySelector(".cart-products-container");
let subTotal = document.querySelector(".subtotal");
let totalPrice = document.querySelector(".total-price");
let resetAllProducts = document.querySelector(".remove-all");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

resetAllProducts.addEventListener("click", () => {
  let mainCartContainer = document.querySelector(".main-cart");
  console.log("alex ze ani");
  cart = localStorage.clear();
  cartContainer.innerHTML = `
  <div class="empy-cart-container">
  <div class="empy-cart">Your Cart Is Empty</div>
  <a href="index.html" class="back-to-home">Back to homepage</a>
   </div>
  `;
  mainCartContainer.innerHTML = `
  <a href="cart.html"><i class="bi bi-cart"></i></a>
  <div class="product-qty">${0}</div>
  `;
  subTotal.innerHTML = `
  <div>Subtotal:$${0}</div>
  <div>Taxes:Calculated at checkout</div>
  <div>Shipping:Calculated at checkout</div>
  `;
  totalPrice.innerHTML = `
  <div>Total price:$${0}</div>
  <div>Total item:$${0}</div>
    `;
  setTimeout(() => {
    window.location = "index.html";
  }, 4000);
  clearTimeout();
});

console.log(cart);
//this function are display and generate cart items
let generateCartItems = () => {
  if (cart.length !== 0) {
    renderCart();
  } else {
    cartContainer.innerHTML = `
        <div class="empy-cart-container">
        <div class="empy-cart">Your Cart Is Empty</div>
        <a href="index.html" class="back-to-home">Back to homepage</a>
         </div>
        `;
  }
};
generateCartItems();

//this function is update all page
function updateCart() {
  renderCart();
  calculate();
}
//this function is remove items
function removeItem(id) {
  let mainCartContainer = document.querySelector(".main-cart");
  cart = cart.filter((item) => item.id !== id);
  if (cart.length === 0) {
    mainCartContainer.innerHTML = `
        <a href="cart.html"><i class="bi bi-cart"></i></a>
        <div class="product-qty">${0}</div>
        `;
    subTotal.innerHTML = `
        <div>Subtotal:$${0}</div>
        <div>Taxes:Calculated at checkout</div>
        <div>Shipping:Calculated at checkout</div>
        `;
    totalPrice.innerHTML = `
        <div>Total price:$${0}</div>
        <div>Total item:$${0}</div>
          `;
  }
  updateCart();
}

//this function is display cart items
function renderCart() {
  if (cart.length !== 0) {
    cartContainer.innerHTML = "";
    return (cartContainer.innerHTML = cart
      .map((items) => {
        let { id, img, name, price, numberOfitems } = items;
        return `
                <div class="cart-products">
                    <div class="img-product-cart"><img src=${img} alt="hookah"></div>
                    <div class="name-product-cart"><p>${name}</p></div>
                    <div class="price-product-cart"><p>$${price}</p></div>
                    <div class="minus-plus">
                        <i class="bi bi-dash" onclick="increAndDecre('minus' , '${id}')"></i>
                        <p class="qty-of-product">${numberOfitems}</p>
                        <i class="bi bi-plus" onclick="increAndDecre('plus', '${id}')"></i>
                    </div>
                    <div class="remove-product">
                        <button type="submit" onclick="removeItem('${id}')">Remove</button>
                    </div>
                </div>
                `;
      })
      .join(""));
  } else {
    cartContainer.innerHTML = `
        <div class="empy-cart-container">
        <div class="empy-cart">Your Cart Is Empty</div>
        <a href="index.html" class="back-to-home">Back to homepage</a>
         </div>
        `;
  }
}

//update to number of items in cart
function calculate() {
  let mainCartContainer = document.querySelector(".main-cart");
  let totalProductsinCart = 0,
    subTotalPrice = 0,
    TotalPrice = 0;

  cart.forEach((product) => {
    totalProductsinCart += product.numberOfitems;

    subTotalPrice += product.price * totalProductsinCart;
    TotalPrice += (product.price + 2.5) * totalProductsinCart;
    subTotal.innerHTML = `
            <div>Subtotal:$${subTotalPrice}</div>
            <div>Taxes:Calculated at checkout</div>
            <div>Shipping:Calculated at checkout</div>
            `;
    totalPrice.innerHTML = `
            <div>Total price:$${TotalPrice}</div>
            <div>Total item:$${totalProductsinCart}</div>
              `;

    mainCartContainer.innerHTML = `
          <a href="cart.html"><i class="bi bi-cart"></i></a>
          <div class="product-qty">${totalProductsinCart}</div>
          `;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}
calculate();

function increAndDecre(action, id) {
  cart.forEach((product) => {
    if (product.id === id) {
      if (action === "minus" && product.numberOfitems > 1) {
        product.numberOfitems--;
      } else if (action === "plus" && product.numberOfitems < product.instock) {
        product.numberOfitems++;
      }
    }
  });
  updateCart();
}
