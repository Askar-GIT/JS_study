window.addEventListener('DOMContentLoaded', () => {

  const cartWrapper = document.querySelector('.cart__wrapper'),
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'),
    goodsBtn = document.querySelectorAll('.goods__btn'),
    products = document.querySelectorAll('.goods__item'),
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'),
    totalCost = document.querySelector('.cart__total > span'),
    titles = document.querySelectorAll('.goods__title'),
    empty = document.querySelector('.empty');

  function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = '';
  }

  open.addEventListener('click', openCart);
  close.addEventListener('click', closeCart);

  goodsBtn.forEach(function (btn, i) {
    btn.addEventListener('click', () => {
      let item = products[i].cloneNode(true),
        trigger = item.querySelector('button'),
        removeBtn = document.createElement('div');

      trigger.remove();

      showConfirm();

      removeBtn.classList.add('goods__item-remove');
      removeBtn.innerHTML = '&times';
      item.appendChild(removeBtn);

      cartWrapper.appendChild(item);

      calcGoods();
      calcTotal();
      removeFromCart();
      cartEmpty();
    });
  });

  function sliceTitle() {
    titles.forEach(function (item) {
      if (item.textContent.length < 70) {
        return;
      } else {
        const str = item.textContent.slice(0, 71) + '...';
        //const str = `${item.textContent.slice(0, 71)}...`;
        item.textContent = str;
      }
    });
  }
  sliceTitle();

  function showConfirm() {
    confirm.style.display = 'block';
    let counter = 100;
    const id = setInterval(frame, 10);

    function frame() {
      if (counter == 10) {
        clearInterval(id);
        confirm.style.display = 'none';
      } else {
        counter--;
        confirm.style.transform = `translateY(-${100-counter}px)`;
        confirm.style.opacity = '.' + counter;
      }
    }
  }

  function calcGoods() {
    const items = cartWrapper.querySelectorAll('.goods__item');
    badge.textContent = items.length;
  }

  function calcTotal() {
    const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
    let total = 0;
    prices.forEach(function (item) {
      total += +item.textContent;
    });
    totalCost.textContent = total;
  }

  function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
    removeBtn.forEach(function (btn) {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        calcGoods();
        calcTotal();
        cartEmpty();
      });
    });
  }

  function cartEmpty() {
    const item = cartWrapper.querySelectorAll('.goods__item');
    if (item.length > 0) {
      empty.style.display = 'none';
    } else {
      empty.style.display = 'block';
    }
  }
});