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

// FETCH PRODUCTS IN JSON 

function showTopShoes(startIndex, endIndex) {
	let topProducts = document.getElementById("topProducts");
	fetch('https://raw.githubusercontent.com/CKimaru23/E-Commerce-Shoes/main/Assets/json/topProducts.json')
		.then(response => response.json())
		.then(data => {
			let shoes = data.shoes;
			let str = "";
			for (startIndex; startIndex < endIndex; startIndex++) {
				str += `
			<div class="p-body">
			<div class="circle" style="background: linear-gradient(239deg, ${shoes[startIndex].bgGradient[0]} 0%, ${shoes[startIndex].bgGradient[1]} 100%);"></div>
                <img class="shoesImg" src="${shoes[startIndex].imgSrc}" alt="shoes">
                <div class="rating">
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star clicked"></i>
                    <i class="fa fa-star"></i>
                </div>
				<div class="top-p-text">
                	<p class="top-p-name">${shoes[startIndex].name}</p>
					<p class="top-p-price">${shoes[startIndex].price}<span id="liveToastBtn" onClick="addProduct(${shoes[startIndex].id},'${shoes[startIndex].name}','${shoes[startIndex].price}','${shoes[startIndex].imgSrc}');" class="material-symbols-outlined addIcon">add_shopping_cart</span></p>
				</div>
            </div>
			`;
			}
			topProducts.innerHTML = str;
		})
		.catch(err => console.error(err));
}
showTopShoes(0, 4);
// SHOW NUMBER OF PRODUCT IN CART LOGO 

function addProduct(id, name, price, imgSrc) {
	clickAudio.play()
	let quantity = 1;
	let toastLiveExample = document.getElementById('liveToast')
	let cartProduct = localStorage.getItem('cartProduct');
	const toast = new bootstrap.Toast(toastLiveExample);
	if (cartProduct == null) {
		cartArr = [];
	} else {
		cartArr = JSON.parse(cartProduct);
	}

	for (let i = 0; i < cartArr.length; i++) {
		if (cartArr[i].id == id) {
			quantity = (cartArr[i].quantity) + 1;
			cartArr.splice(i, 1);
		}
	}
	let cartObj = {
		'id': id,
		'name': name,
		'price': price,
		'imgSrc': imgSrc,
		'quantity': quantity
	};
	cartArr.push(cartObj);
	localStorage.setItem('cartProduct', JSON.stringify(cartArr))
	toast.show();
	let cartCount = document.getElementById("cartCount");
	cartCount.innerText = cartArr.length;
}