const mediaTab = document.querySelectorAll('.media-tab');
const mediaTabContent = document.querySelectorAll('.media-tab-content');
const addToCartBtn = document.querySelectorAll('.add-to-cart-button');

// Media Tabs 

function selectTab(e) {
    // Remove all show and border classes
    removeActiveBorder();
    removeShow();
    // Add border to current tab item
    this.classList.add('active');
    // Grab content item from DOM
    const chosenTabContent = document.querySelector(`#${this.id}-content`);
    // Add show class to display the corresponding content
    chosenTabContent.classList.add('show');
}   

function removeActiveBorder(){
    mediaTab.forEach(tab => {
        tab.classList.remove('active');
    })
}

function removeShow(){
    mediaTabContent.forEach(tab => {
        tab.classList.remove('show');
    })
}

mediaTab.forEach(tab => {
    tab.addEventListener('click', selectTab);
})


// Shopping Page 

// Wait until the page is fully loaded to call the function
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

//Set up a clear page upon load by wrapping the basic functions in the ready() one.
function ready () {
    const removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      const button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem);
   }
  
    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
    }
  
    const addToCartButtons = document.getElementsByClassName('add-to-cart-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
      const button = addToCartButtons[i];
      button.addEventListener('click', addToCartClicked);
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
  }
  
  function purchaseClicked() {
    alert('Thank you for your purchase!');
    const cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }
  
  function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }
  
  function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

function addToCartClicked(event){
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.getElementsByClassName('cart-items')[0];
    cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
      if(cartItemNames[i].innerText == title) {
        alert('You already added this item!');
        return;
      }
    }
    const cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-item-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  }

  function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const priceElement = cartRow.getElementsByClassName('cart-item-price')[0];
      const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      const price = parseFloat(priceElement.innerText.replace('$', ''));
      const quantity = quantityElement.value;
      total = total + (price * quantity);
    }
    total = total + '.00';
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
  }