const images = [
  { id: 1, src: "assets/images/image-product-1.jpg" },
  { id: 2, src: "assets/images/image-product-2.jpg" },
  { id: 3, src: "assets/images/image-product-3.jpg" },
  { id: 4, src: "assets/images/image-product-4.jpg" },
];

const menuIcon = document.querySelector(".menu-container");
const closeIcon = document.querySelector(".close-icon");
const navLinksContainer = document.querySelector(".nav-links-container");
const cartIcon = document.querySelector(".cart-icon-container");
const cartContainer = document.querySelector(".cart-container");
const cartItemsContainer = document.querySelector(".cart-items-container");
const mainImageContainer = document.querySelector(".main-image-container img");
const imagesModalContainer = document.querySelector(".images-modal");
const closeModalIcon = document.querySelector(".close-modal-icon");
const modalImage = document.querySelector(".images-modal .image-container img");
const modalNextButton = document.querySelector(".images-modal .next");
const modalPrevButton = document.querySelector(".images-modal .prev");

const thumbnailImagesContainer = document.querySelectorAll(
  ".thumbnail-image-container img"
);
const mobileImagesContainer = document.querySelector(
  ".mobile-images .image img"
);
const mobileImageNextButton = document.querySelector(".mobile-images .next");
const mobileImagePrevButton = document.querySelector(".mobile-images .prev");
const quantityControlEl = document.querySelector(".control .quantity p");
const increaseQuantityEl = document.querySelector(
  ".control .increase-quantity"
);
const decreaseQuantityEl = document.querySelector(
  ".control .decrease-quantity"
);
const addToCartBtn = document.querySelector(".add-to-cart");

// ========= CUSTOM VARIABLES ===========
const price = 125;
let mobileImagesCount = 0;
let inCart = false;
let quantity = 0;
let modalImageCount = 0;

// ========= FUNCTIONS ============
const openSidebar = () => {
  navLinksContainer.classList.add("open");
};
const closeSidebar = () => {
  navLinksContainer.classList.remove("open");
};
const toggleCartContainer = () => {
  cartContainer.classList.toggle("open");
};
const openModalImage = (image) => {
  modalImageCount = images.findIndex((data) => data.src === image);
  modalImage.src = images[modalImageCount].src;
  imagesModalContainer.classList.add("open");
};
const closeModalImage = () => {
  imagesModalContainer.classList.remove("open");
};
const updateModalImage = (actionType) => {
  if (actionType === "increase") {
    if (modalImageCount === images.length - 1) {
      modalImageCount = 0;
    } else {
      modalImageCount = modalImageCount + 1;
    }
  } else if (actionType === "decrease") {
    if (modalImageCount === 0) {
      modalImageCount = images.length - 1;
    } else {
      modalImageCount = modalImageCount - 1;
    }
  }
  modalImage.src = images[modalImageCount].src;
};
const changeMainImage = (e) => {
  const newImage = images.find((image) =>
    e.target.src
      .slice(0, e.target.src.indexOf(".jpg"))
      .includes(image.src.slice(0, image.src.indexOf(".jpg")))
  );
  mainImageContainer.src = newImage.src;
  e.target.classList.add("is-clicked");
  thumbnailImagesContainer.forEach((imgContainer) => {
    if (imgContainer !== e.target) {
      imgContainer.classList.remove("is-clicked");
    }
  });
};

const changeMobileImage = (count) => {
  mobileImagesContainer.src = images[count].src;
};

const increaseMobileImage = () => {
  if (mobileImagesCount === images.length - 1) {
    mobileImagesCount = 0;
  } else {
    mobileImagesCount = mobileImagesCount + 1;
  }
  changeMobileImage(mobileImagesCount);
};

const decreaseMobileImage = () => {
  if (mobileImagesCount === 0) {
    mobileImagesCount = images.length - 1;
  } else {
    mobileImagesCount = mobileImagesCount - 1;
  }
  changeMobileImage(mobileImagesCount);
};

