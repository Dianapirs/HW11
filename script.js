function closeModal() {
    // modalWindow.style.display = 'none';
    const modalWindow = document.querySelector('.modal-wrapper');
    modalWindow.remove();
}
class User {
    constructor({id, name, email, address, phone}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        
    }

    edit({name = this.name, email = this.email, address = this.address, phone = this.phone}) { 
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
    constructor(name) {
        this.contactsList = [];
    }
    add (name, email, address, phone) {
        const id = this.contactsList.length + 1;
        const contact = new User({id, name, email, address, phone});
        this.contactsList.push(contact);
       
        
    }
    editContact (data) {
        const { name, id, email, address, phone } = data
        this.contactsList[id - 1].name = name;
        this.contactsList[id - 1].email = email;
        this.contactsList[id - 1].address = address;
        this.contactsList[id - 1].phone = phone;
        
    }

    remove(id) {
        delete this.contactsList[id - 1];
    }

    get () {
        return this.contactsList;
    }
}

class ContactsApp extends Contacts {
    constructor() {
        super();
    }

    get contactListMethod() {
        return this.contactsList;
    }

    set contactListMethod(newContactsList) {
        this.contactsList = newContactsList;
    }

    get localContacts() {
        const jsonContacts = localStorage.getItem('contacts');
        return JSON.parse(jsonContacts);
    }

    set localContacts (contactsList) {
        const jsonContacts = JSON.stringify(contactsList);
        localStorage.setItem('contacts', jsonContacts);

    }

    getData () {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((json) => {
            this.contactsList = json;
            this.draw();
        });
    }


    onRemoveEdit (id){
        
        const openModal = () => {
            document.body.insertAdjacentHTML('beforeend', `
            <div class="modal-wrapper">
                <div class="modal-box">
                    <span class="close">x</span>
                    <h1>Edit contact</h1>
                </div>
            </div>
            `)
            const contentBox = document.querySelector('.modal-box');
            const nameInput = document.createElement('input');
            nameInput.placeholder = 'Enter new name';
            const emailInput = document.createElement('input');
            emailInput.placeholder = 'Enter new email';
            const phoneInput = document.createElement('input');
            phoneInput.placeholder = 'Enter new phone';
            const addressInput = document.createElement('input');
            addressInput.placeholder = 'Enter new address';
            const save = document.createElement('button');
            save.innerText = 'Save';

            save.addEventListener('click', () => {
                this.editContact({id: id, name: nameInput.value, email: emailInput.value, phone: phoneInput.value, address: addressInput.value});
                closeModal();
                this.draw();
            })

            contentBox.appendChild(nameInput);
            contentBox.appendChild(emailInput);
            contentBox.appendChild(phoneInput);
            contentBox.appendChild(addressInput);

            contentBox.appendChild(save);
            const close = document.querySelector('.close');
            close.addEventListener('click', closeModal);
        }
        const wrapperBtns = document.createElement('div');
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener ('click', () => {
            this.remove(id);
            this.draw();  
        });

        editBtn.addEventListener('click', openModal);
        wrapperBtns.appendChild(editBtn);
        wrapperBtns.appendChild(removeBtn);  
        return wrapperBtns;
 
    }


    draw () {
        this.localContacts = this.contactsList;
        const oldList = document.getElementById('contactList');
        if (oldList) {
            oldList.remove();
        }
        
        const contactList = document.createElement('ul');
        contactList.id = 'contactList';
    
        
        this.contactsList.map((contact) => {
            if(contact) {
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
                const btns = this.onRemoveEdit(contact.id);
                li.appendChild(btns);
            }
        });
       document.body.appendChild(contactList);
        
    }

    creation() {

        const form = document.createElement('form');
        const contactName = document.createElement('input');
        contactName.placeholder = 'Enter name';
        const contactEmail = document.createElement('input');
        contactEmail.placeholder = 'Enter email';
        const contactAddress = document.createElement('input');
        contactAddress.placeholder = 'Enter address';
        const contactPhone = document.createElement('input');
        contactPhone.placeholder = 'Enter phone';
       
        
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
        document.body.appendChild(form);

        if(!localStorage.getItem('contacts')) {
            this.getData();
            this.localContacts = contactsList;
        } else {
            this.contactsList = this.localContacts;
            this.draw();
        }
    }   

}
const contact1 = new User('Alex', 'alex@gmail.com', 'Minsk', '80299465235');
const listOfContacts = new ContactsApp();
listOfContacts.creation();
console.log(listOfContacts);
/*contacts.add('Alex', 'alex@gmail.com', 'Minsk', '80299465235');
contacts.add('Bob', 'alex@gmail.com', 'Minsk', '80299465235');
contacts.add('Dan', 'Dan@gmail.com', 'Moscow', '80258945678');
contacts.add('Piter', 'Piter@gmail.com', 'Brest', '80295784623');
contacts.remove(1);
contacts.edit(0, 'Mark', undefined, undefined, undefined)
console.log(contacts.get());*/

