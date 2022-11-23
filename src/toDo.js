import { subscribe, publish } from './pubsub'

const activeProjectTracker = (() => {
    let _activeProject = null;

    function setActiveProject(name) {
        _activeProject = name;
    }

    function getActiveProject() {
        return (_activeProject)
    }

    return { setActiveProject, getActiveProject }
})();


const createToDo = (title, description, dueDate, priority, completed) => {

    function toggleCompletion() {
        this.completed = !this.completed;
    }

    publish('createToDo', { title, description, dueDate, priority, completed, toggleCompletion })
}


const createProject = (name) => {
    let _toDos = [];
    activeProjectTracker.setActiveProject(name);
    console.log('created project ' + name)

    function addToDo(toDo) {
        if (activeProjectTracker.getActiveProject() == name) {
            _toDos.push(toDo);
            _notifyUpdatedToDos();
        }
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

    function _notifyUpdatedToDos(){
        publish ('updatedToDos', _toDos)
    }

    subscribe('createToDo', addToDo)

    return { name, addToDo, getToDoByIndex, getAllToDos, removeToDoByIndex, }
}


export { createToDo, createProject }