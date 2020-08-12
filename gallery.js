 function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery Found');
    }

    // Select the elements we need
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    
    let currentImage;
    function openModal() {
        if(modal.matches('.open')) {
            return;
        }

        // Open the modal
        modal.classList.add('open');

        //Event listener to be bound when we open the modal
        modal.addEventListener('click', handleClickOutside);
        window.addEventListener('keydown', handleKeyUp);
        nextButton.addEventListener('click', showNextImage); 
        prevButton.addEventListener('click', showPrevImage); 
    }

    // To render the next image
    function showNextImage(e) {
       showImage(currentImage.nextElementSibling || gallery.firstElementChild); 
    }

    // To render the previous image
    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);  
    }

    // Function handle key up
    // function handleKeyUp(e) {
       
    // }
    function closeModal() {
        // Remove the modal
        modal.classList.remove('open');
        // Remove all event listeners when closing the modal
        modal.removeEventListener('click', handleClickOutside);
        window.removeEventListener('keyup', handleKeyUp)
        nextButton.removeEventListener('click', showNextImage);
    }

    // Click outside to quit the modal
    function handleClickOutside(e) {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

    // Using the escape key to quit the modal
    function handleKeyUp(e) {
        if (e.key === 'Escape') return closeModal();  
        if (e.key === 'ArrowRight') return showNextImage();  
        if (e.key === 'ArrowLeft') return showPrevImage(); 
    }

    
    function handleKeyRight(e) {
        if (e.key === 'ArrowRight') {
            showImage(currentImage.nextElementSibling); 
        }
    }

    function handleKeyLeft(e) {
        if (e.key === 'ArrowLeft') {
            showImage(currentImage.previousElementSibling); 
        }
    }

    function showImage(el) {
        if (!el) {
            alert('No image to show');
            return;
        }

        // Update the modal with its info
        // console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        // Store a reference of the current image
        currentImage = el;
        // Call the open modal function
        openModal();
    }

    images.forEach(image => {
        image.addEventListener('click', e => showImage(e.currentTarget));
    });
    // Attach an event listner for the image
   images.forEach(image => {
       image.addEventListener('keyup', e => {
           if (e.key === 'Enter') {
               showImage(e.currentTarget);
           }
       })
   })
};

// Use it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const gallery3 = Gallery(document.querySelector('.gallery3'));
