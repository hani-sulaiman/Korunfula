class Slider {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.scaleSlider = 0;
        this.productsSelector = `.${this.element.className} .products`;

        if (this.element.querySelector('button.left')) {
            this.element.querySelector('button.left').addEventListener('click', () => {
                if(this.isLaptop()){
                    if (this.scaleSlider < 0) {
                        this.scaleSlider += 360;
                    }
                }else{
                    if (this.scaleSlider < 0) {
                        this.scaleSlider += 100;
                    }
                }
                this.sliderProducts();
            });
        }

        if (this.element.querySelector('button.right')) {
            this.element.querySelector('button.right').addEventListener('click', () => {
                if (this.isLaptop()) {
                    if (this.scaleSlider >= -360) {
                        this.scaleSlider -= 360;
                    }
                }else{
                    if (this.scaleSlider >= -300) {
                        this.scaleSlider -= 100;
                    }   
                }
                this.sliderProducts();
            });
        }
    }

    sliderProducts() {
        document.querySelector(this.productsSelector).style.transform = `translateX(${this.scaleSlider}px)`;
    }
    isLaptop() {
        return window.innerWidth >= 992;
    }
}

const bestProductsSlider = new Slider('.best-products');
const topSellersSlider = new Slider('.top-sellers');