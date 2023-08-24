//Menu close open 
let menuIcon = document.querySelector(".menu-icon");
let box = document.querySelector(".box");

menuIcon.onclick = function() {
	menuIcon.classList.toggle("active");
	box.classList.toggle("active");
}

document.onclick = function(e) {
	if(!menuIcon.contains(e.target) && !box.contains(e.target)){
		menuIcon.classList.remove("active");
		box.classList.remove("active");
	}
}

/*let menuIcon = document.querySelector(".menu-icon");
let box = document.querySelector(".box");
let wrapper = document.querySelector(".wrapper");

menuIcon.onclick = function() {
	menuIcon.classList.toggle("active");
	box.classList.toggle("active");
	wrapper.classList.toggle("content-shifted");
};

document.onclick = function(e) {
	if (!menuIcon.contains(e.target) && !box.contains(e.target)) {
		menuIcon.classList.remove("active");
		box.classList.remove("active");
		wrapper.classList.remove("content-shifted");
	}
};*/

//Notes counting 
//have to out id = "notes-list" where i will save my notes
/*let notes = []; // Yahan aap notes ko store kar sakte hain

function addNote() {
  const noteText = prompt("Enter your note:");
  if (noteText) {
    notes.push(noteText);
    updateNotesList();
    updateTotalNotesCount();
  }
}

function updateNotesList() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.textContent = `${index + 1}. ${note}`;
    notesList.appendChild(noteElement);
  });
}

function updateTotalNotesCount() {
  const totalNotesCount = document.getElementById("total-notes");
  totalNotesCount.textContent = notes.length;
}*/

//For PoP uP box 
const addBox = document.querySelector(".notes-icon"),
	  popupBox = document.querySelector(".popup-box"),
	  closeIcon = document.querySelector(".popup-head img"),
	  titleTag = document.querySelector(".popup-head input"),
	  descTag = document.querySelector("textarea"),
	  addBtn = document.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//getting localstorage notes if exist and parsing item to js object else passinf an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

/*function showNotes() {
	notes.forEach((note) => {
		let liTag = 
			`<div class="notes">
					<li>
						<span>${note.description}</span>
					</li>
					<div class="settings">
						<div class="image">	
							<img src="file:///C:/Users/ACER/Desktop/HTML/JavaScript/Notes%20App/ellipsis.png" >
						</div>
						<ul class="menu">
							<li><span>Edit</span><img src="file:///C:/Users/ACER/Desktop/HTML/JavaScript/Notes%20App/pencil.png"></li>
							<li><span>Delete</span><img src="file:///C:/Users/ACER/Desktop/HTML/JavaScript/Notes%20App/delete.png"></li>
						</ul>
					</div>
					<div class="bottom-context">
						<p>${note.title}</p>
						<span>${note.date}</span>
					</div>
				</div>`
		addBox.insertAdjacentHTML("afterend", liTag);
	});
};
showNotes();*/

addBox.addEventListener("click", () => {
	popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
	popupBox.classList.remove("show");
});

addBtn.addEventListener("click", () => {
	let noteTitle = titleTag.value,
	noteDesc = descTag.value;

	if (noteTitle || noteDesc) {	
		let dateObj = new Date();
		month = months[dateObj.getMonth()],
		day = dateObj.getDate(),
		year = dateObj.getFullYear();

		let noteInfo = {
			title: noteTitle, description: noteDesc, date: `${month} ${day}, ${year}`
		}
		notes.push(noteInfo); //adding new note to notes
		localStorage.setItem("notes", JSON.stringify(notes));
		closeIcon.click();
		showNotes();
	}
})