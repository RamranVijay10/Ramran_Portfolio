// ...existing code...
const resumeTab = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTab.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

const resumeTabNav = function (resumeTabClick) {
  resumeTabContents.forEach((resumeTabContent, i) => {
    const isActive = i === resumeTabClick;
    resumeTabContent.style.display = isActive ? "flex" : "none";
    resumeTabContent.classList.toggle("active", isActive);
  });

  resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
    resumePortfolioTabBtn.classList.toggle("active", i === resumeTabClick);
  });
};

resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
  resumePortfolioTabBtn.addEventListener("click", () => {
    resumeTabNav(i);
  });
});

resumeTabNav(0);

// Service

const serviceCards = document.querySelectorAll(
  ".service-container .card-with-modal",
);

serviceCards.forEach((card) => {
  const serviceCard = card.querySelector(".service-card");
  const backdrop = card.querySelector(".service-modal-backdrop");
  const modal = card.querySelector(".service-modal");
  const closeButton = card.querySelector(".modal-close-btn");

  serviceCard.addEventListener("click", () => {
    backdrop.style.display = "flex";

    setTimeout(() => {
      backdrop.classList.toggle("active");
      modal.classList.toggle("active");
    }, 100);
  });

  closeButton.addEventListener("click", () => {
    backdrop.classList.toggle("active");
    modal.classList.toggle("active");

    setTimeout(() => {
      backdrop.style.display = "none";
    }, 500);
  });
});

// Portfolio

document.addEventListener("DOMContentLoaded", () => {
  const portfolioTabs = document.querySelector(".portfolio-tabs");
  const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
  const cardModals = document.querySelectorAll(
    ".portfolio-container .card-with-modal",
  );

  // Portfolio tab filtering — collapse hidden items so no gaps remain
  portfolioTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const filter = tabBtn.getAttribute("data-filter");

      cardModals.forEach((cardModal) => {
        if (filter === "all" || cardModal.classList.contains(filter)) {
          cardModal.style.display = "";
          setTimeout(() => {
            cardModal.style.opacity = "1";
          }, 10);
        } else {
          cardModal.style.opacity = "0";
          setTimeout(() => {
            cardModal.style.display = "none";
          }, 300);
        }
      });

      portfolioTabBtns.forEach((btn) => btn.classList.remove("active"));
      tabBtn.classList.add("active");
    });
  });

  // open / close portfolio modals
  cardModals.forEach((portfolioCardWithModal) => {
    const portfolioCard = portfolioCardWithModal.querySelector(".portfolio-card");
    const portfolioBackdrop = portfolioCardWithModal.querySelector(
      ".portfolio-modal-backdrop",
    );
    const portfolioModal =
      portfolioCardWithModal.querySelector(".portfolio-modal");
    const modalCloseBtn =
      portfolioCardWithModal.querySelector(".modal-close-btn");

    portfolioCard.addEventListener("click", () => {
      portfolioBackdrop.style.display = "flex";

      setTimeout(() => {
        portfolioBackdrop.classList.add("active");
        portfolioModal.classList.add("active");
      }, 10);
    });

    // Close on X button
    modalCloseBtn.addEventListener("click", () => {
      portfolioBackdrop.classList.remove("active");
      portfolioModal.classList.remove("active");

      setTimeout(() => {
        portfolioBackdrop.style.display = "none";
      }, 400);
    });

    // Close on backdrop click (outside modal)
    portfolioBackdrop.addEventListener("click", (e) => {
      if (e.target === portfolioBackdrop) {
        portfolioBackdrop.classList.remove("active");
        portfolioModal.classList.remove("active");

        setTimeout(() => {
          portfolioBackdrop.style.display = "none";
        }, 400);
      }
    });
  });
});

// Testimonials swiper (only runs if the swiper element exists)
if (document.querySelector(".mySwiper")) {
  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Send/Receive E-mails by Contact Form

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "e5ihPtTtuQ4-YIRfu",
  });
})();

const contactForm = document.getElementById("contact-form");
const contactFromAlert = document.querySelector(".contact-form-alert");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // these IDs from the previous steps
  emailjs
    .sendForm("service_199c6lb", "template_7kgv3xq", "#contact-form", this)
    .then(
      () => {
        // console.log("SUCCESS!");
        contactFromAlert.innerHTML =
          " <span>Your message sent successfully</span><i class='ri-checkbox-circle-fill'></i>";
        contactForm.reset();
        setTimeout(() => {
          contactFromAlert.innerHTML = "";
        }, 5000);
      },
      (error) => {
        // console.log("FAILED...", error);
        contactFromAlert.innerHTML =
          "<span>Message not sent</span><i class='ri-error-warning-fill'></i>";
        contactFromAlert.title = error;
      },
    );
});

// shrink the height of header when scrolling down
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  header.classList.toggle("shrink", window.scrollY > 0);
});

// Keep the bottom navigation highlight in sync with clicks and scrolling.
document.querySelectorAll(".bottom-nav .menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".bottom-nav .menu a").forEach((item) => {
      item.classList.toggle("current", item === link);
    });
  });
});

// navigation highlight on scroll

