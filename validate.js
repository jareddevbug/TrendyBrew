
function UserInfo () {

	var userEmail = document.getElementById('email').value
	
	if (userEmail === ""){
	var loginPageUrl = '127.0.0.1:5500/trendy-brew/login.html';
	window.location.href = loginPageUrl;
    console.log('false');
	}
	else{
		var bookingPageUrl = '127.0.0.1:5500/trendy-brew/booking.html';
	window.location.href = bookingPageUrl;
    console.log('true');
	}
	
	}