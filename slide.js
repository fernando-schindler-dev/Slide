class Slide {
  constructor(slide, slideNav) {
    this.slideContainer = document.querySelector(slide);
    this.slides = [...document.querySelector(slide).children];
    this.slidesBtns = [...document.querySelector(slideNav).children];
    this.slideWidth = this.slides[0].offsetWidth;
    this.currentSlide = 0;
  }

  slideMouseUp(event) {
    this.positionMouseUp = event.clientX;
    this.slideContainer.removeEventListener('mousemove', this.slideMouseMove);

    this.totalMouseMove = this.positionMouseDown - this.positionMouseUp;

    this.slideContainer.style.transition = '0.3s';
    if (this.totalMouseMove > 200) {
      this.selectSlide(this.currentSlide + 1);
    } else if (this.totalMouseMove < -200) {
      this.selectSlide(this.currentSlide - 1);
    } else {
      this.selectSlide(this.currentSlide);
    }
  }

  slideMouseMove(event) {
    this.slideContainer.style.transition = '0s';

    this.positionMouseMove = event.clientX;
    this.totalPxTransform =
      this.positionMouseMove -
      this.positionMouseDown +
      this.slidesDistances[this.currentSlide];

    this.slideContainer.style.transform = `translateX(${this.totalPxTransform}px)`;
  }

  slideMouseDown(event) {
    this.positionMouseDown = event.clientX;
    this.slideContainer.addEventListener('mousemove', this.slideMouseMove);
  }

  addClassName(className, btnIndex) {
    this.slides.forEach((item) => item.classList.remove(className));
    this.slidesBtns.forEach((item) => item.classList.remove(className));
    this.slides[btnIndex].classList.add(className);
    this.slidesBtns[btnIndex].classList.add(className);
  }

  selectSlide(btnIndex) {
    this.currentSlide = btnIndex;

    if (this.currentSlide < 0) {
      this.currentSlide = 0;
    } else if (this.currentSlide > this.slides.length - 1) {
      this.currentSlide = this.slides.length - 1;
    }

    this.addClassName('active', this.currentSlide);
    this.slideContainer.style.transform = `translateX(${
      this.slidesDistances[this.currentSlide]
    }px)`;
  }

  getSlidesDistances() {
    this.slidesDistances = {};
    this.slides.forEach((item, index) => {
      this.slidesDistances[index] = (item.offsetLeft - this.slideMargin) * -1;
    });
  }

  calculateSlideMargin() {
    this.slideMargin = (window.innerWidth - this.slideWidth) / 2;
  }

  handleRezise() {
    setTimeout(() => {
      this.slideWidth = this.slides[0].offsetWidth;
      this.calculateSlideMargin();
      this.getSlidesDistances();
      this.selectSlide(this.currentSlide);
    }, 300);
  }

  addEvents() {
    this.slidesBtns.forEach((btnSlide, btnIndex) => {
      btnSlide.addEventListener('click', () => this.selectSlide(btnIndex));
    });

    window.addEventListener('resize', this.handleRezise);

    this.slideContainer.addEventListener('mousedown', this.slideMouseDown);
    this.slideContainer.addEventListener('mouseup', this.slideMouseUp);
  }

  bindEvents() {
    this.slideMouseDown = this.slideMouseDown.bind(this);
    this.slideMouseMove = this.slideMouseMove.bind(this);
    this.slideMouseUp = this.slideMouseUp.bind(this);
    this.handleRezise = this.handleRezise.bind(this);
  }

  init() {
    this.bindEvents();
    this.addEvents();
    this.calculateSlideMargin();
    this.getSlidesDistances();
    return this;
  }
}

const slide = new Slide('.slide', '.slideNav');
slide.init().selectSlide(0);