window.addEventListener("scroll", () => {
  const navMenuSection = document.querySelectorAll(
    ".nav-menu, .nav-menu-section",
  );
  const scrollY = window.pageYOffset;

  navMenuSection.forEach((navMenuSection) => {
    let sectionId = navMenuSection.getAttribute("id");
    let sectionTop = navMenuSection.offsetTop - 50;
    let sectionHeight = navMenuSection.offsetHeight;
    const link = document.querySelector(
      `.bottom-nav .menu a[href="#${sectionId}"]`,
    );

    if (link) {
      link.classList.toggle(
        "current",
        scrollY >= sectionTop && scrollY < sectionTop + sectionHeight,
      );
    }
  });
});

// javascript to show/hide bottom navigation menu on home page when scrolling down/up
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
let scrollStopTimeOut;
let navTimeOut;

window.addEventListener("scroll", () => {
  clearTimeout(scrollStopTimeOut);
  clearTimeout(navTimeOut);

  // while scrolling: hide the bottom nav and the show button
  bottomNav.classList.remove("active");
  menuShowBtn.classList.remove("active");
  menuHideBtn.classList.toggle("active", window.scrollY >= 10);

  // when scrolling stops (150ms with no scroll event): show the bottom nav
  scrollStopTimeOut = setTimeout(() => {
    bottomNav.classList.add("active");

    // after 4 seconds: hide the bottom nav and show the menu show button
    navTimeOut = setTimeout(() => {
      if (window.scrollY >= 10) {
        bottomNav.classList.remove("active");
        menuShowBtn.classList.add("active");
      }
    }, 4000);
  }, 150);
});

menuShowBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  // cancel pending scroll timers so they don't hide the nav again
  clearTimeout(scrollStopTimeOut);
  clearTimeout(navTimeOut);

  // open: show nav + close button, hide the show button
  bottomNav.classList.add("active");
  menuHideBtn.classList.add("active");
  menuShowBtn.classList.remove("active");
});

menuHideBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  clearTimeout(scrollStopTimeOut);
  clearTimeout(navTimeOut);

  // close: hide nav + close button, show the show button
  bottomNav.classList.remove("active");
  menuHideBtn.classList.remove("active");
  menuShowBtn.classList.add("active");
});

// To-top-button with scroll indicator bar

window.addEventListener("scroll", () => {
  const toTopBtn = document.querySelector(".to-top-btn");

  toTopBtn.classList.toggle("active", window.scrollY > 0);

  const scrollIndicatorBar = document.querySelector(".scroll-indicatior-bar");
  const pageScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollValue = (pageScroll / scrollHeight) * 100;

  scrollIndicatorBar.style.height = scrollValue + "%";
});

// customize cursor
const cursor = document.querySelector(".cursor");
const cursorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = cursor.querySelector(".cursor-circle");
let pointerX = 0;
let pointerY = 0;
let circleX = 0;
let circleY = 0;
let cursorAnimationFrame;

const updateCursorPosition = () => {
  if (cursorCircle.style.display === "none") {
    circleX = pointerX;
    circleY = pointerY;
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;
    cursorDot.style.left = `${pointerX}px`;
    cursorDot.style.top = `${pointerY}px`;
    cursorAnimationFrame = undefined;
    return;
  }

  const offsetX = pointerX - circleX;
  const offsetY = pointerY - circleY;
  const distance = Math.hypot(offsetX, offsetY);
  const maxDotOffset = 9;
  const lead = Math.min(distance, maxDotOffset);
  const leadRatio = distance ? lead / distance : 0;

  circleX += offsetX * 0.18;
  circleY += offsetY * 0.18;
  cursorCircle.style.left = `${circleX}px`;
  cursorCircle.style.top = `${circleY}px`;

  cursorDot.style.left = `${circleX + offsetX * leadRatio}px`;
  cursorDot.style.top = `${circleY + offsetY * leadRatio}px`;

  if (distance > 0.1) {
    cursorAnimationFrame = requestAnimationFrame(updateCursorPosition);
  } else {
    cursorAnimationFrame = undefined;
  }
};

const interactiveElements = document.querySelectorAll(
  "a, button, .theme-btn, .main-btn, .menu-hide-btn, .social-links a, .project-card, .skill, .contact-form input, .contact-form textarea",
);

document.addEventListener("mousemove", (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;

  if (cursorCircle.style.display === "none") {
    circleX = pointerX;
    circleY = pointerY;
  }

  if (cursorAnimationFrame === undefined) {
    cursorAnimationFrame = requestAnimationFrame(updateCursorPosition);
  }
});

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

window.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

window.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

// Cursour effect on the hover of the interactive elements

const cursorHoverLink = document.querySelectorAll(
  "a, button, .theme-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .service-card, .contact-social-links li, .contact-form, .submit-btn, .menu-hide-btn, .menu-show-btn",
);

cursorHoverLink.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorDot.classList.add("large");
    cursorCircle.style.display = "none";
  });

  element.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("large");
    cursorCircle.style.display = "";
  });
});



// change the theme of the website and save the preference in local storage
const themeBtn = document.querySelector(".theme-btn");
const savedTheme = localStorage.getItem("theme");
const isLightTheme = savedTheme === "light-theme";

document.body.classList.toggle("light-theme", isLightTheme);
themeBtn.classList.toggle("active-sun-icon", isLightTheme);

themeBtn.addEventListener("click", () => {
  const isLightTheme = document.body.classList.toggle("light-theme");
  themeBtn.classList.toggle("active-sun-icon", isLightTheme);
  localStorage.setItem("theme", isLightTheme ? "light-theme" : "dark-theme");
});


