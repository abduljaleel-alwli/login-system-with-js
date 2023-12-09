
const authHero = document.getElementById('auth-hero')

// Sign up items
const signUp_username = document.getElementById('signUp-username')
const signUp_email = document.getElementById('signUp-email')
const signUp_password = document.getElementById('signUp-password')
const buttonsignUp = document.getElementById('signUp-button')

// Login items
const login_email = document.getElementById('login-email')
const login_password = document.getElementById('login-password')
const buttonLogin = document.getElementById('login-button')

// get forms
const signUpForm = document.getElementById('signUp-form')
const loginForm = document.getElementById('login-form')
const forms = document.querySelectorAll('form')

// update password items
const update_password_form = document.getElementById('update-password-form')
const update_Password = document.getElementById('update-password')
const button_update_password = document.getElementById('button-update-password')
const newPassword = document.getElementById('newPassword')
const newEmail = document.getElementById('newEmail')
const goToLogin = document.getElementById('goToLogin')
const confirmPassword = document.getElementById('confirmPassword')

// messages items
const body_signUp_message = document.getElementById('body-signUp-message')
const body_login_message = document.getElementById('body-login-message')
const body_update_password_message = document.getElementById('body-update-password-message')

const signUp_message = document.getElementById('signUp-message')
const login_message = document.getElementById('login-message')
const update_password_message = document.getElementById('update-password-message')

// Profile Items
const profile_username = document.getElementById('profile-username')
const profile_email = document.getElementById('profile-email')
const profile_password = document.getElementById('profile-password')
const update_profile = document.getElementById('update-profile')
const body_profile_message = document.getElementById('body-profile-message')
const profile_message = document.getElementById('profile-message')
const profile_name = document.getElementById('profile-name')

const profile_photo = document.getElementById('profile-photo')
const profile_photo_input = document.getElementById('profile-photo-input')
const show_profile = document.getElementById('show-profile')
const save_photo = document.getElementById('save-photo')

const user_icon = document.querySelectorAll('#user-icon')
const close_button = document.getElementById('close-button')
const profile_navbar = document.getElementById('profile-navbar')

// Header
const header = document.getElementById('header')


// Check Registration
const checkRegistration = () => {
    if (!localStorage.getItem('username') && !localStorage.getItem('email') && !localStorage.getItem('password')) {
        localStorage.setItem('checkRegistration', false)
        loginForm.style.display = 'none'
        signUpForm.style.display = 'block'
    }else{
        localStorage.setItem('checkRegistration', true)
        signUpForm.remove()
        loginForm.style.display = 'block'
    }
}
checkRegistration()

setTimeout(() => {
    document.documentElement.scrollTop = 0
}, 250);
// Scrolling
sessionStorage.removeItem('Registered')
sessionStorage.getItem('Registered') ?  header.style.position = 'fixed' : (
    document.documentElement.scrollTop = 0
);


// Show Data Function
const showDataOnLogedin = () => {

    chrome.storage.local.get(['key'], function (result) {
        logs = result.key;
        createTable(logs);
        var table = $('table').DataTable({
            "order": []
        });
        document.getElementById('spinner-box').style.display = "none";
        document.getElementById('spinner').style.display = "none";
        document.getElementById('non-spinner').style.display = "block";
        $('nav').append($('#DataTables_Table_0_filter'));

        $('#min').change( function() { table.draw(); } );
        $('#max').change( function() { table.draw(); } );
        // Add event listeners to the two range filtering inputs

    });
}

const submitForm = (event) => {
    // Preventing page refresh
    event.preventDefault();
}

// Calling a function during form submission.
forms.forEach(form => {
    form.addEventListener('submit', submitForm);
});

// Message Animation Function
const messageAnimation = (body, item, msg) => {
    body.classList.remove('message-animation')
    setTimeout(() => {
        item.innerText = `${msg}`
        body.classList.add('message-animation')
    }, 1);
}


