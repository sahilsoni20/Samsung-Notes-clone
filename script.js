//Menu close open 
let menuIcon = document.querySelector(".menu-icon");
let box = document.querySelector(".box");

menuIcon.onclick = function() {
	menuIcon.classList.toggle("active");
	box.classList.toggle("active");
}

document.onclick = function(e) {
	if(!menuIcon.contains(e.target) && !box.contains(e.target)) {
		menuIcon.classList.remove("active");
		box.classList.remove("active");
	}
}

var icon = document.getElementById("btn");
function toggle() {
	if (icon.style.color == "yellow") {
		icon.style.color = "grey";
	} else {
		icon.style.color = "yellow";
	}
}

//Making the first alphabet capital
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//For Notes (adding notes, edit, delete)
const addBox = document.querySelector(".icon"),
	  popupBox = document.querySelector(".popup-box"),
	  popupTitle = document.querySelector(".popup-box "),
	  closeIcon = document.querySelector(".popup-head img"),
	  titleTag = document.querySelector(".popup-head input"),
	  descTag = document.querySelector("textarea"),
	  addBtn = document.querySelector("button");

const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

//that function will update the notes in the webpage and the user enter title, description and date when it made
function showNotes() {
    const wrapper = document.querySelector(".wrapper");
    wrapper.innerHTML = "";

    notes.forEach((note, index) => {
        let noteHTML = 
			`<div class="notes">
				<span>${note.description}</span>
				<div class="settings">
					<div class="image">	
						<img src="https://res.cloudinary.com/dkjdqncdh/image/upload/v1693071184/ellipsis_uwzzsk.png" onclick = "showMenu(this)">
					</div>
					<ul class="menu">
						<li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><span>Edit</span>
							<img src="https://res.cloudinary.com/dkjdqncdh/image/upload/v1693071206/pencil_bhg7wt.png"></li>
						<li onclick="deleteNote(${index})"><span>Delete</span>
							<img src="https://res.cloudinary.com/dkjdqncdh/image/upload/v1693071182/delete_i5kizu.png"></li>
						<li onclick="toggleFavorite(${index})">
							<span class="fav">Favorite</span><i class="fa-solid fa-star fa-xs" id="starIcon-${index}"></i>
						</li>
					</ul>
				</div>
				<div class="bottom-context">
					<p>${note.title}</p>
					<span>${note.date}</span>
					<i class="fa-solid fa-star fa-xs" id="icon-${index}" style="color: yellow; position: absolute; left: 100px; bottom: 8px; opacity: ${note.isFavorite ? "0" : "1"};"></i>
				</div>
			</div>`
        wrapper.innerHTML += noteHTML;
		const totalNotesCount = notes.length;
    	updateTotalNotesCount(totalNotesCount);
    	countFavoriteNotesAndUpdateElement();
    });
}
showNotes();

//changing the text favorite to unfavorite
function toggleFavoriteText(elem) {
    const favSpan = elem.querySelector(".fav");
    const starIcon = elem.querySelector(".fa-solid.fa-star.fa-xs");

    if (favSpan && starIcon) {
        // Toggle the text content
        favSpan.textContent = (favSpan.textContent === "Favorite") ? "Unfavorite" : "Favorite";

        // Change the margin based on the text content
        starIcon.style.margin = (favSpan.textContent === "Unfavorite") ? "0 -14px" : "0";

    }
}

function toggleFavoriteText(elem) {
            const favSpan = elem.querySelector(".fav");
            const starIcon = elem.querySelector(".fa-solid.fa-star.fa-xs");

            if (favSpan && starIcon) {
                const isFavorite = (favSpan.textContent === "Favorite");

                // Toggle the text content
                favSpan.textContent = isFavorite ? "Unfavorite" : "Favorite";

                // Change the margin based on the text content
                starIcon.style.margin = isFavorite ? "0 -14px" : "0";

                // Change the opacity based on the text content
        			starIcon.style.opacity = isFavorite ? "0" : "1";

                // Store the favorite state in localStorage
                localStorage.setItem('favoriteState', favSpan.textContent);
            }
        }

        // Restore the favorite state from localStorage on page load
        const favoriteState = localStorage.getItem('favoriteState');
        if (favoriteState) {
            const favSpan = document.querySelector(".fav");
            const starIcon = document.querySelector(".fa-solid.fa-star.fa-xs");

            if (favSpan && starIcon) {
                favSpan.textContent = favoriteState;
                starIcon.style.margin = favoriteState === "Unfavorite" ? "0 -14px" : "0";
            }
        }

