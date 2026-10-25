/* Loads reusable footer fragments into elements marked with data-footer-include.
   Example: <div data-footer-include="/includes/footer-social.html"></div> */
(() => {
  const loadFragment = async (placeholder) => {
    const path = placeholder.getAttribute("data-footer-include");
    if (!path) return;

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
      placeholder.innerHTML = await response.text();
      placeholder.removeAttribute("data-footer-include");
    } catch (error) {
      console.error("The Postcard Edit footer:", error);
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const placeholders = [...document.querySelectorAll("[data-footer-include]")];
    await Promise.all(placeholders.map(loadFragment));

    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = new Date().getFullYear();
    });

    // Load the existing random-posts script after its container is inserted.
    if (document.querySelector("#random-posts")) {
      const script = document.createElement("script");
      script.src = "/js/random-posts.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  });
})();
