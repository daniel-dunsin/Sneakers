const images = [
  { id: 1, src: "/assets/images/image-product-1.jpg" },
  { id: 2, src: "/assets/images/image-product-2.jpg" },
  { id: 3, src: "/assets/images/image-product-3.jpg" },
  { id: 4, src: "/assets/images/image-product-4.jpg" },
];

const menuIcon = document.querySelector(".menu-container");
const closeIcon = document.querySelector(".close-icon");
const navLinksContainer = document.querySelector(".nav-links-container");
const cartIcon = document.querySelector(".cart-icon-container");
const cartContainer = document.querySelector(".cart-container");
const mainImageContainer = document.querySelector(".main-image-container img");
const thumbnailImagesContainer = document.querySelectorAll(
  ".thumbnail-image-container img"
);
const mobileImagesContainer = document.querySelector(
  ".mobile-images .image img"
);
const mobileImageNextButton = document.querySelector(".mobile-images .next");
const mobileImagePrevButton = document.querySelector(".mobile-images .prev");

console.log(
  mobileImageNextButton,
  mobileImagePrevButton,
  mobileImagesContainer
);

// ========= CUSTOM VARIABLES ===========
let mobileImagesCount = 0;

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
const changeMainImage = (e) => {
  const newImage = e.target.src.split("-").slice(0, 3).join("-") + ".jpg";
  mainImageContainer.src = newImage;
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

// ========= EVENT LISTENERS ===========
menuIcon.addEventListener("click", openSidebar);
closeIcon.addEventListener("click", closeSidebar);
cartIcon.addEventListener("click", toggleCartContainer);
thumbnailImagesContainer.forEach((container) => {
  container.addEventListener("click", changeMainImage);
});
mobileImageNextButton.addEventListener("click", increaseMobileImage);
mobileImagePrevButton.addEventListener("click", decreaseMobileImage);
