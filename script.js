// Menu close open
let menuIcon = document.querySelector(".menu-icon");
let box = document.querySelector(".box");

menuIcon.onclick = function () {
    menuIcon.classList.toggle("active");
    box.classList.toggle("active");
}

document.onclick = function (e) {
    if (!menuIcon.contains(e.target) && !box.contains(e.target)) {
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

// Making the first alphabet capital
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// For Notes (adding notes, edit, delete)
const addBox = document.querySelector(".icon"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = document.querySelector(".popup-box "),
    closeIcon = document.querySelector(".popup-head img"),
    titleTag = document.querySelector(".popup-head input"),
    descTag = document.querySelector("textarea"),
    addBtn = document.querySelector("button");

const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

// Function to update the notes in the webpage
function showNotes() {
    const wrapper = document.querySelector(".wrapper");
    wrapper.innerHTML = "";

    notes.forEach((note, index) => {
        let noteHTML = `<div class="notes">
            <span>${note.description}</span>
            <div class="settings">
                <div class="image">    
                    <img src="https://res.cloudinary.com/dkjdqncdh/image/upload/v1693071184/ellipsis_uwzzsk.png" onclick="showMenu(this)">
                </div>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')">
                        <span>Edit</span>
                        <img src="https://res.cloudinary.com/dkjdqncdh/image/upload/v1693071206/pencil_bhg7wt.png">
                    </li>
                    <li onclick="deleteNote(${index})">
                        <span>Delete</span>
                        <img src="https://res.cloudinary.com/dkjdqncdh/image/upload/v1693071182/delete_i5kizu.png">
                    </li>
                    <li onclick="toggleFavorite(${index})">
                        <span class="fav">Favorite</span>
                        <i class="fa-solid fa-star fa-xs" id="starIcon-${index}"></i>
                    </li>
                </ul>
            </div>
            <div class="bottom-context">
                <p>${note.title}</p>
                <span>${note.date}</span>
                <i class="fa-solid fa-star fa-xs" id="icon-${index}" style="color: yellow; position: absolute; left: 100px; bottom: 8px; opacity: ${note.isFavorite ? "0" : "1"};"></i>
            </div>
        </div>`;
        wrapper.innerHTML += noteHTML;
        const totalNotesCount = notes.length;
        updateTotalNotesCount(totalNotesCount);
        countFavoriteNotesAndUpdateElement();
    });
}

showNotes();

// Function to toggle favorite text and icon
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

// Function to toggle favorite state and update UI
function toggleFavorite(index) {
    const starIcon = document.getElementById(`starIcon-${index}`);

    if (starIcon) {
        toggleFavoriteText(starIcon.parentElement);
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

// Function to count favorite notes and update UI
function countFavoriteNotesAndUpdateElement() {
    const favoriteNotesCount = notes.filter(note => note.isFavorite).length;
    const favoriteNotesCountElement = document.querySelector(".favorite-notes-count");

    if (favoriteNotesCountElement) {
        favoriteNotesCountElement.textContent = favoriteNotesCount;
    }
}

// Function to update total notes count
function updateTotalNotesCount(count) {
    const totalNotesElements = document.querySelectorAll(".total-notes");

    totalNotesElements.forEach((element) => {
        element.textContent = count;
    });
}

// Event listener to close note settings when clicked outside
document.addEventListener("click", function (event) {
    var settingsDivs = document.querySelectorAll(".settings");
    settingsDivs.forEach(function (settingsDiv) {
        if (!settingsDiv.contains(event.target)) {
            settingsDiv.classList.remove("show");
        }
    });
});

// Function to show note settings box (edit, delete)
function showMenu(elem) {
    var settingsDiv = elem.closest(".settings");
    settingsDiv.classList.toggle("show");
}

// Function to delete a note
function deleteNote(noteId) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Function to update a note's title and description for editing
function updateNote(noteId, title, description) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    addBtn.innerText = "Update Note";
}

let isUpdate = false, updateId;
addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

// Event listener to close note popup
closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupBox.classList.remove("show");
});

// Event listener to add or update a note
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value.trim();
    let noteDesc = descTag.value.trim();

    if (noteTitle || noteDesc) {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let date = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: capitalizeFirstLetter(noteTitle),
            description: capitalizeFirstLetter(noteDesc),
            date: `${month} ${date}, ${year}`
        };

        if (isUpdate) {
            notes[updateId] = noteInfo;
            isUpdate = false;
            updateId = undefined;
        } else {
            notes.push(noteInfo);
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

// Search box functionality
const searchInput = document.getElementById("search-box");

searchInput.addEventListener("input", function () {
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
            title.innerHTML = titleText.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
            description.innerHTML = descriptionText.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
}

/*localStorage.clear();*/
