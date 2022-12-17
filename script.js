window.onload= init;
let trashbin = "http://i.imgur.com/yHyDPio.png";
// The contact manager as a global variable
let cm; 

function init() { 
	// create an instance of the contact manager
	cm = new ContactManager();
	
  	cm.addTestData();
  	cm.printContactsToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayContactsAsATable("contacts");
  document.querySelector('#contactSearchInput').addEventListener('input', (event) => {
        findContact(event.target.value);
    })

    document.querySelector('select').addEventListener('input', (event) => {
        if (event.target.value === 'email')
            cm.listOfContacts.sort(ContactManager.compareByEmail);
        else
            cm.listOfContacts.sort(ContactManager.compareByName);
        cm.displayContactsAsATable('contacts');
    })
}

function findContact(name) {
    let contact = cm.Contacts;
    let regex = new RegExp('${name}', 'i')
    let result = contact.filter(contact => contact.name.match(regex));
    console.log(result);

    cm.displayContactsAsATable('contacts', result)
}

function formSubmitted() {
	// Get the values from input fields
	  let name = document.querySelector("#name");
  	let email = document.querySelector("#email");
    let Machine = 
document.querySelector("#Machine");
    let editeur = document.querySelector ("#editeur");
    let sortie = document.querySelector("#sortie");
    let image = document.querySelector("#image");
    let gameplay = document.querySelector("#gameplay")
	let newContact = new Contact(name.value, email.value, editeur.value, Machine.value, sortie.value, image.value, gameplay.value);
	cm.add(newContact);
	
	// Empty the input fields
	name.value = "";
	email.value = "";
  editeur.value = "";
  Machine.value = "";
  sortie.value = "";
  image.value = "";
  gameplay.value = "";
  
	
	// refresh the html table
	cm.displayContactsAsATable("contacts");
	
	// do not let your browser submit the form using HTTP
	return false;
}
function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
  	cm.displayContactsAsATable("contacts");
}

class Contact {
	constructor(name, email, Machine, editeur, sortie, image, gameplay) {
		this.name = name;
		this.email = email;
    this.Machine = Machine;
    this.editeur = editeur;
    this.sortie = sortie;
    this.image = image;
    this.gameplay = gameplay;
	}
}

class ContactManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfContacts = [];
	}
	
	addTestData() {
		var c1 = new Contact("Pathfinder 2", "PS4/PC", "Deep Silver", "RPG isométrique", "2021-09-02", "Img URL", "Gameplay URL");
  		var c2 = new Contact("Baldur's Gate 3", "PC", "Larian Studios", "RPG", "2023-08", "Img URL", "Gameplay URL");
  		var c3 = new Contact("Dragon Age 4", "PS4/5, Xbox ONE/Series", "Electronic Arts", "RPG", "?", "Img URL", "Gameplay URL");
  		var c4 = new Contact("RiotGames MMORPG", "PC", "Riot Games", "MMORPG", "?", "Img URL", "Gameplay URL");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}
  	// Will erase all contacts
	empty() {
		this.listOfContacts = [];
	}
	
	add(contact) {
		this.listOfContacts.push(contact);
	}
	
	remove(contact) {
		for(let i = 0; i < this.listOfContacts.length; i++) { 
			var c = this.listOfContacts[i];

			if(c.email === contact.email) {
				// remove the contact at index i
				this.listOfContacts.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	
	sort() {
		this.listOfContacts.sort(ContactManager.compareByName);
	}

	static compareByName(c1, c2) {
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}
	
	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfContacts = JSON.parse(localStorage.contacts);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contacts = JSON.stringify(this.listOfContacts);
	}
  displayContactsAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfContacts.length === 0) {
			container.innerHTML = "<p>Pas de jeux!</p>";
			// stop the execution of this method
			return;
		}  
  
    	// creates and populate the table with users
    	var table = document.createElement("table");
          
    	// iterate on the array of users
    	this.listOfContacts.forEach(function(currentContact) {
        	// creates a row
        	var row = table.insertRow();
        
			row.innerHTML = "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.email + "</td>" + "<td>" +   currentContact.editeur + "</td>" + "<td>" + currentContact.Machine +"</td>" + "<td>" + currentContact.sortie +"</td>" + "<td>" + currentContact.image +"</td>" + "<td>" + currentContact.gameplay +"</td>"
     	});
  
     	// adds the table to the div
     	container.appendChild(table);
  	}
  sort() {
        this.listOfContacts.sort(ContactManager.compareByName);
    }

    static compareByName(c1, c2) {

        if (c1.name < c2.name)
            return -1;

        if (c1.name > c2.name)
            return 1;

        return 0;
    }

    static compareByEmail(c1, c2) {
        if (c1.email < c2.email)
            return -1;

        if (c1.email > c2.email)
            return 1;

        return 0;
    }
  
}
