class Slide {
  constructor(slide, menuSlide) {
    this.slideContainer = document.querySelector(slide);
    this.slide = [...document.querySelector(slide).children];
    this.menuSlide = [...document.querySelector(menuSlide).children];
    this.larguraSlide = this.slide[0].offsetWidth;
  }

  pegarDistanciasSlides() {
    this.distanciasSlides = {};
    this.slide.forEach((item, index) => {
      this.distanciasSlides[index] = (item.offsetLeft - this.marginSlide) * -1;
    });
  }

  adicionarClasse(classe, indexBtn) {
    this.slide.forEach((item) => item.classList.remove(classe));
    this.menuSlide.forEach((item) => item.classList.remove(classe));
    this.slide[indexBtn].classList.add(classe);
    this.menuSlide[indexBtn].classList.add(classe);
  }

  selecionarSlide(indexBtn) {
    this.adicionarClasse("ativo", indexBtn);
    this.slideContainer.style.transform = `translateX(${this.distanciasSlides[indexBtn]}px)`;
  }

  calcularMarginSlide() {
    this.marginSlide = (window.innerWidth - this.larguraSlide) / 2;
  }

  adicionarEventos() {
    this.menuSlide.forEach((btnSlide, indexBtn) => {
      btnSlide.addEventListener("click", () => {
        this.selecionarSlide(indexBtn);
      });
    });
    window.addEventListener("resize", this.calcularMarginSlide);
  }

  iniciar() {
    this.adicionarEventos();
    this.calcularMarginSlide();
    this.pegarDistanciasSlides();
    return this;
  }
}

const slide = new Slide(".slide", ".menuSlide");
slide.iniciar().selecionarSlide(0);