//changing the opacity
function toggleFavorite(index) {
    const starIcon = document.getElementById(`starIcon-${index}`);
    
    if (starIcon) {
        toggleFavoriteText(starIcon.parentElement); // Call the function here
    }

    const note = notes[index];
    note.isFavorite = !note.isFavorite;
    localStorage.setItem("notes", JSON.stringify(notes));
    
    const iconElement = document.getElementById(`icon-${index}`);
    if (iconElement) {
        iconElement.style.opacity = note.isFavorite ? "0" : "1";
    }
    countFavoriteNotesAndUpdateElement();
}

//Counting the fav notes 
function countFavoriteNotesAndUpdateElement() {
    const favoriteNotesCount = notes.filter(note => note.isFavorite).length;
    const favoriteNotesCountElement = document.querySelector(".favorite-notes-count");

    if (favoriteNotesCountElement) {
        favoriteNotesCountElement.textContent = favoriteNotesCount;
    }
}


//Counting the notes 
function updateTotalNotesCount(count) {
    const totalNotesElements = document.querySelectorAll(".total-notes");
    
    // Update the count for each total notes element
    totalNotesElements.forEach((element) => {
        element.textContent = count;
    });
}

//showing the sidemenu
document.addEventListener("click", function(event) {
    var settingsDivs = document.querySelectorAll(".settings");
    settingsDivs.forEach(function(settingsDiv) {
        if (!settingsDiv.contains(event.target)) {
            settingsDiv.classList.remove("show");
        }
    });
});

//shows the note setting box (edit, delete)
function showMenu(elem) {
    var settingsDiv = elem.closest(".settings");
    settingsDiv.classList.toggle("show");
}

//deleting the note
function deleteNote(noteId) {
	notes.splice(noteId, 1);
	localStorage.setItem("notes", JSON.stringify(notes));
	showNotes();
}

//by this when we edit the note the update title, description will initizialied by this function
function updateNote(noteId, title, description) {
	isUpdate = true;
	updateId = noteId; // Store the noteId to be updated
	addBox.click();
	titleTag.value = title; // Set the title value for editing
	descTag.value = description; // Set the description value for editing
	addBtn.innerText = "Update Note";
}

let isUpdate = false, updateId;
addBox.addEventListener("click" , () => {
	titleTag.focus();
	popupBox.classList.add("show");
})

//close the note 
closeIcon.addEventListener("click" , () => {
	titleTag.value = "";
	descTag.value = "";
	addBtn.innerText = "Add Note";
	popupBox.classList.remove("show");
})

//by this function we can add new note, add title, description
addBtn.addEventListener("click", e => {
	e.preventDefault();
	let noteTitle = titleTag.value.trim(),
	noteDesc = descTag.value.trim();

	if(noteTitle || noteDesc) {
		let dateObj = new Date(),			
			month = months[dateObj.getMonth()],
			date = dateObj.getDate(),
			year = dateObj.getFullYear();
			console.log(dateObj)
		let noteInfo = {
			title: capitalizeFirstLetter(noteTitle), description: capitalizeFirstLetter(noteDesc), date: `${month} ${date}, ${year}`
		};
		if (isUpdate) {
			notes[updateId] = noteInfo;
			isUpdate = false;
			updateId = undefined;
		} else {
			notes.push(noteInfo); //Add a new note
		}

		localStorage.setItem("notes", JSON.stringify(notes));
		closeIcon.click();
		showNotes();
	}
})

//search box
const searchInput = document.getElementById("search-box");

searchInput.addEventListener("input", function() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    filterNotes(searchQuery);
});

function filterNotes(query) {
    const notesContainer = document.querySelector(".wrapper");
    const notes = notesContainer.querySelectorAll(".notes");

    notes.forEach(note => {
        const title = note.querySelector(".bottom-context p");
        const description = note.querySelector(".notes span");
        
        const titleText = title.textContent.toLowerCase();
        const descriptionText = description.textContent.toLowerCase();
        
        if (titleText.includes(query) || descriptionText.includes(query)) {
            // Highlight the matching text
            title.innerHTML = titleText.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
            description.innerHTML = descriptionText.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
            
            note.style.display = "block"; // Show the note if it matches the query
        } else {
            note.style.display = "none"; // Hide the note if it doesn't match the query
        }
    });
}


/*localStorage.clear();*/