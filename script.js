import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-640f7-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)

const weAreTheChampionsDB = ref(database, "we-are-the-champions")

const btnEl = document.querySelector("#btn-publish")
const textEl = document.querySelector("#text-element")
const displayEl = document.querySelector("#texts")

btnEl.addEventListener("click", () =>{
    let textValue = textEl.value
    
    push(weAreTheChampionsDB, textValue)

    clearTextArea()
})

onValue(weAreTheChampionsDB, function(snapshot){
    console.log(snapshot.val())
    if (snapshot.val()){
        let itemsArray = Object.entries(snapshot.val())
        
        clearDisplayEl()

        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            console.log(itemsArray[i])
            appendItemToDisplayEl(currentItem)
            console.log(currentItem)
        }
    } else {
        displayEl.innerHTML = "No content here yet"
    }
})



function clearTextArea(){
    textEl.value = ""
}

function clearDisplayEl(){
    displayEl.innerHTML = ""
}

function appendItemToDisplayEl(item){
    // let itemID = item[0]
    let itemText = item[1]

    let newEl = document.createElement("p")

    newEl.textContent = itemText
    newEl.classList.add("box")

    displayEl.appendChild(newEl)
}