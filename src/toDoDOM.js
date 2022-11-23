import { subscribe, publish } from './pubsub'

subscribe('updatedToDos',drawTiles)


newToDo.addEventListener('click', () => {
    drawNewTileInterface();
})

function drawTile(toDo) {
    const container = document.createElement('div')
    container.classList.add('tile')
    const titleBar = document.createElement('div')
    titleBar.innerText = toDo.title;
    titleBar.classList.add('tileTop')
    const descBar = document.createElement('div')
    descBar.innerText = toDo.description;
    const dueBar = document.createElement('div')
    dueBar.innerText = toDo.dueDate;
    const prioBar = document.createElement('div')
    prioBar.innerText = toDo.priority;

    container.append(titleBar, descBar, dueBar, prioBar)
    display.append(container)
    //publish('drewTile', container)
}

function drawTiles(array) {
    _clearDisplay();
    for (let i = 0; i < array.length; i++) {
        drawTile(array[i]);
    }
}

function drawNewTileInterface() {
    _clearControls();
    const container = document.createElement('form')
    const nameRow = document.createElement('div')
    nameRow.classList.add('formRow')
    const nameLabel = document.createElement('label')
    nameLabel.htmlFor = ('name');
    nameLabel.innerText = 'Name: '
    const nameInput = document.createElement('input')
    nameInput.type = 'text';
    nameRow.append(nameLabel, nameInput)

    //const descRow = document.createElement('div')
    const descLabel = document.createElement('label')
    descLabel.htmlFor = ('desc');
    descLabel.innerText = 'Description: '
    const descBox = document.createElement('textarea')

    const dueRow = document.createElement('div')
    const dueLabel = document.createElement('label')
    dueLabel.htmlFor = ('due');
    dueLabel.innerText = 'Due Date: '
    const dueInput = document.createElement('input')
    dueInput.type = 'date';
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
    const lowPLabel = document.createElement('div')
    lowPLabel.innerText = 'Low'
    const lowPButton = document.createElement('input')
    lowPButton.type = 'radio'
    lowPButton.name = 'prio'
    prioButtons.append(highPLabel, highPButton, lowPLabel, lowPButton)


    //move this to its own function so different button can be created instead (for edit ToDo)
    const subButton = document.createElement('button')
    subButton.innerText = 'Submit'
    //event not working
    subButton.addEventListener('click', (e) => {
        e.preventDefault();

        let whichButton = undefined
        if (highPButton.checked) whichButton="High"
        if (lowPButton.checked) whichButton="Low"
        publish('createToDo', { title: nameInput.value, description: descBox.value, dueDate: dueInput.value, priority: whichButton, completed: false })

    })


    container.append(nameRow, descLabel, descBox, dueRow, prioRow, prioButtons, subButton)
    tempControls.append(container)
}

function _clearControls() {
    tempControls.replaceChildren();
}

function _clearDisplay(){
    display.replaceChildren();
}

export { drawTile }