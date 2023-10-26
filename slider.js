const images = [
    '11.png', '22.png', '33.png', '44.png', '55.png', '66.png'
];

let activeImage = 0;
const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;

sliderPlace.style.width = 3*widthOffset + 'px';
sliderPlace.style.height = widthOffset + 'px';

document.querySelector('.slider').style.height = widthOffset + 'px';

//флаг, чтобы нельзя было нажать кнопку далее пока анимация не закончит работу:
let flag = true;

const initSlider = () => {

    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[activeImage];
    sliderPlace.append(img);
    nextImageGenerate();
    prevImageGenerate();
}

const nextImageGenerate = () => {
    // проверим какая следующая картинка
    let nextImage = activeImage + 1;

    if (nextImage >= images.length) {
        nextImage = 0;
    }
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[nextImage];
    sliderPlace.append(img);
}

const prevImageGenerate = (w = false) => {
    // проверим какая следующая картинка
    let prevImage = activeImage - 1;
    if (prevImage < 0) {
        prevImage = images.length - 1;
    }
    const img = document.createElement('img');
    img.alt = '';
    if (w) img.style.width = 0;
    img.src = './images/' + images[prevImage];
    sliderPlace.prepend(img);
}

initSlider();


const nextSlide = () => {

    if (!flag) return;
    flag = !flag;
    
    activeImage++;
    if (activeImage >= images.length) {
        activeImage = 0;
    }
    // document.querySelector('.slider-line > img').remove();
    nextImageGenerate();

    animate({
        duration: 1000,
        draw: function(progress) {
            //уменьшаю изображение(в css добавить display: flex):
            document.querySelector('.slider-line > img').style.width = (widthOffset * (1- progress))+ 'px';
        },
        removeElement: document.querySelector('.slider-line > img')
    });
}

const prevSlide = () => {

    if (!flag) return;
    flag = !flag;

    activeImage--;
    if (activeImage < 0) {
        activeImage = images.length - 1;
    }

    // document.querySelector('.slider-line > img:last-child').remove();
   
    prevImageGenerate(true);

    animate({
        duration: 1000,
        draw: function(progress) {
             //уменьшаю изображение
            document.querySelector('.slider-line > img').style.width = (widthOffset * progress)+ 'px';
        },
        timing: function(step) {
          return step;
        },
        removeElement: document.querySelector('.slider-line > img:last-child')
      });
}


document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

function animate({duration, draw, removeElement}) {

    //время старта анимации:
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let step = (time - start) / duration;

      if (step > 1) step = 1;

      draw(step);

      if (step < 1)  {
        requestAnimationFrame(animate);
      }
      else {
        removeElement.remove();

        flag = true;
      }
    });
  }