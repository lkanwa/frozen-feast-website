// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  if (navLinks.classList.contains("show")) {
    menuToggle.textContent = "✕";
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

// Close mobile menu after clicking a link
const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Footer year
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();


// Truck image slideshow
const truckSlides = document.querySelectorAll(".truck-slider .slide");
let currentTruckSlide = 0;

function showNextTruckSlide() {
  if (truckSlides.length === 0) return;

  truckSlides[currentTruckSlide].classList.remove("active-slide");

  currentTruckSlide = (currentTruckSlide + 1) % truckSlides.length;

  truckSlides[currentTruckSlide].classList.add("active-slide");
}

setInterval(showNextTruckSlide, 2000);


// Food image popup with multiple images
const imageModal = document.getElementById("imageModal");
const modalTitle = document.getElementById("modalTitle");
const modalImageGrid = document.getElementById("modalImageGrid");
const modalClose = document.getElementById("modalClose");

function openFoodModal(card) {
  const title = card.getAttribute("data-title");
  const images = card.getAttribute("data-images").split("|");

  modalTitle.textContent = title;
  modalImageGrid.innerHTML = "";

  images.forEach((imageSrc) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = title;
    modalImageGrid.appendChild(img);
  });

  imageModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeFoodModal() {
  imageModal.classList.remove("show");
  modalTitle.textContent = "";
  modalImageGrid.innerHTML = "";
  document.body.style.overflow = "auto";
}

// Dessert cards popup
const clickableCards = document.querySelectorAll(".clickable-card");

clickableCards.forEach((card) => {
  card.addEventListener("click", () => {
    openFoodModal(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFoodModal(card);
    }
  });
});

// Gallery cards popup
const zoomGalleryCards = document.querySelectorAll(".zoom-gallery-card");

zoomGalleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    openFoodModal(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFoodModal(card);
    }
  });
});

// Close popup
modalClose.addEventListener("click", closeFoodModal);

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeFoodModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.classList.contains("show")) {
    closeFoodModal();
  }
});


// Booking request form using Formspree
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your real Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdnnkbg";

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);

  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const email = formData.get("email").trim();
  const requestType = formData.get("requestType");
  const packageChoice = formData.get("package");
  const eventDate = formData.get("eventDate");
  const guestCount = formData.get("guestCount");
  const eventLocation = formData.get("eventLocation").trim();

  if (
    !name ||
    !phone ||
    !email ||
    !requestType ||
    !packageChoice ||
    !eventDate ||
    !guestCount ||
    !eventLocation
  ) {
    formStatus.textContent = "Please fill out all required fields.";
    formStatus.className = "form-status error";
    return;
  }

  formData.append("_subject", `Frozen Feast ${requestType} Request - ${packageChoice}`);

  formStatus.textContent = "Sending your request...";
  formStatus.className = "form-status";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      formStatus.textContent =
        "Thank you! Your request was sent successfully. Frozen Feast will contact you soon.";
      formStatus.className = "form-status success";
      bookingForm.reset();
    } else {
      formStatus.textContent =
        "Something went wrong. Please try again or contact Frozen Feast directly.";
      formStatus.className = "form-status error";
    }
  } catch (error) {
    formStatus.textContent =
      "There was a problem sending your request. Please check your internet connection and try again.";
    formStatus.className = "form-status error";
  }
});