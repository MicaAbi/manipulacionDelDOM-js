console.log("Hello word");

class Task {
    constructor({name, status}) {
        this.name = name
        this.status = status
        this.id = new Date().valueOf()
    }
}

const getData = () => {
    const dataStorage = localStorage.getItem('tasks') 

    if(dataStorage) {
        return JSON.parse(dataStorage)
    } else {
        return []
    }
}

const arrayTasks = getData() 


// Section Add Task:
const taskName = document.querySelector('#task-title')
const formAddTask = document.querySelector('#form-new-task')


formAddTask.addEventListener('submit', (e) => {
    e.preventDefault()

    const task = new Task({
        name: e.target[0].value,
        status: 'to-do'
    })

    arrayTasks.push(task)
    const updatedTasks = JSON.stringify(arrayTasks)

    localStorage.setItem('tasks', updatedTasks)
    loadTotal()
    loadInProgress()
    loadCompleted()
    loadTasks()
    
    formAddTask.reset()
})


// Section Task Panel:

const total = document.querySelector("#total-task > p")

const loadTotal = () => {
    total.innerText = arrayTasks.length
}

loadTotal()

const inProgress = document.querySelector("#inprogress-task > p")

const loadInProgress = () => {
    let counter = 0

    arrayTasks.forEach(task => {
        if(task.status === 'in-progress') {
            counter++
        }
    })

    inProgress.innerText = counter
}

loadInProgress()

const completed = document.querySelector("#completed-task > p")

const loadCompleted = () => {
    let counter = 0

    arrayTasks.forEach(task => {
        if(task.status === 'completed') {
            counter++
        }
    })

    completed.innerText = counter
}

loadCompleted()


// Section Task List:
const tasksContainer = document.querySelector('#tasks-list')

const loadTasks = () => {
    tasksContainer.innerHTML = ''

    if (arrayTasks.length === 0) {
        const h4 = document.createElement('h4')
        h4.innerText = "No hay tareas"
    
        tasksContainer.appendChild(h4)
    } else {
        const tasksList = []
    
        arrayTasks.forEach(task => {
            const taskBox = document.createElement('div')
            taskBox.classList.add('task-box')
            const nameTask = document.createElement('p')
            nameTask.innerHTML = task.name

            const start = document.createElement('button')
            const completed = document.createElement('button')
            const deleteButton = document.createElement('button')

            switch(task.status) {
                case 'to-do':
                    start.classList.add('btn')
                    start.innerText = 'Comenzar'
                    start.onclick = () => startTask(task.id)
        
                    completed.classList.add('btn')
                    completed.innerText = 'Finalizar'
                    completed.onclick = () => completeTask(task.id)
        
                    deleteButton.classList.add('btn-delete')
                    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
                    deleteButton.onclick = () => deleteTask(task.id)
                    break;
                case 'in-progress':
                    start.classList.add('btn-started')
                    start.innerText = 'Comenzada'
                    start.onclick = () => toDoTask(task.id)

                    completed.classList.add('btn')
                    completed.innerText = 'Finalizar'
                    completed.onclick = () => completeTask(task.id)
        
                    deleteButton.classList.add('btn-delete')
                    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
                    deleteButton.onclick = () => deleteTask(task.id)
                    break;
                case 'completed':
                    start.classList.add('btn')
                    start.innerText = 'Comenzar'
                    start.onclick = () => startTask(task.id)
        
                    completed.classList.add('btn-completed')
                    completed.innerText = 'Finalizada'
                    completed.onclick = () => toDoTask(task.id)
        
                    deleteButton.classList.add('btn-delete')
                    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
                    deleteButton.onclick = () => deleteTask(task.id)
            }

            taskBox.append(nameTask, start, completed, deleteButton)
    
            tasksList.push(taskBox)
        })
    
        tasksContainer.append(...tasksList)
    }
}

loadTasks()

const toDoTask = (id) => {
    arrayTasks.forEach(task => {
        if(task.id === id) {
            task.status = 'to-do'
        }
    })

    let updatedTasks = JSON.stringify(arrayTasks)
    localStorage.setItem('tasks', updatedTasks)
    loadTotal()
    loadInProgress()
    loadCompleted()
    loadTasks()
}

const startTask = (id) => {
    arrayTasks.forEach(task => {
        if(task.id === id) {
            task.status = 'in-progress'
        }
    })

    let updatedTasks = JSON.stringify(arrayTasks)
    localStorage.setItem('tasks', updatedTasks)
    loadTotal()
    loadInProgress()
    loadCompleted()
    loadTasks()
}

const completeTask = (id) => {
    arrayTasks.forEach(task => {
        if(task.id === id) {
            task.status = 'completed'
        }
    })

    let updatedTasks = JSON.stringify(arrayTasks)
    localStorage.setItem('tasks', updatedTasks)
    loadTotal()
    loadInProgress()
    loadCompleted()
    loadTasks()
}


const deleteTask = (id) => {
    const taskToDelete = arrayTasks.find(task => {
        return task.id === id
    })

    const indexTask = arrayTasks.indexOf(taskToDelete)

    arrayTasks.splice(indexTask, 1)

    let updatedTasks = JSON.stringify(arrayTasks)
    localStorage.setItem('tasks', updatedTasks)
    loadTotal()
    loadInProgress()
    loadCompleted()
    loadTasks()
}