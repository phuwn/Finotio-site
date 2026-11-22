(() => {
  const supportedLanguages = new Set(["en", "vi"]);
  const parameters = new URLSearchParams(window.location.search);
  const requestedLanguage = parameters.get("lang");
  const browserLanguage = navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
  const initialLanguage = supportedLanguages.has(requestedLanguage)
    ? requestedLanguage
    : browserLanguage;

  const applyLanguage = (language, updateURL) => {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-copy]").forEach((element) => {
      element.hidden = element.dataset.copy !== language;
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    document.querySelectorAll("a[href]").forEach((anchor) => {
      const url = new URL(anchor.href, window.location.href);
      if (url.origin === window.location.origin) {
        url.searchParams.set("lang", language);
        anchor.href = url;
      }
    });

    if (updateURL) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      window.history.replaceState({}, "", url);
    }
  };

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language, true));
  });

  applyLanguage(initialLanguage, false);
})();
