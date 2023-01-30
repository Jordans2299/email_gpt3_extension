const insertOnPage = (content) => {
    //const element = document.getElementById(":sa");
    //const remove = element.childNodes[0];
    const elements = document.getElementsByClassName('Am Al editable LW-avf tS-tW');
    if(elements.length==0){
        return;
    }
    const element = elements[0];
    console.log(element)
    const remove = element.childNodes[0];
    remove.remove();
    // Split content by \n
    const splitContent = content.split('\n');
    // Wrap in p tags
    splitContent.forEach((content) => {
        const p = document.createElement('p');

        if (content === '') {
            const br = document.createElement('br');
            p.appendChild(br);
        } else {
            p.textContent = content;
        }
        // Insert into HTML one at a time
        element.appendChild(p);
    });
    return true;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
        const { content } = request;

        const result = insertOnPage(content);
        if (!result) {
            sendResponse({ status: "failed" });
        }

        sendResponse({ status: 'success' });
    }
});

