/* 
 -- prodcut data from backend --
*/
var top_products = {
  id: [1, 2,3,4,5],
  names: ["شاي الشتاء", "شاي الاحمر","شاي الشتاء", "شاي الاحمر", "شاي الاحمر"],
  img: ["assets/images/winter-tea.jpg", "assets/images/winter-tea.jpg","assets/images/winter-tea.jpg", "assets/images/winter-tea.jpg", "assets/images/winter-tea.jpg"],
  price: [20.40, 85.0,20,20,20],
};

/*
 -- cart data for backend , send id of products and quantity each of them  --
*/
var cart = {
  products: {
    id: [],
    names: [],
    qty: []
  },
  total: 0
};

/* functions of cart */
show_products(top_products, "best-products");
show_products(top_products, "top-sellers");
refresh_cart();
document.querySelector('.cart-btn').addEventListener('click', () => [
  document.querySelector('body > .cart').classList.remove('hide')
]);
document.querySelector('.btnexit').addEventListener('click', () => {
  document.querySelector('body > .cart').classList.add('hide')
});
document.querySelectorAll('.add-to-cart').forEach((element) => {
  element.addEventListener('click', () => {
    let id = element.getAttribute('data-id');
    if (is_in_cart(id)) {
      cart.products.qty[cart.products.id.indexOf(parseInt(id))]++;
      refresh_cookies();
    } else {
      cart.products.id.push(parseInt(id));
      cart.products.names.push(top_products.names[top_products.id.indexOf(parseInt(id))]);
      cart.products.qty.push(1);
      refresh_cookies();
    }
  });
});

function AddEventCheckbox() {
  document.querySelectorAll('input.checkProduct').forEach((element) => {
    element.addEventListener('click', () => {
      calc_final_total();
    });
  });
}

function getCookie(name) {
  var cookies = document.cookie.split('; ');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
}


function refresh_cookies() {
  calc_final_total();
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  document.cookie = "cart=" + encodeURIComponent(JSON.stringify(cart)) + "; expires=" + expirationDate.toUTCString() + "; path=/";
  refresh_cart();
}


function show_products(products, selector) {
  for (let i = 0; i < products.id.length; i++) {
    document.querySelector(`.${selector} .products`).innerHTML += `
    <div class="product">
    <a href="">
        <div class="image"><img src="${products.img[i]}" alt=""></div>
        </a>
        <div class="content">
            <div class="title">${products.names[i]}</div>
            <div class="price">${products.price[i]} <span>ريال</span> </div>
            <div class="buttons">
                <button type="button" class="add-to-cart" data-id="${products.id[i]}"><i class="bi bi-cart"></i> اضافة الى السلة</button>
                <button type="button" class="add-to-wishlist" data-id="${products.id[i]}"><i class="bi bi-star"></i></button>
            </div>
        </div>

  </div>
    `;
  }
}

function refresh_cart() {
  if (getCookie('cart')) {
    cart = JSON.parse(getCookie('cart'));
  }
  document.querySelector(".cart-btn .count span").innerHTML = cart.products.id.length ? cart.products.id.length : 0;
  document.querySelector(".total-items").innerHTML = cart.products.id.length ? cart.products.id.length : 0;
  document.querySelector('.cart .products').innerHTML = "";
  for (let i = 0; i < cart.products.id.length; i++) {
    document.querySelector('.cart .products').innerHTML += `
      <div class="product" data-id="${cart.products.id[i]}">
                    <input type="checkbox" name="" class="checkProduct" data-id="${cart.products.id[i]}">
                    <img src="${top_products.img[top_products.id.indexOf(cart.products.id[i])]}" alt="">
                    <div class="qty">
                        <p>${cart.products.names[i]}</p>
                        
                        <div class="qty-control">
                            <button data-id="${cart.products.id[i]}" class="increase" type="button">+</button>
                            <span>QTY : <span class="qty-count">${cart.products.qty[i]}</span></span>
                            <button data-id="${cart.products.id[i]}" class="decrease" type="button">-</button>
                        </div>
                  </div>
                  <p class="price">${top_products.price[top_products.id.indexOf(cart.products.id[i])]} ريال</p>
            <button class="delete" type="button"><i class="bi bi-trash"></i></button>
       </div>
      `;
  }
  addEventDelete();
  qtyEvent("increase");
  qtyEvent("decrease");
  subtotal();
  AddEventCheckbox();
}
function containsValue(arr, value) {
  for (const item of arr) {
    if (item == value) {
      return true;
    }
  }
  return false;
}
function is_in_cart(id) {
  tmp_cart = JSON.parse(getCookie('cart'));
  if (tmp_cart == null) return false;
  else {
    tmp_products_ids = tmp_cart.products.id;
    return containsValue(tmp_products_ids, id);
  }
}


function calc_final_total() {
  sum = 0;
  products_in_cart = document.querySelectorAll('.cart .product');
  for (let i = 0; i < products_in_cart.length; i++) {
    checkbox = products_in_cart[i].querySelector('input');
    if (checkbox.checked) {
      sub_total = top_products.price[top_products.id.indexOf(cart.products.id[i])] * cart.products.qty[i];
      sum += sub_total;
    }
  }
  cart.total = sum.toFixed(2);
  document.querySelector('.final-total').innerHTML = sum.toFixed(2);
}
function addEventDelete() {
  document.querySelectorAll('.cart .product').forEach((element) => {
    element.querySelector('.delete').addEventListener('click', () => {
      id = element.getAttribute('data-id');
      index = cart.products.id[cart.products.id.indexOf(id)];
      cart.products.id.splice(index, 1);
      cart.products.names.splice(index, 1);
      cart.products.qty.splice(index, 1);
      element.remove();
      document.querySelector(".cart-btn .count span").innerHTML = cart.products.id.length ? cart.products.id.length : 0;
      document.querySelector(".total-items").innerHTML = cart.products.id.length ? cart.products.id.length : 0;
      refresh_cookies();
    });
  });
}
function subtotal() {
  document.querySelectorAll('.cart .product').forEach(element => {
    id = parseInt(element.getAttribute('data-id'));
    price = top_products.price[top_products.id.indexOf(id)];
    quantity = cart.products.qty[cart.products.id.indexOf(id)];
    element.querySelector('.price').innerHTML = `<span>${(price * quantity).toFixed(2)} ريال</span> `;
    calc_final_total();
  });
}
function qtyEvent(selector) {
  document.querySelectorAll('.cart .product').forEach((element) => {
    element.querySelector(`.${selector}`).addEventListener('click', () => {
      id = parseInt(element.getAttribute('data-id'));
      if (selector == "increase")
        qty = cart.products.qty[cart.products.id.indexOf(id)]++;
      else {
        if (cart.products.qty[cart.products.id.indexOf(id)] > 1) {
          qty = cart.products.qty[cart.products.id.indexOf(id)]--;
        }
      }
      price = top_products.price[top_products.id.indexOf(id)]
      element.querySelector('.qty-count').innerHTML = cart.products.qty[cart.products.id.indexOf(id)];
      refresh_cookies();
    });
  });
}

