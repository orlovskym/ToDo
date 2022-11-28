import { subscribe, publish } from './pubsub'
import {initialize} from './toDoDOM'


const projectFactory = (name) => {
    console.log('i am a new project, my name is ' + name)
    let _toDos = [];

    function toDoFactory ({title, description, dueDate, priority, completed}) {
        console.log('making a todo named ' + title)
        function toggleCompletion() {
            this.completed = !this.completed;
        }
        let toDo = { title, description, dueDate, priority, completed, toggleCompletion }
        _toDos.push(toDo);
        notifyUpdatedToDos();
    }

    function editToDo({title, description, dueDate, priority, completed, index}) {
        let i = _toDos[index];
        i.title=title;
        i.description=description;
        i.dueDate=dueDate;
        i.priority=priority;
        i.completed=completed;
        notifyUpdatedToDos();
    }

    function getToDoByIndex(i) {
        return _toDos[i];
    }

    function removeToDoByIndex(i) {
        _toDos.splice(i, 1);
        notifyUpdatedToDos();
    }

    function getAllToDos() {
        return _toDos;
    }

    function notifyUpdatedToDos() {
        publish('updatedToDos', _toDos)
    }

    return {name, toDoFactory, editToDo, removeToDoByIndex, notifyUpdatedToDos};
}


const projectManager = (() => {
    let projects = [];
    let activeProject = undefined;

    const createProject = (name) => {
        projects.push(projectFactory(name));
        activeProject=projects[projects.length-1]
        _notifyUpdatedProjects();
    }

    const renameProject = (name,index) =>{
        projects[index].name=name;
        _notifyUpdatedProjects();
    }

    function _notifyUpdatedProjects() {
        publish('updatedProjects', projects);
        activeProject.notifyUpdatedToDos();
    }

    function setActiveProject(i){
        activeProject=projects[i-1];
        console.log(activeProject.name + ' is now active')
        _notifyUpdatedProjects();
    }

    function newToDo(toDo){
        activeProject.toDoFactory(toDo);
    }

    function editToDo(toDo){
        activeProject.editToDo(toDo);
    }

    function removeToDo(index){
        activeProject.removeToDoByIndex(index);
    }


    //initialize subscriptions and the default project
    //the problem is passing activeProject when subscribing, but not changing it later
    subscribe('createProject',createProject);
    publish('createProject','default')
    subscribe('createToDo',newToDo)
    subscribe('editToDo',editToDo)
    subscribe('deleteToDo',removeToDo)
    subscribe('changeActiveProject', setActiveProject);

    //testing content below
   publish('createToDo',{title:1,description:2,dueDate:3,priority:4,completed:5})
    publish('editToDo',({title:2,description:2,dueDate:3,priority:4,completed:5, index:0}))

})();

