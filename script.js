//declarations
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

//bracket syntax is called an 'array literal'
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

//this will change later on
let dragStartIndex;

//call the function that will create the list items - see below
createList();



// insert list items into the DOM


//makes a copy of the array with spread operator
//map method takes the array and allows us to return a new array
//You can chain as many high level methods as you want
function createList() {
    //this makes a copy of the array, in the correct order with the spread operator
    [...richestPeople]

    .map(a => ({ value: a, sort: Math.random()}))
    //this is going to sort the random decimals and arrange them/mix them up
    .sort((a, b) => a.sort - b.sort)
    //map it back into an array of strings
    .map( a=> a.value)
    // forEach is a high order array method that loops through the array
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
    //To make it a number put + at the start - initialise dragStartIndex
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}
function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
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

//swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
 const itemOne = listItems[fromIndex].querySelector('.draggable');
 const itemTwo = listItems[toIndex].querySelector('.draggable');

listItems[fromIndex].appendChild(itemTwo);
listItems[toIndex].appendChild(itemOne);
}


//check the order of the list 
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });

}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        //when the event dragstart happens, call function dragStart
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })


}

check.addEventListener('click', checkOrder);