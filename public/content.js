function extractVisibleText(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    // This node is a text node, return its text content
    return element.textContent;
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    if (isHidden(element)) {
      // Skip hidden elements (e.g., display: none)
      return "";
    }

    // This node is an element node, traverse its child nodes
    let text = "";
    for (let child of element.childNodes) {
      text += extractVisibleText(child);
    }
    return text;
  } else {
    // Unsupported node type, return an empty string
    return "";
  }
}

function isHidden(element) {
  const style = getComputedStyle(element);
  return style.display === "none" || style.visibility === "hidden";
}

const getData = async () => {
  try {
    const res = "";
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  if (body) {
    body.style.display = "block";
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const overlayHTML = `
    <div class="overlay-content">
      <h1>Peace Web</h1>
      <p>Searching the website ${window.location.hostname} for any profanity</p>
      <div class="loader"></div>
    </div>
    `;
    overlay.innerHTML = overlayHTML;
    // overlay.innerHTML = "<p>Checking for any foul content...</p>";
    // const loadingMessage = overlay.querySelector("p");
    // loadingMessage.classList.add("overlay-content");

    const rootElement = document.body;
    const visibleText = extractVisibleText(rootElement);
    console.log(visibleText);

    // const pageHTML = document.documentElement.outerHTML;
    // console.log(pageHTML);
  }
});
