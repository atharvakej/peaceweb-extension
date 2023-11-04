const filter = {
  url: [{ urlMatches: "<all_urls>" }],
};

chrome.webNavigation.onCompleted.addListener(() => {
  console.log("website checked");
}, filter);
