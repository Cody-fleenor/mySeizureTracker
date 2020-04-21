// seizureLog Class: Represents a seizureLog
class SeizureLog {
    constructor(dateOfSeizure, durationOfSeizure, notesFromSeizure) {
      this.dateOfSeizure = dateOfSeizure;
      this.durationOfSeizure = durationOfSeizure;
      this.notesFromSeizure = notesFromSeizure;
    }
  }
  
// UI Class: Handle UI Tasks
class UI {
static displaySeizureLogs() {
  const seizureLogs = Store.getSeizureLogs();
  seizureLogs.forEach((seizureLog) => UI.addSeizureLogToList(seizureLog));
}
static addSeizureLogToList(seizureLog) {
  const list = document.querySelector('#seizureLog-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${seizureLog.dateOfSeizure}</td>
    <td>${seizureLog.durationOfSeizure}</td>
    <td>${seizureLog.notesFromSeizure}</td>
    <td><a href="#" id="deleteButton" class="btn btn-danger btn-sm delete">X</a></td>
  `;
  list.appendChild(row);
}
static deleteSeizureLog(el) {
  if(el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
  }
}
static showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('#formS');
  const form = document.querySelector('#seizureLog-form');
  container.insertBefore(div, form);

  // Vanish in 3 seconds
setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

static clearFields() {
  document.querySelector('#dateOfSeizure').value = '';
  document.querySelector('#durationOfSeizure').value = '';
  document.querySelector('#notesFromSeizure').value = '';
}
}

/*Burger Menu*/
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function displayNavBar() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

  // Store Class: Handles Storage
  class Store {
    static getSeizureLogs() {
      let seizureLogs;
      if(localStorage.getItem('seizureLogs') === null) {
        seizureLogs = [];
      } else {
        seizureLogs = JSON.parse(localStorage.getItem('seizureLogs'));
      }
  
      return seizureLogs;
    }
  
    static addSeizureLog(seizureLog) {
      const seizureLogs = Store.getSeizureLogs();
      seizureLogs.push(seizureLog);
      localStorage.setItem('seizureLogs', JSON.stringify(seizureLogs));
    }
  
    static removeSeizureLog(notesFromSeizure) {
      const seizureLogs = Store.getSeizureLogs();
  
      seizureLogs.forEach((seizureLog, index) => {
        if(seizureLog.notesFromSeizure === notesFromSeizure) {
          seizureLogs.splice(index, 1);
        }
      });
  
      localStorage.setItem('seizureLogs', JSON.stringify(seizureLogs));
    }
  }
  
  // Event: Display seizureLogs
  document.addEventListener('DOMContentLoaded', UI.displaySeizureLogs);
  
  // Event: Add a seizureLog
  document.querySelector('#seizureLog-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const dateOfSeizure = document.querySelector('#dateOfSeizure').value;
  const durationOfSeizure = document.querySelector('#durationOfSeizure').value;
  const notesFromSeizure = document.querySelector('#notesFromSeizure').value;

  // ValidateOfSeizure
  if(dateOfSeizure === '' || durationOfSeizure === '' /*|| notesFromSeizure === ''*/) {
    UI.showAlert('Please fill in date and duration', 'danger');
  } else {
    // Instatiate seizureLog
    const seizureLog = new SeizureLog(dateOfSeizure, durationOfSeizure, notesFromSeizure);
    // Add seizureLog to UI
    UI.addSeizureLogToList(seizureLog);
    // Add seizureLog to store
    Store.addSeizureLog(seizureLog);
    // Show success message
    UI.showAlert('seizureLog Added', 'success');
    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a seizureLog
document.querySelector('#seizureLog-list').addEventListener('click', (e) => {
  // Remove seizureLog from UI
  UI.deleteSeizureLog(e.target);

  // Remove seizureLog from store
  Store.removeSeizureLog(e.target.parentElement.previousElementSibling.textContent);
  // Show success message
  UI.showAlert('seizureLog Removed', 'success');
});

/*dark mode
document.getElementById('toggleSwitch1').addEventListener('click', toggleMode);
function toggleMode(cssFile, cssLinkIndex) {
     var checkBox = document.getElementById("toggleSwitch")
     var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
     var newlink = document.createElement("link");
     
     if (checkBox.checked == true){
     newlink.setAttribute("rel","stylesheet");
     newlink.setAttribute("type","text/css");
     newlink.setAttribute("href","./styles/white-theme.css");
     document.getElementsByTagName("head").item(0).replaceChild(newlink,oldlink);
     } else {
     newlink.setAttribute("rel","stylesheet");
     newlink.setAttribute("type","text/css");
     newlink.setAttribute("href","./styles/bootstrap.css");
     document.getElementsByTagName("head").item(0).replaceChild(newlink,oldlink);
     }
   }
*/

