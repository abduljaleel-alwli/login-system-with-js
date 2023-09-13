const authHero = document.getElementById('auth-hero')
const message = document.getElementById('message')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const buttonSignIn = document.getElementById('button-signIn')
const buttonLogin = document.getElementById('button-login')

const signinAndLoginForm = document.getElementById('signin-and-login-form')
const forms = document.querySelectorAll('form')

const usernameName = document.getElementById('username-name')

const updatePassword = document.getElementById('updatePassword')
const button_update_password = document.getElementById('button-updatePassword')
const updatePasswordForm = document.getElementById('update-password-form')
const newPassword = document.getElementById('newPassword')
const newEmail = document.getElementById('newEmail')
const goToLogin = document.getElementById('goToLogin')
const newMessage = document.getElementById('newMessage')

const submitForm = (event) => {
    //Preventing page refresh
    event.preventDefault();
}
//Calling a function during form submission.
forms.forEach(form => {
    form.addEventListener('submit', submitForm);
});

// Signin Function
buttonSignIn.onclick = () => {
    
    if (username.value !== '' && !email.value && !password.value) {
        message.innerText = 'Plase enter your Email And Password'
     }else if (email.value !== '' && !username.value && !password.value) {
        message.innerText = 'Plase enter your UserName And Password'
     }else if (password.value !== '' && !username.value && !email.value){
        message.innerText = 'Plase Enter your UserName And Email'
    }else if (!username.value && !email.value && !password.value){
        message.innerText = 'Plase Enter your UserName And Email And Password'
    }else if (username.value !== '' && email.value  !== '' && !password.value){
        message.innerText = 'Plase Enter your Password'
    }else if (username.value !== '' && password.value  !== '' && !email.value){
        message.innerText = 'Plase Enter your Email'
    }else if (email.value !== '' && password.value  !== '' && !username.value){
        message.innerText = 'Plase Enter your UserName'
    }else{
        message.innerText = ''
    }

    // Save Data in LocalStorage
    if (username.value !== '' && email.value !== '' && password.value !== '') {
        localStorage.setItem('username', username.value)
        localStorage.setItem('email', email.value)
        localStorage.setItem('password', password.value)
    }

    // Upadate SignIn form to Login form
    if (localStorage.getItem('username') && localStorage.getItem('email') && localStorage.getItem('password')) {
        username.style.display = 'none'
        buttonSignIn.style.display = 'none'
        usernameName.style.display = 'none'
        buttonLogin.style.display = 'inline-block'
        updatePassword.style.display = 'inline-block'
        console.log("signed");
    }
}

updatePassword.style = 'display: none !important'
updatePasswordForm.style.display = 'none'
button_update_password.style.display = "none"

if (localStorage.getItem('username') && localStorage.getItem('email') && localStorage.getItem('password')) {
    username.style.display = 'none'
    buttonSignIn.style.display = 'none'
    usernameName.style.display = 'none'
    updatePassword.style.display = 'inline-block'
    console.log("signed");
}else{
    buttonLogin.style.display = 'none'
}


// Login Function
buttonLogin.onclick = () => {

    if (email.value !== '' && !password.value) {
       message.innerText = 'Plase enter your Password'
    }else if (password.value !== '' && !email.value) {
       message.innerText = 'Plase enter your Email'
    }else if (!email.value && !password.value){
       message.innerText = 'Plase Enter your Email And Password'
    }
    
    if (email.value !== '' && password.value !== '') {
        if ( localStorage.getItem('email') == email.value  && localStorage.getItem('password') == password.value ) {
            console.log('Welcome');
            authHero.style.display = 'none'
        }else{
            message.innerText = 'Password or email is not Found'
        }
        console.log('is content');
    }
    
}

// Update Password Funciton
updatePassword.onclick = () => {
    signinAndLoginForm.style.display = 'none'
    button_update_password.style.display = 'inline-block'
    updatePasswordForm.style.display = "inline-block"
}

button_update_password.onclick = () => {

    if (newEmail.value !== '' && !newPassword.value) {
        newMessage.innerText = 'Plase enter your Password'
    }else if (newPassword.value !== '' && !newEmail.value) {
       newMessage.innerText = 'Plase enter your Email'
    }else if (!newEmail.value && !newPassword.value){
       newMessage.innerText = 'Plase Enter your Email And New Password'
    }
     
    if (newEmail.value !== '' && newPassword.value !== '') {

        if (localStorage.getItem('email') !== newEmail.value) {
            newMessage.innerText = 'email is not Found'
        }
        if (localStorage.getItem('email') === newEmail.value) {
            localStorage.setItem('password', newPassword.value)
            signinAndLoginForm.style.display = 'block'
            button_update_password.style.display = 'none'
            updatePasswordForm.style.display = "none"
            message.innerText = 'Updated Password Success'
        }
    }

}
goToLogin.onclick = () => {
    signinAndLoginForm.style.display = 'block'
    button_update_password.style.display = 'none'
    updatePasswordForm.style.display = "none"
}