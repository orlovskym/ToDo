import { subscribe, publish } from './pubsub'


const projectTracker = (() => {
    let _projects = [];
    let _activeProject = null;

    function setActiveProject(name) {
        _activeProject = name;
    }

    function getActiveProject() {
        return (_activeProject)
    }

    return { setActiveProject, getActiveProject }
})();


/*const createToDo = (title, description, dueDate, priority, completed) => {
    function toggleCompletion() {
        this.completed = !this.completed;
    }
    let toDo = { title, description, dueDate, priority, completed, toggleCompletion }
    publish('createdToDo', toDo)
}*/



const createProject = (name) => {
    let _toDos = [];
    projectTracker.setActiveProject(name);
    console.log('created project ' + name)

    function createToDo (title, description, dueDate, priority, completed) {
        if (projectTracker.getActiveProject !== name) return;
        function toggleCompletion() {
            this.completed = !this.completed;
        }
        let toDo = { title, description, dueDate, priority, completed, toggleCompletion }
        return toDo;
    }

    function addToDoToProject(toDo) {
        //if (activeProjectTracker.getActiveProject() == name) {
            _toDos.push(toDo);
            _notifyUpdatedToDos();
       // }
    }

    function getToDoByIndex(i) {
        return _toDos[i];
    }

    function removeToDoByIndex(i) {
        _toDos.splice(i, 1);
        _notifyUpdatedToDos();
    }

    function getAllToDos() {
        return _toDos;
    }

    function _notifyUpdatedToDos() {
        publish('updatedToDos', _toDos)
    }

    //why isn't any getting passed into this?
   function _updateToDo(title, description, dueDate, priority, completed, which) {
    console.log(_toDos)
        console.log('number ' + which + ' is ' + _toDos[which])
        _toDos[0].title = title;
        _toDos[0].description = description;
        _toDos[0].dueDate = dueDate;
        _toDos[0].priority = priority;
        _toDos[0].completed = completed;
        _notifyUpdatedToDos();
    }


    subscribe('createToDo',createToDo)
    subscribe('createdToDo', addToDoToProject)
    subscribe('deleteTile', removeToDoByIndex)
    subscribe('editToDo', _updateToDo)

    return { name, createToDo, getToDoByIndex, getAllToDos, removeToDoByIndex, }
}


export { createProject }