// SCROLL BUTTON CODE
let mybutton = document.getElementById("myBtn");

let clickAudio = document.getElementById("myAudio");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function preLoader() {
	let loading = document.getElementById("loading");
	let main = document.getElementById("main");
	loading.style.display = "none";
	main.style.display = "block";
}

//Dark mode toggle
let x = document.createElement("LINK");
x.setAttribute("rel", "stylesheet");
x.setAttribute("type", "text/css");
x.setAttribute("href", "./Assets/css/dark.css");

let mode = document.getElementById('mode');
mode.addEventListener('click', () => {
	if (mode.src.match("moon")) {
		mode.src = "./Assets/img/sunrise.avif";
		document.head.appendChild(x);
	} else {
		mode.src = "./Assets/img/moon.avif";
		document.head.removeChild(x);
	}
});

//function to go to top
function scrollFunction() {
    // depends with the browser that is why there is an or in the if-statement
	if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}