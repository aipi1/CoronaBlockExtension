//calls function to change content on page(called every time page is loaded)
replaceText(document.body);

//waiting for message from popup.js, storing it in chrome.storage then refreshing the page to see changes made
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.i || request.r || request.d || request.t || request.p || request.covid || request.cv) {
      chrome.storage.local.set({i: request.i, r: request.r, d: request.d, t: request.t, 
                                p: request.p, covid: request.covid, cv: request.cv, pause: ''}, 
        function() {
          location.reload();
        });
    }
    else if (request.pause){
        chrome.storage.local.set({pause: 1}, 
        function() {
          location.reload();
        });
    }
  }
);

//function that takes values from chrome.storage then goes through every element on page by recursively calling itself
//and replaces text that matches patterns with values from html form
function replaceText(element){
  chrome.storage.local.get(["i", "r", "d", "t", "p", "covid", "cv", "pause"], 
    function(result) {
      if (!result.pause){
        if (element.hasChildNodes()) {
          element.childNodes.forEach(replaceText);
        } else if (element.nodeType === Text.TEXT_NODE) {
            if (element.textContent.match(/коронавирусом/gi) && result.t) {
              const newElement = document.createElement('span');
              newElement.innerHTML = element.textContent.replace(/коронавирусом/gi, result.t);
              if (newElement.textContent.match(/covid/gi) && result.covid){
                        newElement.innerHTML = newElement.textContent.replace(/(covid)/gi, result.covid);
                      }
              if (newElement.textContent.match(/coronavirus/gi) && result.cv){
                        newElement.innerHTML = newElement.textContent.replace(/(coronavirus)/gi, result.cv);
                      }
              element.replaceWith(newElement);
            } else if (element.textContent.match(/коронавируса/gi) && result.r) {
                const newElement = document.createElement('span');
                newElement.innerHTML = element.textContent.replace(/(коронавируса)/gi, result.r);
                if (newElement.textContent.match(/covid/gi) && result.covid){
                        newElement.innerHTML = newElement.textContent.replace(/(covid)/gi, result.covid);
                      }
                if (newElement.textContent.match(/coronavirus/gi) && result.cv){
                        newElement.innerHTML = newElement.textContent.replace(/(coronavirus)/gi, result.cv);
                      }
                element.replaceWith(newElement);
              } else if (element.textContent.match(/коронавирусу/gi) && result.d) {
                  const newElement = document.createElement('span');
                  newElement.innerHTML = element.textContent.replace(/(коронавирусу)/gi, result.d);
                  if (newElement.textContent.match(/covid/gi) && result.covid){
                        newElement.innerHTML = newElement.textContent.replace(/(covid)/gi, result.covid);
                      }
                  if (newElement.textContent.match(/coronavirus/gi) && result.cv){
                        newElement.innerHTML = newElement.textContent.replace(/(coronavirus)/gi, result.cv);
                      }
                  element.replaceWith(newElement);
                } else if (element.textContent.match(/(коронавирусе)/gi) && result.p) {
                    const newElement = document.createElement('span');
                    newElement.innerHTML = element.textContent.replace(/(коронавирусе)/gi, result.p);
                    if (newElement.textContent.match(/covid/gi) && result.covid){
                        newElement.innerHTML = newElement.textContent.replace(/(covid)/gi, result.covid);
                      }
                    if (newElement.textContent.match(/coronavirus/gi) && result.cv){
                        newElement.innerHTML = newElement.textContent.replace(/(coronavirus)/gi, result.cv);
                      }
                    element.replaceWith(newElement);
                  } else if (element.textContent.match(/коронавирус/gi) && result.i) {
                      const newElement = document.createElement('span');
                      newElement.innerHTML = element.textContent.replace(/(коронавирус)/gi, result.i);
                      if (newElement.textContent.match(/covid/gi) && result.covid){
                        newElement.innerHTML = newElement.textContent.replace(/(covid)/gi, result.covid);
                      }
                      if (newElement.textContent.match(/coronavirus/gi) && result.cv){
                        newElement.innerHTML = newElement.textContent.replace(/(coronavirus)/gi, result.cv);
                      }
                      element.replaceWith(newElement);
                    } else if (element.textContent.match(/covid/gi) && result.covid) {
                        const newElement = document.createElement('span');
                        newElement.innerHTML = element.textContent.replace(/(covid)/gi, result.covid);
                        if (newElement.textContent.match(/coronavirus/gi) && result.cv){
                          newElement.innerHTML = newElement.textContent.replace(/(coronavirus)/gi, result.cv);
                        }
                        element.replaceWith(newElement);
                        } else if (element.textContent.match(/coronavirus/gi) && result.cv) {
                            const newElement = document.createElement('span');
                            newElement.innerHTML = element.textContent.replace(/(coronavirus)/gi, result.cv);
                            element.replaceWith(newElement);
                          }
          }
      }  
    });
}
