const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

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

  if (formNote.textContent) {
    formNote.textContent = language === "nl"
      ? "Je e-mailprogramma wordt geopend met je bericht."
      : "Your email app will open with your message.";
  }
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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();
  const subject = encodeURIComponent(`Portfolio contact — ${name}`);
  const body = encodeURIComponent(`${message}\n\n${language === "nl" ? "Bericht van" : "Message from"}: ${name}\n${email}`);

  formNote.textContent = language === "nl"
    ? "Je e-mailprogramma wordt geopend met je bericht."
    : "Your email app will open with your message.";
  window.location.href = `mailto:Iliaesmahilzade3@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
