const forms = document.querySelector('.forms'),
      pwShowHide = document.querySelectorAll('.eye-icon'),
      links = document.querySelectorAll('.forms-link');

console.log(forms , pwShowHide , links);

pwShowHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener('click',()=>{
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll('.password');

        pwFields.forEach((password) => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("fa-regular" , "fa-solid");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("fa-solid" , "fa-regular");
        });
    });
});

function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "emailforstudyandwebsite27197@gmail.com",
        Password : "62FF85F8FADC6AD8409CA94BA13CC63922DB",
        To : 'uitquitq@gmail.com',
        From : document.getElementById("email").value,
        Subject : "New Contact Form Enquiry",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}