document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const links = document.querySelectorAll("nav a");

  function showPage(hash) {
    pages.forEach((page) => page.classList.remove("active"));
    const target = document.querySelector(hash || "#home");
    if (target) target.classList.add("active");
  }

  window.addEventListener("hashchange", () => {
    showPage(location.hash);
  });

  // Initial load
  showPage(location.hash || "#home");

  // Upload widget
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const uploadResult = document.getElementById("uploadResult");

  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      uploadResult.textContent = "Uploading...";

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        uploadResult.innerHTML = `
          ✅ Uploaded: <a href="${data.url}" target="_blank">${data.url}</a>
        `;
      } catch (err) {
        uploadResult.textContent = "❌ Upload error: " + err.message;
      }
    });
  }
});