// signUp Function
buttonsignUp.onclick = () => {
    
    if (signUp_username.value !== '' && !signUp_email.value && !signUp_password.value) {
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك إدخل البريد الإلكتروني وكلمة المرور')
     }else if (signUp_email.value !== '' && !signUp_username.value && !signUp_password.value) {
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك إدخال اسم المستخدم وكلمة المرور')
     }else if (signUp_password.value !== '' && !signUp_username.value && !signUp_email.value){
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك إدخال اسم المستخدم والبريد الإلكتروني')
    }else if (!signUp_username.value && !signUp_email.value && !signUp_password.value){
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك إدخل بياناتك')
    }else if (signUp_username.value !== '' && signUp_email.value  !== '' && !signUp_password.value){
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك إدخال كلمة المرور الخاصة بك')
    }else if (signUp_username.value !== '' && signUp_password.value  !== '' && !signUp_email.value){
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك إدخال البريد الإلكتروني الخاص بك')
    }else if (signUp_email.value !== '' && signUp_password.value  !== '' && !signUp_username.value){
        messageAnimation(body_signUp_message, signUp_message, 'من فضلك أدخل اسم المستخدم الخاص بك')
    }else{
        body_signUp_message.style.display = 'block'
    }

    // Save Data in LocalStorage
    if (signUp_username.value !== '' && signUp_email.value !== '' && signUp_password.value !== '' && checkRegistration) {
        localStorage.setItem('username', signUp_username.value)
        localStorage.setItem('email', signUp_email.value)
        localStorage.setItem('password', signUp_password.value)
    }
    
    checkRegistration()
}


// Login Function
buttonLogin.onclick = () => {

    if (login_email.value !== '' && !login_password.value) {
        messageAnimation(body_login_message, login_message, 'من فضلك إدخال كلمة المرور الخاصة بك')
    }else if (login_password.value !== '' && !login_email.value) {
        messageAnimation(body_login_message, login_message, 'من فضلك إدخال البريد الإلكتروني الخاص بك')
    }else if (!login_email.value && !login_password.value){
        messageAnimation(body_login_message, login_message, 'من فضلك إدخل البريد الإلكتروني وكلمة المرور')
    }
    
    if (login_email.value !== '' && login_password.value !== '') {
        if ( localStorage.getItem('email') == login_email.value  && localStorage.getItem('password') == login_password.value ) {
            authHero.remove()
            sessionStorage.setItem('Registered', true)
            showDataOnLogedin()
        }else{
            messageAnimation(body_login_message, login_message, 'كلمة المرور أو البريد الإلكتروني غير صحيحين')
        }
        console.log('تم تسجيل الدخول بنجاح');
    }
}


goToLogin.onclick = () => {
    signUpForm.style.display = 'none'
    loginForm.style.display = 'block'
    update_password_form.style.display = "none"
}


// Update Password Funciton
update_Password.onclick = () => {
    signUpForm.style.display = 'none'
    loginForm.style.display = 'none'
    button_update_password.style.display = 'inline-block'
    update_password_form.style.display = "inline-block"
}

button_update_password.onclick = () => {

    if (newEmail.value !== '' && !newPassword.value && !newPassword.value) {
        messageAnimation(body_update_password_message, update_password_message, 'من فضلك إدخال كلمة المرور الخاصة بك')
    }else if (newPassword.value !== '' && !newEmail.value) {
        messageAnimation(body_update_password_message, update_password_message, 'من فضلك إدخال البريد الإلكتروني الخاص بك')
    }else if (!newEmail.value && !newPassword.value){
        messageAnimation(body_update_password_message, update_password_message, 'من فضلك إدخال بريدك الإلكتروني وكلمة المرور الجديدة')
    }else if (newPassword.value !== '' && !confirmPassword.value){
        messageAnimation(body_update_password_message, update_password_message, 'من فضلك إعد كتابة كلمة مرورك')
    }else if (newPassword.value !== confirmPassword.value){
        messageAnimation(body_update_password_message, update_password_message, 'عذرا كلمة مرورك لاتتطابق مع الأخرى')
    }
     
    if (newEmail.value !== '' && newPassword.value !== '' && confirmPassword.value !== '') {

        if (localStorage.getItem('email') !== newEmail.value) {
            messageAnimation(body_update_password_message, update_password_message, 'لم يتم العثور على البريد الإلكتروني')
        }

        if (localStorage.getItem('email') === newEmail.value && confirmPassword.value == newPassword.value) {
            localStorage.setItem('password', newPassword.value)
            messageAnimation(body_update_password_message, update_password_message, 'تم تحديث كلمة المرور بنجاح')
            setTimeout(() => {
                update_password_message.innerText = 'تغيير كلمة المرور'
                signUpForm.style.display = 'none'
                loginForm.style.display = 'block'
                update_password_form.style.display = "none"
                button_update_password.style.display = 'none'
            }, 2500);
        }
    }

}


//=================== Profile =====================
profile_name.innerText = localStorage.getItem('username')
profile_username.value = localStorage.getItem('username')
profile_email.value = localStorage.getItem('email')

