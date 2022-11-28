import { subscribe, publish } from './pubsub'

subscribe('updatedToDos',drawTiles)


newToDo.addEventListener('click', () => {
    _drawTileModInterface();
    _drawNewTileButton();
})

function drawTile(toDo) {
    const container = document.createElement('div')
    container.classList.add('tile')
    const titleBar = document.createElement('div')
    titleBar.innerText = toDo.title;
    titleBar.classList.add('tileTop')

    const buttons=document.createElement('div')
    buttons.classList.add('tileButtons')
    const editButton = document.createElement('img')
    editButton.src='./images/book.svg';    
    const closeButton = document.createElement('img')
    closeButton.src='./images/close.svg';


    editButton.addEventListener('click',e=>{
        _drawTileModInterface();
        _drawEditTileButton(whatsMyIndex(e));
        })

    closeButton.addEventListener('click',e=>{
        publish('deleteTile',whatsMyIndex(e))
    })

    titleBar.append(buttons);
    buttons.append(editButton, closeButton);


    const descBar = document.createElement('div')
    descBar.innerText = toDo.description;
    const dueBar = document.createElement('div')
    dueBar.innerText = toDo.dueDate;
    const prioBar = document.createElement('div')
    prioBar.innerText = toDo.priority;

    container.append(titleBar, descBar, dueBar, prioBar)
    display.append(container)
}

function whatsMyIndex(e){
    //returns the index corresponding to the tile in which a button was clicked
    let thisTile=(e.target.parentNode.parentNode.parentNode)
    return(Array.from(thisTile.parentNode.children).indexOf(thisTile))
}

function drawTiles(array) {
    _clearDisplay();
    for (let i = 0; i < array.length; i++) {
        drawTile(array[i]);
    }
}

function _drawTileModInterface() {
    _clearControls();
    const container = document.createElement('form')
    container.id='container'
    const nameRow = document.createElement('div')
    nameRow.classList.add('formRow')
    const nameLabel = document.createElement('label')
    nameLabel.htmlFor = ('name');
    nameLabel.innerText = 'Name: '
    const nameInput = document.createElement('input')
    nameInput.type = 'text';
    nameInput.id='nameInput'
    nameRow.append(nameLabel, nameInput)

    const descLabel = document.createElement('label')
    descLabel.htmlFor = ('desc');
    descLabel.innerText = 'Description: '
    const descBox = document.createElement('textarea')
    descBox.id='descBox'

    const dueRow = document.createElement('div')
    const dueLabel = document.createElement('label')
    dueLabel.htmlFor = ('due');
    dueLabel.innerText = 'Due Date: '
    const dueInput = document.createElement('input')
    dueInput.type = 'date';
    dueInput.id='dueInput'
    dueRow.append(dueLabel, dueInput)

    const prioRow = document.createElement('div')
    prioRow.innerText = 'Priority: '
    const prioButtons = document.createElement('div')
    prioButtons.classList.add('formRow')
    const highPLabel = document.createElement('div')
    highPLabel.innerText = 'High'
    const highPButton = document.createElement('input')
    highPButton.type = 'radio'
    highPButton.name = 'prio'
    highPButton.id='highPButton'
    const lowPLabel = document.createElement('div')
    lowPLabel.innerText = 'Low'
    const lowPButton = document.createElement('input')
    lowPButton.type = 'radio'
    lowPButton.name = 'prio'
    lowPButton.id='lowPButton'
    prioButtons.append(highPLabel, highPButton, lowPLabel, lowPButton)

    container.append(nameRow, descLabel, descBox, dueRow, prioRow, prioButtons)
    tempControls.append(container)
}
function _whichPriorityIsChecked(){
    if (!highPButton.checked&&!lowPButton.checked) return null;
    if (highPButton.checked) return 'High';
    if (lowPButton.checked) return 'Low';}


function _validateTileInput(){
    if (!nameInput.value || !descBox.value || !dueInput.value || !_whichPriorityIsChecked()) {
        alert('All fields require an entry.')
        return 0;
    }else return 1;
}

function _drawNewTileButton(){
    const subButton = document.createElement('button')
    subButton.innerText = 'Submit'
    subButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!_validateTileInput()) return;
        publish('createToDo', { title: nameInput.value, description: descBox.value, dueDate: dueInput.value, priority: _whichPriorityIsChecked(), completed: false })
    })
    container.append(subButton)
}

function _drawEditTileButton(i){
    const editButton = document.createElement('button')
    editButton.innerText = 'Submit'
    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!_validateTileInput()) return;

        publish('editToDo',{ title: nameInput.value, description: descBox.value, dueDate: dueInput.value, priority: _whichPriorityIsChecked(), completed: false, which:i })
    })
    container.append(editButton)
}

function _clearControls() {
    tempControls.replaceChildren();
}

function _clearDisplay(){
    display.replaceChildren();
}

export { drawTile }