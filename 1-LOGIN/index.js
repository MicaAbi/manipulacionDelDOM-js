console.log('Estas logueado')

const getUserLogged = () => {
    const userLogged = localStorage.getItem('userLogged') 

    if(userLogged) {
        return JSON.parse(userLogged)
    } else {
        return undefined
    }
}

const dataUserLogged = getUserLogged()

if(dataUserLogged) {
    console.log(dataUserLogged)

    const welcome = document.querySelector('#welcome')
    const greetings = document.createElement('h1')
    greetings.textContent = `Bienvenid@ ${dataUserLogged.name}`

    welcome.appendChild(greetings)
} else {
    window.location  = './login.html'
}

const buttonSession = document.querySelector('#sign-off')

buttonSession.addEventListener('click', (e) => {
    localStorage.removeItem('userLogged')
    window.location  = './login.html'
})