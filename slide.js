class Slide {
  constructor(slide, slideNav) {
    this.slideContainer = document.querySelector(slide);
    this.slides = [...document.querySelector(slide).children];
    this.slidesBtns = [...document.querySelector(slideNav).children];
    this.slideWidth = this.slides[0].offsetWidth;
    this.currentSlide = 0;
  }

  slideOnEnd(event) {
    if (event.type === 'mouseup') {
      this.positionEnd = event.clientX;
      this.slideContainer.removeEventListener('mousemove', this.slideOnMove);
    } else if (event.type === 'touchend') {
      this.positionEnd = event.changedTouches[0].clientX;
      this.slideContainer.removeEventListener('touchmove', this.slideOnMove);
    }

    this.totalMove = this.positionStart - this.positionEnd;

    this.slideContainer.style.transition = '0.3s';
    if (this.totalMove > 200) {
      this.selectSlide(this.currentSlide + 1);
    } else if (this.totalMove < -200) {
      this.selectSlide(this.currentSlide - 1);
    } else {
      this.selectSlide(this.currentSlide);
    }
  }

  slideOnMove(event) {
    this.slideContainer.style.transition = '0s';

    if (event.type === 'mousemove') {
      this.positionMove = event.clientX;
    } else if (event.type === 'touchmove') {
      this.positionMove = event.changedTouches[0].clientX;
    }

    this.totalPxTransform =
      this.positionMove -
      this.positionStart +
      this.slidesDistances[this.currentSlide];

    this.slideContainer.style.transform = `translateX(${this.totalPxTransform}px)`;
  }

  slideOnStart(event) {
    if (event.type === 'mousedown') {
      this.positionStart = event.clientX;
      this.slideContainer.addEventListener('mousemove', this.slideOnMove);
    } else if (event.type === 'touchstart') {
      this.positionStart = event.changedTouches[0].clientX;
      this.slideContainer.addEventListener('touchmove', this.slideOnMove);
    }
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

    this.slideContainer.addEventListener('mousedown', this.slideOnStart);
    this.slideContainer.addEventListener('touchstart', this.slideOnStart);
    this.slideContainer.addEventListener('mouseup', this.slideOnEnd);
    this.slideContainer.addEventListener('touchend', this.slideOnEnd);
  }

  bindEvents() {
    this.slideOnStart = this.slideOnStart.bind(this);
    this.slideOnMove = this.slideOnMove.bind(this);
    this.slideOnEnd = this.slideOnEnd.bind(this);
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
