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
        _notifyUpdatedToDos();
    }

    function editToDo({title, description, dueDate, priority, completed, index}) {
        let i = _toDos[index];
        i.title=title;
        i.description=description;
        i.dueDate=dueDate;
        i.priority=priority;
        i.completed=completed;
        _notifyUpdatedToDos();
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

    return {name, toDoFactory, editToDo};
}


const projectManager = (() => {
    let projects = [];
    let activeProject = undefined;

    const createProject = (name) => {
        projects.push(projectFactory(name));
        activeProject=projects[projects.length-1]
    }

    const renameProject = (name,index) =>{
        projects[index].name=name;
    }


    //initialize subscriptions and the default project
    subscribe('createProject',createProject);
    publish('createProject','default')
    subscribe('createToDo',activeProject.toDoFactory)
    subscribe('editToDo',activeProject.editToDo)

    //testing content below
  /*  publish('createToDo',{title:1,description:2,dueDate:3,priority:4,completed:5})
    publish('editToDo',({title:2,description:2,dueDate:3,priority:4,completed:5, index:0}))
    console.log(projects)*/

})();

