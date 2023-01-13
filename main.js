let menu = document.querySelector(".mobile-menu"),
  mainMenuList = document.querySelector(".main-menu"),
  listElements = document.querySelectorAll(".link"),
  productContainer = document.querySelector(".product-container"),
  subUl = document.querySelectorAll(".sub-ul li"),
  currentRating = document.querySelector(".current-rating"),
  trendingProducts = document.querySelector(".trending-products"),
  trendingLink = document.querySelector(".trending a"),
  searchProducts = document.querySelector(".search input"),
  mainCartContainer = document.querySelector(".main-cart");

//menu open/close
function openAndCloseMenu() {
  menu.addEventListener("click", (e) => {
    if (e.target && mainMenuList.classList.contains("open-menu")) {
      menu.innerHTML = '<i class="bi bi-list"></i>';
      mainMenuList.classList.toggle("open-menu");
    } else {
      menu.innerHTML = '<i class="bi bi-x-lg"></i>';
      mainMenuList.classList.toggle("open-menu");
    }
  });
}
openAndCloseMenu();

//main menu active link
function mainMenu() {
  listElements.forEach((list) => {
    list.addEventListener("click", (e) => {
      e.preventDefault();
      listElements.forEach((link) => {
        link.classList.remove("active");
      });
      list.classList.toggle("active");
    });
    setInterval(() => {
      listElements.forEach((link) => {
        link.classList.remove("active");
      });
    }, 5000);
    clearInterval();
  });
}
mainMenu();

//slide function
const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//show products function
const generateProducts = (filterArray) => {
  return (productContainer.innerHTML = filterArray
    .map((product) => {
      let { id, img, name, price } = product;
      return `
    <div id=${id} class="product">
    <a href="productDetails.html" onclick="event.preventDefault() , productItem(${id})" ><img src=${img} /></a>
    <div class="star-rating">
      <button  class="star">&#9734;</button>
      <button class="star">&#9734;</button>
      <button class="star">&#9734;</button>
      <button class="star">&#9734;</button>
      <button class="star">&#9734;</button>
      <p class="current-rating">0 of 5</p>
    </div>
    <div class="product-name">
    <a href="productDetails.html" onclick="event.preventDefault() , productItem(${id}) "><p>${name}</p></a>
      
    </div>
    <div class="price-and-cart">
      <p class="product-price">$${price}</p>
      <i  class="bi bi-cart-plus" onclick="addToCart(${id})"></i>
    </div>
    <div class="product-details-link">
    <a href="productDetails.html" onclick="event.preventDefault() , productItem(${id}) ">More info</a>
    </div>
  </div>
    `;
    })
    .join(""));
};
generateProducts(products);

const productDetails = JSON.parse(localStorage.getItem("details")) || [];

function productItem(id) {
  let slectedItems = id;
  const itemDetails = products.find(
    (product) => product.id === slectedItems.id
  );
  productDetails.push({ ...itemDetails, itemNum: 1 });

  localStorage.setItem("details", JSON.stringify(productDetails));

  window.location = "productDetails.html";
}

//search products filter for click
let searchBtn = () => {
  if (true) {
    const filterArray1 = products.filter(
      (product) =>
        searchProducts.value.toLowerCase().trim() ===
          product.categories
            .toLowerCase()
            .slice(0, searchProducts.value.length) ||
        searchProducts.value.toLowerCase().trim() ===
          product.name.toLowerCase().slice(0, searchProducts.value.length) ||
        searchProducts.value.toLowerCase().trim() ===
          product.name
            .toLowerCase()
            .slice(searchProducts.value.length, product.name.length) ||
        searchProducts.value.toLowerCase().trim() === "hookah"
    );
    searchProducts.value = "";
    generateProducts(filterArray1);
  }
};

//search products filter for press enter
const searchProduct = () => {
  searchProducts.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      const filterArray1 = products.filter(
        (product) =>
          searchProducts.value.toLowerCase().trim() ===
            product.categories
              .toLowerCase()
              .slice(0, searchProducts.value.length) ||
          searchProducts.value.toLowerCase().trim() ===
            product.name.toLowerCase().slice(0, searchProducts.value.length) ||
          searchProducts.value.toLowerCase().trim() ===
            product.name
              .toLowerCase()
              .slice(searchProducts.value.length, product.name.length) ||
          searchProducts.value.toLowerCase() === "hookah"
      );
      console.log(filterArray1);
      searchProducts.value = "";
      generateProducts(filterArray1);
    }
  });
};
searchProduct();

//filter products
const filterProduct = () => {
  subUl.forEach((list) => {
    list.addEventListener("click", (e) => {
      const target = e.target;
      const filterArray = products.filter(
        (product) => product.categories === target.getAttribute("value")
      );

      generateProducts(filterArray);
      listElements.forEach((link) => {
        link.classList.remove("active");
        mainMenuList.classList.remove("open-menu");
        menu.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  });
};
filterProduct();

//trending products display function
function trendProductShow(arr) {
  // get random index value
  let randomIndex, item;
  for (let i = 0; i < 4; i++) {
    randomIndex = Math.floor(Math.random() * arr.length);
    item = arr[randomIndex];

    trendingProducts.innerHTML += `
      <div id=${item.id} class="product">
      <a href="productDetails.html"><img src=${item.img} /></a>
      <div class="star-rating">
        <button  class="star" >&#9734;</button>
        <button class="star" >&#9734;</button>
        <button class="star">&#9734;</button>
        <button class="star">&#9734;</button>
        <button class="star">&#9734;</button>
        <p class="current-rating">0 of 5</p>
      </div>
      <div class="product-name">
      <a href="productDetails.html"><p>${item.name}</p></a>
      </div>
      <div class="price-and-cart">
        <p class="product-price">$${item.price}</p>
        <i class="bi bi-cart-plus" onclick="addToCart(${item.id})"></i>
      </div>
      <div class="product-details-link">
      <a href="productDetails.html">More info</a>
      </div>
    </div>
      `;
  }
}

trendProductShow(products);

//add product to cart function
function addToCart(id) {
  let slectedItems = id;
  if (cart.some((item) => item.id === slectedItems.id)) {
    cart.forEach((product) => {
      product.numberOfitems++;
      calculate(product.numberOfitems);
    });
  } else {
    const item = products.find((product) => product.id === slectedItems.id);
    cart.push({
      ...item,
      numberOfitems: 1,
    });
  }
  update(slectedItems.id);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
//calculate the number of items in cart
function update(id) {
  let search = cart.find((item) => item.id === id);
  mainCartContainer.innerHTML = `
  <a href="cart.html"><i class="bi bi-cart"></i></a>
  <div class="product-qty">${search.item}</div>
  `;
  calculate();
}
//update to number of items in cart
function calculate() {
  let totalProductsinCart = 0;
  cart.forEach((product) => {
    totalProductsinCart += product.numberOfitems;
    mainCartContainer.innerHTML = `
        <a href="cart.html"><i class="bi bi-cart"></i></a>
        <div class="product-qty">${totalProductsinCart}</div>
        `;
  });
}
calculate();
