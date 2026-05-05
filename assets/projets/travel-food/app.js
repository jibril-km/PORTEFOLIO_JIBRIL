const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

const filterButtons = document.querySelectorAll("[data-filter-btn]");
const menuItems = document.querySelectorAll("[data-menu] [data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filterBtn;

    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    menuItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "grid";
      } else {
        item.style.display = "none";
      }
    });
  });
});

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (formStatus) {
      formStatus.textContent = "Envoi en cours...";
    }

    const submitButton = contactForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = "Merci ! Votre message a bien été envoyé.";
        }
      } else {
        if (formStatus) {
          formStatus.textContent = "Oups... Impossible d'envoyer. Réessayez ou appelez-nous.";
        }
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = "Oups... Problème de connexion. Réessayez ou appelez-nous.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
