class User {
    constructor(id, name, email, address, phone) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.id = id;
    }

    edit(name = this.name, email = this.email, address = this.address, phone = this.phone) { 
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
           
    }

    get() {
        return {
            name: this.name,
            id: this.id,
            email: this.email,
            address: this.address,
            phone: this.phone,
        }
    }
}

class Contacts {
    constructor() {
        this.contactsList = [];
    }
    add (name, email, address, phone) {
        const id = this.contactsList.length;
        const contact = new User(id, name, email, address, phone);
        this.contactsList.push(contact);
    }
    edit (id, name, email, address, phone) {
        this.contactsList[id].edit(name, email, address, phone);
    }

    remove(id) {
        delete this.contactsList[id];
    }

    get () {
        return this.contactsList;
    }
}

class ContactsApp extends Contacts {
    constructor() {
        super();
    }

    draw () {

        const oldList = document.getElementById('contactList');
        if (oldList) {
            oldList.remove();
        }
        
        
        const contactList = document.createElement('ul');
        contactList.id = 'contactList';
        const deleteAllBtn = document.createElement('button');
        deleteAllBtn.innerText = 'Delete all contacts';
        contactList.appendChild(deleteAllBtn);
        deleteAllBtn.addEventListener('click', () => {
            contactList.remove();
        })
        this.contactsList.map((contact) => {
            const li = document.createElement('li');
            const contactNode = document.createElement('h2');
            contactNode.innerText = contact.name;
            const emailNode = document.createElement('p');
            emailNode.innerText = contact.email;
            const addressNode = document.createElement('p');
            addressNode.innerText = contact.address;
            const phoneNode = document.createElement('p');
            phoneNode.innerText = contact.phone;
            li.appendChild(contactNode);
            li.appendChild(emailNode);
            li.appendChild(addressNode);
            li.appendChild(phoneNode);
            contactList.appendChild(li);
        });
        document.body.appendChild(contactList);
        
        
    }



    creation() {
        const app = document.createElement('div');
        app.classList.add('contacts');
        const form = document.createElement('form');
        const contactName = document.createElement('input');
        contactName.placeholder = 'Enter name';
        const contactEmail = document.createElement('input');
        contactEmail.placeholder = 'Enter email';
        const contactAddress = document.createElement('input');
        contactAddress.placeholder = 'Enter address';
        const contactPhone = document.createElement('input');
        contactPhone.placeholder = 'Enter phone';
       
        app.appendChild(form);
        form.appendChild(contactName);
        form.appendChild(contactEmail);
        form.appendChild(contactAddress);
        form.appendChild(contactPhone);
        const addBtn = document.createElement('button');
        addBtn.innerText = 'Create new contact';

        form.appendChild(addBtn);
 

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = event.currentTarget[0].value;
            event.currentTarget[0].value = '';
            const email = event.currentTarget[1].value;
            event.currentTarget[1].value = '';
            const address = event.currentTarget[2].value;
            event.currentTarget[2].value = '';
            const phone = event.currentTarget[3].value;
            event.currentTarget[3].value = '';
            this.add(name, email, address, phone);
            this.draw();
        })
        document.body.appendChild(app);
    }


    

}
const contact1 = new User('Alex', 'alex@gmail.com', 'Minsk', '80299465235');
const contacts = new ContactsApp();
contacts.creation();
console.log(contacts);
/*contacts.add('Alex', 'alex@gmail.com', 'Minsk', '80299465235');
contacts.add('Bob', 'alex@gmail.com', 'Minsk', '80299465235');
contacts.add('Dan', 'Dan@gmail.com', 'Moscow', '80258945678');
contacts.add('Piter', 'Piter@gmail.com', 'Brest', '80295784623');
contacts.remove(1);
contacts.edit(0, 'Mark', undefined, undefined, undefined)
console.log(contacts.get());*/