const updateProfile = () => {
    if (profile_username.value !== '' && !profile_email.value && !profile_password.value) {
        messageAnimation(body_profile_message, profile_message, 'من فضلك إدخل البريد الإلكتروني وكلمة المرور')
     }else if (profile_email.value !== '' && !profile_username.value && !profile_password.value) {
        messageAnimation(body_profile_message, profile_message, 'من فضلك إدخال اسم المستخدم وكلمة المرور')
     }else if (profile_password.value !== '' && !profile_username.value && !profile_email.value){
        messageAnimation(body_profile_message, profile_message, 'من فضلك إدخال اسم المستخدم والبريد الإلكتروني')
    }else if (!profile_username.value && !profile_email.value && !profile_password.value){
        messageAnimation(body_profile_message, profile_message, 'من فضلك إدخل بياناتك')
    }else if (profile_username.value !== '' && profile_email.value  !== '' && !profile_password.value){
        messageAnimation(body_profile_message, profile_message, 'من فضلك إدخال كلمة المرور الخاصة بك')
    }else if (profile_username.value !== '' && profile_password.value  !== '' && !profile_email.value){
        messageAnimation(body_profile_message, profile_message, 'من فضلك إدخال البريد الإلكتروني الخاص بك')
    }else if (profile_email.value !== '' && profile_password.value  !== '' && !profile_username.value){
        messageAnimation(body_profile_message, profile_message, 'من فضلك أدخل اسم المستخدم الخاص بك')
    }
    
    //  Check the data match
    else if (profile_email.value != localStorage.getItem('email') && profile_password.value != localStorage.getItem('password')){
        messageAnimation(body_profile_message, profile_message, 'بياناتك خاطئه')
    }else if (profile_email.value != localStorage.getItem('email') && profile_password.value == localStorage.getItem('password')){
        messageAnimation(body_profile_message, profile_message, 'كلمة المرور أو البريد الإلكتروني غير صحيحين')
    }
    else if (profile_email.value == localStorage.getItem('email') && profile_password.value != localStorage.getItem('password')){
        messageAnimation(body_profile_message, profile_message, 'كلمة المرور أو البريد الإلكتروني غير صحيحين')
    }
    else if (profile_email.value == localStorage.getItem('email') && profile_password.value == localStorage.getItem('password') && profile_username.value == localStorage.getItem('username')){
        messageAnimation(body_profile_message, profile_message, 'إسم المستخدم موجود بالفعل')
    }else{
        body_profile_message.style.display = 'block'
    }

    // Save Data in LocalStorage
    if (profile_username.value !== '' && profile_username.value != localStorage.getItem('username') && profile_email.value == localStorage.getItem('email') && profile_password.value == localStorage.getItem('password')) {
        localStorage.setItem('username', profile_username.value)
        profile_name.innerText = localStorage.getItem('username')
        messageAnimation(body_profile_message, profile_message, 'تم تحديث بياناتك بنجاح')
    }
}


update_profile.addEventListener('click', () => {
    updateProfile()
    profile_password.value = ''
})


// Save Photo
profile_photo.style =  `background: url(${ localStorage.getItem('image')})`
show_profile.style =  `background: url(${ localStorage.getItem('image')})`
if (localStorage.getItem('image')) {
    user_icon.forEach(icon => {
        icon.style.display = 'none'
    });
}
profile_photo_input.addEventListener('change', event => {
  // 👇️ Save the image to localStorage
  const image = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    profile_photo.style =  `background: url(${reader.result})`
    save_photo.style.display = 'block'
    user_icon.forEach(icon => {
        icon.style.display = 'none'
    });

    save_photo.addEventListener('click', () => {
        localStorage.setItem('image', reader.result);
        // 👇️ Take the image from localStorage and display it
        profile_photo.style =  `background: url(${ localStorage.getItem('image')})`
        show_profile.style =  `background: url(${ localStorage.getItem('image')})`
        save_photo.style.display = 'none'
        messageAnimation(body_profile_message, profile_message, ` ${localStorage.getItem('username')} تبدو رائعاً `)
    })
  });

  if (image) {
    reader.readAsDataURL(image);
  }
});

close_button.addEventListener('click', () => {
    profile_navbar.classList.remove('opened-profile-navbar')
    profile_navbar.classList.add('closed-profile-navbar')
})

show_profile.addEventListener('click', () => {
    profile_navbar.classList.remove('closed-profile-navbar')
    profile_navbar.classList.add('opened-profile-navbar')
})

