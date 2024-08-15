const gallery = document.querySelector('.gallery');
const totalImages = 21;
let images = [];
let activeIndex = 0; // Índice de la imagen activa

// Crear imágenes
for (let i = 0; i < totalImages; i++) {
    const img = document.createElement('img');
    img.src = `${String.fromCharCode(65 + i)}.png`;
    img.alt = `Imagen ${String.fromCharCode(65 + i)}`;
    img.addEventListener('click', () => {
        // Expandir la imagen seleccionada
        images.forEach((image) => {
            if (image === img) {
                image.classList.add('expanded');
            } else {
                image.classList.remove('expanded');
            }
        });
    });
    img.addEventListener('mouseleave', () => {
        // Volver a tamaño original al quitar el mouse
        img.classList.remove('expanded');
    });
    gallery.appendChild(img);
    images.push(img);
}

// Crear un contenedor adicional para el bucle infinito
const firstImageClone = images[0].cloneNode(true);
const lastImageClone = images[images.length - 1].cloneNode(true);
gallery.appendChild(firstImageClone);
gallery.insertBefore(lastImageClone, gallery.firstChild);

// Ajustar la galería para mostrar la imagen clonada
gallery.style.width = `${(images.length + 2) * (images[0].offsetWidth + 40)}px`;

// Función para actualizar la imagen activa
function setActiveImage(index) {
    gallery.style.transition = 'none'; // Desactivar transición mientras actualizamos el índice
    gallery.style.transform = `translateX(-${(index + 1) * (images[0].offsetWidth + 40)}px)`;
    setTimeout(() => {
        gallery.style.transition = 'transform 0.5s ease'; // Reactivar transición después de actualizar
    }, 50);
}

// Función para gestionar el bucle infinito
function loopCarousel(direction) {
    let newIndex = (activeIndex + direction + totalImages) % totalImages;

    if (newIndex === 0 && direction === -1) {
        // Moverse del primer al último clon
        gallery.style.transition = 'none';
        gallery.style.transform = `translateX(-${(totalImages + 1) * (images[0].offsetWidth + 40)}px)`;
        setActiveImage(totalImages - 1);
        activeIndex = totalImages - 1;
    } else if (newIndex === totalImages - 1 && direction === 1) {
        // Moverse del último al primer clon
        gallery.style.transition = 'none';
        gallery.style.transform = `translateX(-${(1) * (images[0].offsetWidth + 40)}px)`;
        setActiveImage(0);
        activeIndex = 0;
    } else {
        activeIndex = newIndex;
        setActiveImage(activeIndex);
    }
}

document.querySelector('.left-button').addEventListener('click', () => {
    loopCarousel(-1);
});

document.querySelector('.right-button').addEventListener('click', () => {
    loopCarousel(1);
});

// Inicializar
setActiveImage(activeIndex);
