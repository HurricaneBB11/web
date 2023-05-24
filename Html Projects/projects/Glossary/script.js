function checkPswd(event) {
	event.preventDefault();
	var passwords = ["wyattsfiles", "momspassword", "batmanbatman"]; // Array of valid passwords
	var password = document.getElementById("pswd").value;
	
	if (passwords.includes(password)) {
		window.location = "hp.html";
	} else {
		alert("Incorrect Password.");
	}
}
