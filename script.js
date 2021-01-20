class Slide {
  constructor(slide, menuSlide) {
    this.slideContainer = document.querySelector(slide);
    this.slides = [...document.querySelector(slide).children];
    this.menuSlides = [...document.querySelector(menuSlide).children];
    this.larguraSlide = this.slides[0].offsetWidth;
    this.slideAtual = 0;
  }

  slideMouseUp(evento) {
    this.posicaoMouseUp = evento.clientX;
    this.slideContainer.removeEventListener("mousemove", this.slideMouseMove);

    this.calculoMouseMove = this.posicaoMouseDown - this.posicaoMouseUp;

    this.slideContainer.style.transition = "0.3s";
    if (this.calculoMouseMove > 200) {
      this.selecionarSlide(this.slideAtual + 1);
    } else if (this.calculoMouseMove < -200) {
      this.selecionarSlide(this.slideAtual - 1);
    } else {
      this.selecionarSlide(this.slideAtual);
    }
  }

  slideMouseMove(evento) {
    this.slideContainer.style.transition = "0s";

    this.posicaoMouseMove = evento.clientX;
    this.quantidadePxTransform =
      this.posicaoMouseMove -
      this.posicaoMouseDown +
      this.distanciasSlides[this.slideAtual];

    this.slideContainer.style.transform = `translateX(${this.quantidadePxTransform}px)`;
  }

  slideMouseDown(evento) {
    this.posicaoMouseDown = evento.clientX;
    this.slideContainer.addEventListener("mousemove", this.slideMouseMove);
  }

  adicionarClasse(classe, indexBtn) {
    this.slides.forEach((item) => item.classList.remove(classe));
    this.menuSlides.forEach((item) => item.classList.remove(classe));
    this.slides[indexBtn].classList.add(classe);
    this.menuSlides[indexBtn].classList.add(classe);
  }

  selecionarSlide(indexBtn) {
    this.slideAtual = indexBtn;

    if (this.slideAtual < 0) {
      this.slideAtual = 0;
    } else if (this.slideAtual > this.slides.length - 1) {
      this.slideAtual = this.slides.length - 1;
    }

    this.adicionarClasse("ativo", this.slideAtual);
    this.slideContainer.style.transform = `translateX(${
      this.distanciasSlides[this.slideAtual]
    }px)`;
  }

  pegarDistanciasSlides() {
    this.distanciasSlides = {};
    this.slides.forEach((item, index) => {
      this.distanciasSlides[index] = (item.offsetLeft - this.marginSlide) * -1;
    });
  }

  calcularMarginSlide() {
    this.marginSlide = (window.innerWidth - this.larguraSlide) / 2;
  }

  adicionarEventos() {
    this.menuSlides.forEach((btnSlide, indexBtn) => {
      btnSlide.addEventListener("click", () => this.selecionarSlide(indexBtn));
    });

    window.addEventListener("resize", this.calcularMarginSlide);

    this.slideContainer.addEventListener("mousedown", this.slideMouseDown);
    this.slideContainer.addEventListener("mouseup", this.slideMouseUp);
  }

  bindEventos() {
    this.slideMouseDown = this.slideMouseDown.bind(this);
    this.slideMouseMove = this.slideMouseMove.bind(this);
    this.slideMouseUp = this.slideMouseUp.bind(this);
  }

  iniciar() {
    this.bindEventos();
    this.adicionarEventos();
    this.calcularMarginSlide();
    this.pegarDistanciasSlides();
    return this;
  }
}

const slide = new Slide(".slide", ".menuSlide");
slide.iniciar().selecionarSlide(0);
