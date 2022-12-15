console.log('Hello Word');

class User {
    constructor({name, lastName, email, password}) {
        this.userId = new Date().valueOf()
        this.name = name
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}

const users = [
    {
        userId: 0,
        name: 'Walter',
        lastName: 'White',
        email: 'walter@gmail.com',
        password: 'saymyname',
    },
    {
        userId: 1,
        name: 'Jesse',
        lastName: 'Pinkman',
        email: 'jesse@gmail.com',
        password: 'jesse1234',
    },
    {
        userId: 2,
        name: 'Saul',
        lastName: 'Goodman',
        email: 'jimmy@gmail.com',
        password: 'jimmy1234',
    },
]


// GET USERS
const getUsers = (mockedUsers) => {
    const dataStorage = localStorage.getItem('users') 

    if(dataStorage) {
        return JSON.parse(dataStorage)
    } else {
        localStorage.setItem('users', JSON.stringify(mockedUsers))
        return mockedUsers
    }
}

const arrayUsers = getUsers(users)


// REGISTER

const validations = {
    name: {
        value: '',
        error: true,
    },
    lastName: {
        value: '',
        error: true,
    },
    email: {
        value: '',
        error: true,
    },
    password: {
        value: '',
        error: true,
    },
    passwordRepeat: {
        value: '',
        error: true,
    },
}

const nameForm = document.querySelector('#name-input')
const errorName = document.querySelector('#error-name')

const nameValidation = () => {
    if(nameForm.value === '') {
        nameForm.style.border = '1.5px solid red'
        errorName.textContent = 'Este campo no puede estar vacío, introduce un nombre'
        validations.name.error = true
    } else if (nameForm.value.length < 3 || nameForm.value.length > 20) {
        nameForm.style.border = '1.5px solid red'
        errorName.textContent = 'El nombre debe contener al menos 3 caracteres y menos de 20'
        validations.name.error = true
    } else {
        nameForm.style.border = 'rgb(167, 167, 167) 1px solid'
        errorName.textContent = ''
        validations.name.error = false
        validations.name.value = nameForm.value
    }
}

nameForm.addEventListener('focusout', nameValidation)

const lastNameForm = document.querySelector('#last-name-input')
const errorLastName = document.querySelector('#error-last-name')

const lastNameValidation = () => {
    if(lastNameForm.value === '') {
        lastNameForm.style.border = '1.5px solid red'
        errorLastName.textContent = 'Este campo no puede estar vacío, introduce un apellido'
        validations.lastName.error = true
    } else if (lastNameForm.value.length > 20) {
        lastNameForm.style.border = '1.5px solid red'
        errorLastName.textContent = 'El apellido debe contener menos de 20 caracteres'
        validations.lastName.error = true
    } else {
        lastNameForm.style.border = 'rgb(167, 167, 167) 1px solid'
        errorLastName.textContent = ''
        validations.lastName.error = false
        validations.lastName.value = lastNameForm.value
    }
}

lastNameForm.addEventListener('focusout', lastNameValidation)

const emailForm = document.querySelector('#email-input')
const errorEmail = document.querySelector('#error-email')

const isEmail = (string) => {
    const validationEmail = string.includes('@')
    return validationEmail
}

const emailValidation = () => {
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
}

emailForm.addEventListener('focusout', emailValidation)

const passwordForm = document.querySelector('#password-input')
const errorPassword = document.querySelector('#error-password')

const passwordValidation = () => {
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
}

passwordForm.addEventListener('focusout', passwordValidation)

const passwordRepeatForm = document.querySelector('#password-repeat')
const errorPasswordR = document.querySelector('#error-password-repeat')

const passwordRepValidation = () => {
    if(passwordRepeatForm.value === '') {
        passwordRepeatForm.style.border = '1.5px solid red'
        errorPasswordR.textContent = 'Este campo no puede estar vacío, repite la contraseña'
        validations.passwordRepeat.error = true
    } else if (passwordRepeatForm.value.length < 8) {
        passwordRepeatForm.style.border = '1.5px solid red'
        errorPasswordR.textContent = 'Debes introducir al menos 8 caracteres'
        validations.passwordRepeat.error = true
    } else if (passwordRepeatForm.value === validations.password.value) {
        passwordRepeatForm.style.border = 'rgb(167, 167, 167) 1px solid'
        errorPasswordR.textContent = '' 
        validations.passwordRepeat.error = false
        validations.passwordRepeat.value = passwordRepeatForm.value
    } else {
        passwordRepeatForm.style.border = '1.5px solid red'
        errorPasswordR.textContent = 'El valor ingresado no coincide con su contraseña'
        validations.passwordRepeat.error = true
    }
}
passwordRepeatForm.addEventListener('focusout', passwordRepValidation)

const registerForm = document.querySelector('#register-form')
const errorRegister = document.querySelector('#error-field')

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    nameValidation()
    lastNameValidation()
    emailValidation()
    passwordValidation()
    passwordRepValidation()

    console.log(validations);

    if(validations.name.error || validations.lastName.error || validations.email.error || validations.password.error || validations.passwordRepeat.error) {
        errorRegister.textContent = 'Alguno de los datos es incorrecto, por favor revise el formulario'
    } else {
        errorRegister.textContent = ""

        const userFound = arrayUsers.find(user => {
            return user.email === validations.email.value
        })
    
        if(userFound) {
            errorEmail.textContent = 'El email ya se encuentra registrado'
        } else {
            const newUser = new User({
                name: validations.name.value,
                lastName: validations.lastName.value,
                email: validations.email.value,
                password: validations.password.value,
            })
        
            arrayUsers.push(newUser)
            const updatedUsers = JSON.stringify(arrayUsers)
        
            localStorage.setItem('users', updatedUsers)
            registerForm.reset()

            window.location = './login.html'
        }
    }
})