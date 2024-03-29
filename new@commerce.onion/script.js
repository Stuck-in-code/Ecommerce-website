if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  // cart icon toggle
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", () => {
    document.querySelector(".cart-page").style.transform = "translateX(0px)";
    setTimeout(() => {
      document.querySelector(".cart-header").innerText = "cart page";

      setTimeout(() => {
        document.querySelector(".cart-container").style.opacity = "1";
        document.querySelector(".cart-total").style.display = "block";
        document.querySelector(".purchase").style.display = "block";

        setTimeout(() => {
          const span1 = document.querySelector(".span1");
          const span2 = document.querySelector(".span2");

          span1.style.transform = "rotate(50deg)";
          span2.style.transform = "rotate(-50deg)";
          span1.style.backgroundColor = "black";
          span2.style.backgroundColor = "black";
        }, 500);
      }, 500);
    }, 800);
  });

  // LIST TOOGLE
  const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
  toggleBtn.addEventListener("click", toggleFn);

  function toggleFn() {
    let listItem = document.getElementsByClassName("list-items")[0];
    listItem.classList.toggle("display-list");
  }

  let closeDiv = document.getElementsByClassName("cart-closure")[0];
  closeDiv.addEventListener("click", () => {
    const span1 = document.querySelector(".span1");
    const span2 = document.querySelector(".span2");
    span1.style.backgroundColor = "orange";
    span2.style.backgroundColor = "orange";

    span1.style.transform = "rotate(0deg)";
    span2.style.transform = "rotate(0deg)";

    setTimeout(() => {
      document.querySelector(".cart-header").innerText = "cart closed";

      setTimeout(() => {
        document.querySelector(".cart-container").style.opacity = "0";
        document.querySelector(".cart-total").style.display = "none";
        document.querySelector(".purchase").style.display = "none";

        setTimeout(() => {
          document.querySelector(".cart-page").style.transform =
            "translateX(700px)";
        }, 500);
      }, 500);
    }, 800);
  });

  const displayImage = document.querySelector(".display-image");
  const featuredInfo = document.querySelector(".featured-info");
  const hotSaleImage = document.querySelectorAll(".hot-sale-image");

  for (var i = 0; i < hotSaleImage.length; i++) {
    hotSaleImage[i].addEventListener("click", (event) => {
      displayImage.src = event.target.src;

      const parent = event.target.parentElement;
      const title = parent.querySelector(".sales-title").innerText;
      document.getElementsByClassName("featured-title")[0].innerText = title;

      const price = parent.querySelector(".sales-price").innerText;
      document.getElementsByClassName("featured-price")[0].innerText = price;
    });
  }

  // DELETE CARTS FUNCTION

  let buttons = document.getElementsByClassName("delete-btn");
  for (var i = 0; i < buttons.length; i++) {
    let theButton = buttons[i];
    theButton.addEventListener("click", deleteCartFn);
  }

  // QUANTITY CHANGED FN
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  let cartRow = cartContainer.getElementsByClassName("cart-row");
  for (let i = 0; i < cartRow.length; i++) {
    const currentRow = cartRow[i];
    const quantityInput =
      currentRow.getElementsByClassName("cart-item-quantity")[0];
    quantityInput.addEventListener("change", quantityChangedFn);
  }

  // ADD TO CART FN
  const addToCart = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", addToCartFn);
  }
}

function deleteCartFn(event) {
  event.target.parentElement.remove();
  updateTotal();
  cartCountFn();
}

// CART QUANTITY CHANGED
function quantityChangedFn(event) {
  let actualQuantity = event.target;
  if (actualQuantity.value < 1) {
    event.target.value = 1;
  }
  updateTotal();
}

// UPDATE CART TOTAL FUNCTION

function updateTotal() {
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  let cartRow = cartContainer.getElementsByClassName("cart-row");
  let total = 0;

  for (var i = 0; i < cartRow.length; i++) {
    let currentRow = cartRow[i];
    let cartPrice = currentRow.getElementsByClassName("cart-item-price")[0];
    let cartQuantity =
      currentRow.getElementsByClassName("cart-item-quantity")[0];

    let actualPrice = parseFloat(cartPrice.innerText.replace("$", ""));
    let actualQuantity = cartQuantity.value;
    total += Math.round(actualPrice * actualQuantity);
  }
  document.getElementsByClassName("total-amount")[0].innerText = "$" + total;
}
updateTotal();

// ADD TO CARTS

function addToCartFn(event) {
  const addCartBtn = event.target;
  const productWrapper = event.target.parentElement;
  const productImage =
    productWrapper.getElementsByClassName("procuct-image")[0].src;
  const productPrice =
    productWrapper.getElementsByClassName("price")[0].innerText;
  const productTitle =
    productWrapper.getElementsByClassName("title")[0].innerText;

  createNewCart(productImage, productPrice, productTitle);
  updateTotal();
}

const createNewCart = (productImage, productPrice, productTitle) => {
  const newCartRow = document.createElement("div");

  let cartContainer = document.getElementsByClassName("cart-container")[0];
  let cartRow = cartContainer.getElementsByClassName("cart-row");
  for (var i = 0; i < cartRow.length; i++) {
    let currentItem = cartRow[i];
    let currentTitle =
      currentItem.getElementsByClassName("cart-item-title")[0].innerText;
    if (currentTitle === productTitle) {
      alert("this item has alredy been added to cart");
      return;
    }
  }
  const cartRowContent = `
  <img
    class="cart-img"
    src=${productImage}
    alt="cart image"
  />
  <h3 class="cart-item-title">${productTitle}</h3>
  <input type="number" value="1" class="cart-item-quantity" />
  <p class="cart-item-price">${productPrice}</p>
  <button class="delete-btn">Remove</button>
`;
  newCartRow.innerHTML = cartRowContent;
  newCartRow.classList.add("cart-row");
  cartContainer.append(newCartRow);

  let theDeleteBtn = newCartRow.getElementsByClassName("delete-btn");
  for (var i = 0; i < theDeleteBtn.length; i++) {
    theDeleteBtn[i].addEventListener("click", deleteCartFn);
  }

  let theQuantityInput =
    newCartRow.getElementsByClassName("cart-item-quantity");
  for (var i = 0; i < theQuantityInput.length; i++) {
    theQuantityInput[i].addEventListener("change", quantityChangedFn);
  }

  cartCountFn();
};

const purchaseBtn = document.querySelector(".purchase");
purchaseBtn.addEventListener("click", () => {
  alert("thanks for shopping with us");
  const cartBox = document.querySelector(".cart-container");

  while (cartBox.hasChildNodes) {
    cartBox.removeChild(cartBox.firstChild);
    updateTotal();
    cartCountFn();
  }
  updateTotal();
});

const cartCountFn = () => {
  let classNameIs = document.getElementsByClassName("cart-row");
  document.querySelector(".cart-link").innerText = classNameIs.length;
};

const sendBtn = document.querySelector(".send-btn");
sendBtn.addEventListener("click", () => {
  const mailInput = document.getElementById("mail-field");

  if (mailInput.value !== "") {
    alert("mail sent successfully");
    mailInput.value = "";
  } else {
    alert("please enter a text");
  }
});
