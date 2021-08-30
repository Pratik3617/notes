showNotes();

let notes = localStorage.getItem("notes");
if (notes == null) {
    notesObj = [];
} else {
    notesObj = JSON.parse(notes);
}
Array.from(notesObj).forEach(function(element, index) {
    showStarred(index);
})

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        starred: "null"
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    showNotes();


});


// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";

    Array.from(notesObj).forEach(function(element, index) {
        html += `
           <div class="noteCard my-2 mx-2 card" style="width: 20rem;">
                   <div class="card-body" style="display: inline-block;">
                       <span style="display:flex;justify-content:space-between;">
                           <h5 class="card-title">${element.title}</h5>
                           <span id="star${index}" style="display:none;"><i class="fa fa-star" aria-hidden="true" style="color:#fff200;font-size:20px;"></i></span>  
                       </span>
                       
                       <p class="card-text"> ${element.text}</p>
                       <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style="margin-right:55px;border-radius:30px;height:35px;font-size:13px;">Delete Note</button>
                       <button id="${index}" onclick="addStarred(this.id)" value="" class="btn btn-primary btn1${index}"  style="border-radius:30px;height:35px;font-size:13px;">Add to Starred</button>
               
                   </div>
               </div> `;
    });

    let notesElm = document.getElementById("notes");

    if (notesObj.length != 0) {
        notesElm.innerHTML = html;

    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;


    }
}

// Function to delete a note
function deleteNote(index) {


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    })
})

function addStarred(index) {
    let z = "star" + index;
    let y = ".btn1" + index;
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let Btn1 = document.querySelector(y);
    var x = document.getElementById(z);

    if (notesObj[index]["starred"] == "null") {
        x.style.display = "block";
        notesObj[index]["starred"] = "starred";
        localStorage.setItem("notes", JSON.stringify(notesObj));
        Btn1.innerText = "Remove Starred";
    } else {
        x.style.display = "none";
        notesObj[index]["starred"] = "null";
        localStorage.setItem("notes", JSON.stringify(notesObj));
        Btn1.innerText = "Add to Starred";
    }
}

function showStarred(index) {
    let z = "star" + index;
    let y = ".btn1" + index;
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let Btn1 = document.querySelector(y);
    var x = document.getElementById(z);

    if (notesObj[index]["starred"] == "starred") {
        x.style.display = "block";
        Btn1.innerText = "Remove Starred";
    } else {
        x.style.display = "none";
        Btn1.innerText = "Add to Starred";
    }
}


/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
typing club online
typing master
*/