const updateProductQuantity = (actionType) => {
  if (!addToCartBtn.disabled) {
    if (actionType === "increase") {
      quantity = quantity + 1;
    } else if (actionType === "decrease") {
      if (quantity !== 0) {
        quantity = quantity - 1;
      }
    }
    quantityControlEl.textContent = quantity;
  }
};
const updateButtonDisability = (type) => {
  if (type === true) {
    addToCartBtn.disabled = true;
    addToCartBtn.style.opacity = "0.85";
    addToCartBtn.textContent = "In Cart";
  }
  if (type === false) {
    addToCartBtn.disabled = false;
    addToCartBtn.style.opacity = 1;
    addToCartBtn.innerHTML = `
    <span>
      <img src="/assets/images/icon-cart-white.svg" alt="cart-icon" />
    </span>
    <p>Add to cart</p>
    `;
  }
};

const updateCartDisplay = (inCart) => {
  if (inCart) {
    cartContainer.classList.add("open");
    cartContainer.innerHTML = `
    <header>
    <h1>Cart</h1>
    </header>
    <div class="cart-items-container">
      <div class="cart-item">
        <div class="image-container">
          <img
            src="/assets/images/image-product-1-thumbnail.jpg"
            alt="cart-item"
          />
        </div>
        <div class="item-details">
          <h2>Fall Limited Edition Sneakers</h2>
          <p class="price">$${price} * ${quantity} <span>$${
      price * quantity
    }</span></p>
        </div>
        <div class="delete-icon">
          <img src="./assets/images/icon-delete.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="clear-cart-container">
      <button class="clear-cart">Checkout</button>
    </div>
    `;

    const clearCartButton = document.querySelector(".clear-cart");
    const deleteButton = document.querySelector(".delete-icon");
    clearCartButton.addEventListener("click", clearCart);
    deleteButton.addEventListener("click", deleteItem);
  } else {
    cartContainer.innerHTML = `
    <header>
      <h1>Cart</h1>
    </header>
    <div class="cart-items-container">
      
    </div>
    <div class="no-items">
        <p>Your cart is empty</p>
    </div>
    `;
  }
};
function clearCart() {
  quantity = 0;
  inCart = false;
  cartContainer.classList.remove("open");
  updateButtonDisability(false);
  updateProductQuantity();
  updateCartDisplay(inCart);
}

function deleteItem() {
  quantity = 0;
  inCart = false;
  updateButtonDisability(false);
  updateCartDisplay(inCart);
  updateProductQuantity();
}

const addItemToCart = () => {
  if (quantity !== 0) {
    inCart = true;
    addToCartBtn.disabled = true;
    updateButtonDisability(true);
    updateCartDisplay(inCart);
  }
};

// ========= EVENT LISTENERS ===========
menuIcon.addEventListener("click", openSidebar);
closeIcon.addEventListener("click", closeSidebar);
cartIcon.addEventListener("click", toggleCartContainer);
thumbnailImagesContainer.forEach((container) => {
  container.addEventListener("click", changeMainImage);
});
mobileImageNextButton.addEventListener("click", increaseMobileImage);
mobileImagePrevButton.addEventListener("click", decreaseMobileImage);
increaseQuantityEl.addEventListener("click", () => {
  updateProductQuantity("increase");
});
decreaseQuantityEl.addEventListener("click", () => {
  updateProductQuantity("decrease");
});
addToCartBtn.addEventListener("click", addItemToCart);
mainImageContainer.addEventListener("click", (e) => {
  const image = e.target.src.slice(e.target.src.indexOf("assets"));
  openModalImage(image);
});
closeModalIcon.addEventListener("click", () => {
  closeModalImage();
});
modalNextButton.addEventListener("click", () => {
  updateModalImage("increase");
});
modalPrevButton.addEventListener("click", () => {
  updateModalImage("decrease");
});
window.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay(false);
});
