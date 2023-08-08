var payment_method;
var picker = document.querySelector('.payment-methods');
var payer = document.querySelector('.card-details');
var visaCard = document.querySelector('#visa-card');
var masterCard = document.querySelector('#master-card');
var paybalCard =document.querySelector('#paybal-card');
var americanExpressCard = document.querySelector('#americanexpress-card');
var picked_img = document.querySelector('.picked_img');

function visa() {
  payment_method = "visacard";
  picked_img.src = visaCard.querySelector('img').src;
  move();
}
function master() {
  payment_method = "mastercard";
  picked_img.src = masterCard.querySelector('img').src;
  move();
}
function americanExpress() {
  payment_method = "americanExpress";
  picked_img.src = americanExpressCard.querySelector('img').src;
  move();
}
function paybal() {
  payment_method = "paybal";
  picked_img.src = paybalCard.querySelector('img').src;
  move();
}
function move() {
  picker.classList.add('fade-out');
  setTimeout(() => {
    picker.classList.add('hide');
  }, 100);
  setTimeout(() => {
    payer.classList.remove('hide');
  }, 100);
}
function back() {
  picker.classList.remove('fade-out');
  picker.classList.add('fade-in');
  setTimeout(() => {
    picker.classList.remove('hide');
    payer.classList.add('hide');
  }, 100);

}
if(getCookie('cart')){
  document.querySelector('.total-pay').innerHTML=JSON.parse(getCookie('cart')).total;
}else{
  document.querySelector('.total-pay').innerHTML=" 0.0";
}
visaCard.addEventListener('click', visa);
masterCard.addEventListener('click', master);
americanExpressCard.addEventListener('click', americanExpress);
paybalCard.addEventListener('click', paybal);
document.querySelector('button.back').addEventListener('click', back);

