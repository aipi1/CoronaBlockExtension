//waiting for button in html form to be pressed 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button1").addEventListener("click", popup);
    document.getElementById("button2").addEventListener("click", pause);
});

//takes values from html form and sends them to content script
function popup() {
    document.getElementById("howto").style.display = "none";
    chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs){
            var activeTab = tabs[0];
            let i = document.getElementById("i").value;
            let r = document.getElementById("r").value;
            let d = document.getElementById("d").value;
            let t = document.getElementById("t").value;
            let p = document.getElementById("p").value;
            let covid = document.getElementById("covid").value;
            let cv = document.getElementById("cv").value;
            if (i || r || d || t || p || covid || cv){
                document.getElementById("tryagain").style.display = "none";
                document.getElementById("done").style.display = "block";
                chrome.browserAction.setIcon({path: {"32": "../icons/icon32.png"}});
            }else{
                document.getElementById("done").style.display = "none";
                document.getElementById("tryagain").style.display = "block";
            }
            //sends message to content script (script.js)
            chrome.tabs.sendMessage(activeTab.id, {"i": i, "r": r, "d": d, "t": t, "p": p, "covid": covid, "cv": cv});
        });
}

//pauses replacing activity
function pause() {
    document.getElementById("howto").style.display = "none";
    document.getElementById("tryagain").style.display = "none";
    chrome.tabs.query({currentWindow: true, active: true}, 
        function (tabs){
            var activeTab = tabs[0];
            document.getElementById("done").style.display = "block";
            chrome.browserAction.setIcon({path: {"32": "../icons/iconOff32.png"}});
            //sends message to content script (script.js)
            chrome.tabs.sendMessage(activeTab.id, {"pause": 1});
        });
}
