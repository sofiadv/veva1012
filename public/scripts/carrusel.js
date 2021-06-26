let slider = document.querySelector('.slider')

window.addEventListener('load', function(){
    let imagenes = [];

    imagenes[0] = '/images/carrusel-dt1.jpg';
    imagenes[1] = '/images/carrusel-dt2.jpg';
    imagenes[2] = '/images/carrusel-dt3.jpg';

    let indiceImagenes = 0;
    let tiempo = 2000
    function cambiarImagenes(){

        document.slider.src = imagenes[indiceImagenes];

        if(indiceImagenes < 2){
           indiceImagenes++;
        }else{
          indiceImagenes = 0;
        }

    }

setInterval(cambiarImagenes, tiempo);
    
});