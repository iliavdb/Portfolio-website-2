const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const dolphinCelebration = document.querySelector("#dolphin-celebration");

let language = "nl";

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-nl][data-en]").forEach((element) => {
    element.innerHTML = element.dataset[language];
  });

  document.querySelectorAll("[data-placeholder-nl][data-placeholder-en]").forEach((element) => {
    element.placeholder = language === "nl" ? element.dataset.placeholderNl : element.dataset.placeholderEn;
  });

  languageToggle.innerHTML = language === "nl" ? 'EN <span>↗</span>' : 'NL <span>↗</span>';
  languageToggle.setAttribute("aria-label", language === "nl" ? "Switch language to English" : "Wissel naar Nederlands");
  document.title = language === "nl"
    ? "Ilia Esmahilzade — Software Developer"
    : "Ilia Esmahilzade — Software Developer";
}

languageToggle.addEventListener("click", () => {
  setLanguage(language === "nl" ? "en" : "nl");
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.querySelector(".sr-only").textContent = isExpanded
    ? (language === "nl" ? "Menu openen" : "Open menu")
    : (language === "nl" ? "Menu sluiten" : "Close menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formNote.textContent = language === "nl" ? "Bezig met versturen..." : "Sending...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    const result = await response.json();

    if (!response.ok || (result.success !== "true" && result.success !== true)) {
      throw new Error(result.message || "The form service rejected the submission.");
    }

    formNote.textContent = language === "nl"
      ? "Bericht Is Verzonden"
      : "Thanks! Your message has been sent.";
    contactForm.reset();
    dolphinCelebration.hidden = false;
  } catch (error) {
    console.error("Contact form submission failed:", error);
    formNote.textContent = language === "nl"
      ? "Versturen is niet gelukt. Probeer het opnieuw of mail me rechtstreeks."
      : "Your message could not be sent. Please try again or email me directly.";
  } finally {
    submitButton.disabled = false;
  }
});

dolphinCelebration.addEventListener("animationend", () => {
  dolphinCelebration.hidden = true;
});

document.querySelector("#year").textContent = new Date().getFullYear();
