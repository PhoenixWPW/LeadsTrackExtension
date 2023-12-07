const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.querySelector("#ul-el");
const tabBtn = document.querySelector("#tab-btn");
let myLeads = []

const https = text => (!text.startsWith("https://") && !text.startsWith("http://")) ? `https://${text}` : text;

// function saveToLocalStorage(array, key) {
//     arrayFromLocalStorage = JSON.stringify(array)
//     localStorage.setItem(key, arrayFromLocalStorage)
// }
// function render(leads) {
//     const fragment = document.createDocumentFragment();
//     for (i = 0; i < leads.length; i++) {
//         let lead = leads[i];
//         const li = document.createElement("li");
//         const a = document.createElement("a")
//         a.textContent = lead;
//         a.href = https(lead)
//         a.target = `_blank`
//         li.appendChild(a)
//         fragment.appendChild(li)
//     }
//     ulEl.textContent = ""
//     ulEl.appendChild(fragment)
// }

const render = leads => {
    const fragment = document.createDocumentFragment();
    leads.forEach( lead => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = lead;
        a.href = https(lead);
        a.target = `_blank`
        li.appendChild(a);
        fragment.appendChild(li);
    })
    ulEl.textContent = ""
    ulEl.appendChild(fragment)
}

const saveToLocalStorage = (array, key) => localStorage.setItem(key, JSON.stringify(array))

if (localStorage.getItem("myLeads")) {
    myLeads = JSON.parse(localStorage.getItem("myLeads"))
}
render(myLeads)

// tabBtn.addEventListener("click", function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         myLeads.push(tabs[0].url);
//         saveToLocalStorage(myLeads, "myLeads");
//         render(myLeads)
//     })
// })

tabBtn.addEventListener("click", ()=>{
    chrome.tabs.query(
        {active: true, currentWindow: true},
        tabs => {
            myLeads.push(tabs[0].url);
            saveToLocalStorage(myLeads, "myLeads");
            render(myLeads);
        })
})

// deleteBtn.addEventListener("dblclick", function(){
//     localStorage.clear()
//     ulEl.textContent = ""
//     inputEl.value = ""
//     myLeads = []
// })

deleteBtn.addEventListener("dblclick", ()=>{
    localStorage.clear();
    ulEl.textContent = "";
    inputEl.value = "";
    myLeads = []
})

inputBtn.addEventListener("click", function(){
    if (inputEl.value) {
        myLeads.push(inputEl.value);
    }
    saveToLocalStorage(myLeads, "myLeads")
    render(myLeads);
    inputEl.value = ""
})

inputEl.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        if (inputEl.value) {
            myLeads.push(inputEl.value);
        }
        saveToLocalStorage(myLeads, "myLeads")
        render(myLeads)
        inputEl.value = ""
    }
})