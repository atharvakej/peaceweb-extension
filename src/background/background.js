const filter = {
  url: [{ urlMatches: "https://www.google.com/" }],
};

chrome.webNavigation.onCompleted.addListener(() => {
  console.log("website checked");
}, filter);
