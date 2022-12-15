console.log('Hello Word');

// GET USERS
const getUsers = () => {
    const dataStorage = localStorage.getItem('users') 

    if(dataStorage) {
        return JSON.parse(dataStorage)
    } else {
        return []
    }
}

const arrayUsers = getUsers() 

// LOGIN

const validations = {
    email: {
        value: '',
        error: true,
    },
    password: {
        value: '',
        error: true,
    },
}

const emailForm = document.querySelector('#email-login')
const errorEmail = document.querySelector('#error-email-login')

const isEmail = (emailValue) => {
    const validationEmail = emailValue.includes('@')
    return validationEmail
}

emailForm.addEventListener('focusout', (e) => {
    if(emailForm.value === '') {
        emailForm.style.border = '1.5px solid red'
        errorEmail.textContent = 'Debe completar con un email'
        validations.email.error = true
    } else if (! isEmail(emailForm.value)) {
        emailForm.style.border = '1.5px solid red'
        errorEmail.textContent = 'Debe completar con un email válido'
        validations.email.error = true
    } else {
        emailForm.style.border = 'rgb(167, 167, 167) 1px solid'
        errorEmail.textContent = ''
        validations.email.error = false 
        validations.email.value = emailForm.value
    }
})


const passwordForm = document.querySelector('#password-login')
const errorPassword = document.querySelector('#error-password-login')

passwordForm.addEventListener('focusout', (e) => {
    if(passwordForm.value === '') {
        passwordForm.style.border = '1.5px solid red'
        errorPassword.textContent = 'Este campo no puede estar vacío, introduce una contraseña'
        validations.password.error = true
    } else if (passwordForm.value.length < 8) {
        passwordForm.style.border = '1.5px solid red'
        errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres'
        validations.password.error = true
    } else {
        passwordForm.style.border = 'rgb(167, 167, 167) 1px solid'
        errorPassword.textContent = '' 
        validations.password.error = false
        validations.password.value = passwordForm.value
    }
})

const loginForm = document.querySelector('#login-form')
const errorLogin = document.querySelector('#error-field')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(validations);

    if(validations.email.error || validations.password.error) {
        errorLogin.textContent = 'Alguno de los datos es incorrecto, por favor revise el formulario'
    } else {
        errorLogin.textContent = ""

        const userFound = arrayUsers.find(user => {
            return user.email === validations.email.value
        })
    
        if(userFound) {
            if(userFound.password === validations.password.value) {
                const userLogged = JSON.stringify(userFound)
                localStorage.setItem('userLogged', userLogged)

                window.location = './index.html'
            } else {
                errorLogin.textContent = 'Usuario o contraseña incorrecta'
            }
        } else {
            errorLogin.textContent = 'Usuario o contraseña incorrecta'
        }
    }
})