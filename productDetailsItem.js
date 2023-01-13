let productDetailsContainer = document.querySelector(
  ".product-details-container"
);
let qty = document.querySelector(".product-qty");
let succes = document.querySelector(".successAddToCart-container");
productDetails = JSON.parse(localStorage.getItem("details")) || [];

console.log(productDetails);
const renderProductsDetails = (filters) => {
  productDetails.forEach((item) => {
    const search = products.find((product) => product.id === item.id);
    if (search) {
      return (productDetailsContainer.innerHTML = `
      <div class="product-image"><img src=${item.img} /></div>
    <div class="product-details">
        <div class="name">
        <p>${item.name}</p>
        </div>
        <div class="star-rating">
        <button class="star">&#9734;</button>
        <button class="star">&#9734;</button>
        <button class="star">&#9734;</button>
        <button class="star">&#9734;</button>
        <button class="star">&#9734;</button>
        <p class="current-rating">0 of 5</p>
        </div>
        <div class="description">
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            error. Impedit sed aperiam laudantium incidunt! Illum, corporis.
            Facilis recusandae molestiae tenetur quisquam, asperiores tempore
            rerum, totam officiis, autem dolorem itaque.
        </p>
        </div>
        <div class="price">
        <h2>$${item.price}</h2>
        </div>
        <div class="details-form">
        <div class="select hookah-select">
            <label for="hookah">Hookah<span>*</span></label>
            <select name="hookah" id="hookah">
            <option value="select">Select please</option>
            <option value="silver">Silver dark</option>
            <option value="metal">Metal dark</option>
            </select>
        </div>
        <div class="select tabacco-select">
            <label for="tabacco">Tabacco</label>
            <select name="tabacco" id="tabacco">
            <option value="select">Select please</option>
            <option value="silver">Silver dark</option>
            <option value="metal">Metal dark</option>
            </select>
        </div>
        <div class="select charcoal-select">
            <label for="charcoal">Charcoal</label>
            <select name="charcoal" id="charcoal">
            <option value="select">Select please</option>
            <option value="silver">Silver dark</option>
            <option value="metal">Metal dark</option>
            </select>
        </div>
        </div>
        <div class="in-stock">
        <h3>In Stock</h3>
        <i class="bi bi-check"></i>
        </div>
        <div class="select qty">
        <label for="qty">Qty</label>
        <select name="qty" id="qty">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
        </div>
        <div class="add-to-cart-btn">
        <button onclick="addToCart('${item.id}')">Add To Cart</button>
        </div>
  </div>
      `);
    }
  });
};

function update() {
  productDetails.forEach((item) => {
    const filt = products.filter((product) => product.id === item.id);
    renderProductsDetails(filt);
  });
}
update();

function addToCart(id) {
  productDetails.forEach((item) => {
    if (item.id === id) {
      qty.innerHTML = `${item.itemNum++}`;
      succes.classList.add("success");
      localStorage.setItem("details", JSON.stringify(productDetails));
      setInterval(() => {
        window.location = "index.html";
      }, 4000);
      clearInterval();
    }
    productDetails = localStorage.clear();
  });
}
