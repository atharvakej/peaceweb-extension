// const headings = document.querySelectorAll("span");

// headings.forEach((heading) => {
//   heading.textContent = "MODIFIED!!!!!!!!";
// });
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  if (body) {
    body.style.display = "block";
    const overlay = document.createElement("div");
    overlay.id = "myOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "9999";
    overlay.style.display = "block";
    document.body.appendChild(overlay);
    console.log("overlayed");
  }
});
