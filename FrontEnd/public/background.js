chrome.action.onClicked.addListener(tab => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            alert("this is a test in ResumeRocket Extension, not sure what function that I should implement for now");
        }
    });
});