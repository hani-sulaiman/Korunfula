wishButton = document.querySelector('.favorite-btn');
wishButton.addEventListener('click', () => {
    document.querySelector('.favourit').classList.remove('hide');
})
document.querySelector('.btnexit-fav').addEventListener('click', () => {
    document.querySelector('.favourit').classList.add('hide')
});
wishlist = { ids: [], count: 0 };
refresh_wishlist();
refresh_Star();
document.querySelectorAll('button.add-to-wishlist').forEach((element) => {
    element.addEventListener("click", () => {
        id = element.getAttribute('data-id');
        if (is_in_wishlist(id)) {
            wishlist = { ids: wishlist.ids.filter(item => item !== id), count: wishlist.count - 1 };
        } else {
            wishlist.ids.push(id);
            wishlist.count++;
        }
        setWishlist();
        refresh_wishlist();
        refresh_Star();
    });
});
function addEventDeleteWishlist() {
    document.querySelectorAll('.favourit .product').forEach((element) => {
      element.querySelector('.delete').addEventListener('click', () => {
        id = element.getAttribute('data-id');
        index =  wishlist.ids[wishlist.ids.indexOf(id)];
        wishlist.ids.splice(index, 1);
        wishlist.count--;
        element.remove();
        setWishlist();
        refresh_wishlist();
        refresh_Star();
      });
    });
  }
function refresh_Star() {
    document.querySelectorAll('.add-to-wishlist').forEach(btn=>{
     if(btn.querySelector('.bi-star-fill')){
         if(!is_in_wishlist(btn.getAttribute('data-id'))){
            btn.querySelector(`.bi`).classList.remove('bi-star-fill');
            btn.querySelector(`.bi`).classList.add('bi-star');
         }
     }else if(btn.querySelector('.bi-star')){
        if(is_in_wishlist(btn.getAttribute('data-id'))){
            btn.querySelector(`.bi`).classList.remove('bi-star');
            btn.querySelector(`.bi`).classList.add('bi-star-fill');
         }
     }
    });
}

function is_in_wishlist(id) {
    for (let i = 0; i < wishlist.ids.length; i++) {
        if (wishlist.ids[i] == id) {
            return true;
        }
    }
    return false;
}
function setCountWishlist() {
    document.querySelector('.favorite-btn .count span').innerHTML = wishlist.count;
    document.querySelector('.favourit .total-items').innerHTML = wishlist.count;
}
function setWishlist() {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = "wishlist=" + encodeURIComponent(JSON.stringify(wishlist)) + "; expires=" + expirationDate.toUTCString() + "; path=/";
}
function refresh_wishlist() {
    if (getCookie('wishlist')) {
        wishlist = JSON.parse(getCookie('wishlist'));
    }
    show_products_wishlist();
    addEventDeleteWishlist();
    setCountWishlist();
}
function show_products_wishlist() {

    document.querySelector('.favourit .products').innerHTML = "";
    for (let i = 0; i < wishlist.ids.length; i++) {
        value = wishlist.ids[i].toString();
        ids = top_products.id;

        document.querySelector('.favourit .products').innerHTML += `
        <div class="product" data-id="${get_index(ids, value)}">
           <img src="${top_products.img[get_index(ids, value)]}" alt="">
           <p>${top_products.names[get_index(ids, value)]}</p>
           <button class="delete" type="button"><i class="bi bi-trash"></i></button>
        </div>
        `;
    }
}
function get_index(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            return i;
        }
    }
    return -1;
}

