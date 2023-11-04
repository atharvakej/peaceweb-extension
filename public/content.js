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

const getData = async (text) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: JSON.stringify({
        text1: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const showOverlay = async () => {
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
    const overlayHTMLWarning = `
    <div class="overlay-content" >
      <h1>Peace Web</h1>
      <div class="overlay-warning" >
        <img src="https://img.icons8.com/ios-filled/100/FA5252/error--v1.png" alt="" />
        <p>Abusive language found</p>
      </div>
    </div>
    `;
    overlay.innerHTML = overlayHTML;
    // overlay.innerHTML = "<p>Checking for any foul content...</p>";
    // const loadingMessage = overlay.querySelector("p");
    // loadingMessage.classList.add("overlay-content");

    const rootElement = document.body;
    const visibleText = extractVisibleText(rootElement);
    const res = await getData(visibleText);
    console.log(res, "res");
    if (res?.prediction === "1") overlay.innerHTML = overlayHTMLWarning;
    else document.body.removeChild(overlay);

    // const pageHTML = document.documentElement.outerHTML;
    // console.log(pageHTML);
  }
};

document.addEventListener("DOMContentLoaded", showOverlay);
