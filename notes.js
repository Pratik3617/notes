 showNotes();

 let addBtn = document.getElementById("addBtn");
 addBtn.addEventListener("click", function(e) {
     let addTxt = document.getElementById("addTxt");
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notesObj = [];
     } else {
         notesObj = JSON.parse(notes);
     }
     notesObj.push(addTxt.value);
     localStorage.setItem("notes", JSON.stringify(notesObj));
     addTxt.value = "";

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
     notesObj.forEach(function(element, index) {
         html += `
            <div class="noteCard my-2 mx-2 card" style="width: 20rem;">
                    <div class="card-body" style="display: inline-block;">
                        <span style="display:flex;justify-content:space-between;">
                            <h5 class="card-title">Note ${index + 1}</h5>
                            <span id="star" style="display:none;"><i class="fa fa-star" aria-hidden="true" style="color:#fffa65;font-size:20px;"></i></span>
                        </span>
                        
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style="margin-right:30px;border-radius:30px;height:35px;">Delete Note</button>
                        <button id="${index}" onclick="Starred(this.id)" class="btn btn-primary" style="border-radius:30px;height:35px;">Add to Starred</button>
                
                    </div>
                </div>`;
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
     //   console.log("I am deleting", index);

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
     // console.log('Input event fired!', inputVal);
     let noteCards = document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function(element) {
         let cardTxt = element.getElementsByTagName("p")[0].innerText;
         if (cardTxt.includes(inputVal)) {
             element.style.display = "block";
         } else {
             element.style.display = "none";
         }

     })
 })

 function Starred(index) {
     var x = document.getElementById("star");
     var y = document.getElementsById(index);
     if (x.style.display === "none") {
         x.style.display = "block";
     } else {
         x.style.display = "none";
     }
     if (y.value == "Add to Starred") {
         y.value = "Remove from Starred";
     } else {
         y.value = "Add to Starred";
     }

 }

 /*
 Further Features:
 1. Add Title
 2. Mark a note as Important
 3. Separate notes by user
 4. Sync and host to web server 
 */