document.addEventListener('DOMContentLoaded', function () {
    var loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', checkLoginPswd);
    
 this.hidden { var pass= ["hi"] }
    function checkLoginPswd() {
        var validPasswords = ["wyattsfiles", "momspassword", "guestpassword"];
        var loginPassword = document.getElementById("loginPswd").value;

        if (validPasswords.includes(loginPassword)) {
            window.location = "mainws.html";
        } else {
            alert("Incorrect password for login.");
        }
    }
});
