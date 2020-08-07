//declarations
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnauld',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

//store the list items
const listItems = [];

let dragStartIndex;

createList();



// insert list items into the DOM


//makes a copy of the array with spread operator
//map method takes the array and allows us to return a new array
//You can chain as many high level methods as you want
function createList() {
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map( a=> a.value)
    .forEach((person, index) => {
        console.log(person);
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
        <span class="number">${index+1}</span>
        <div class= "draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);

        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}
function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.add('leave');
}
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}
function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
 const itemOne = listItems[fromIndex].querySelector('draggable');
}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })


}