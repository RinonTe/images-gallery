function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery Found');
    }
    this.gallery = gallery;
    // Select the elements we need
    this.images = Array.from(gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.modal');
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');

    this.images.forEach(image => {
        image.addEventListener('click', e => this.showImage(e.currentTarget));
    });
    
    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    // Attach an event listner for the image
    this.images.forEach(image => {
        image.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                showImage(e.currentTarget);
                
           }
       })
   })
};

//Event listener to be bound when we open the modal
Gallery.prototype.openModal = function() {
    if(this.modal.matches('.open')) {
        return;
    }
    
    // Open the modal
    this.modal.classList.add('open');
    
    this.modal.addEventListener('click', this.handleClickOutside);
    window.addEventListener('keydown', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage); 
    this.prevButton.addEventListener('click', this.showPrevImage); 
}

// To render the next image
Gallery.prototype.showNextImage = function(e) {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild); 
}

// To render the previous image
Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);  
}

// Function handle key up
// function handleKeyUp = function(e) {
   
// }
Gallery.prototype.closeModal = function() {
    // Remove the modal
    this.modal.classList.remove('open');
    // Remove all event listeners when closing the modal
    this.modal.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('keyup', this.handleKeyUp)
    this.nextButton.removeEventListener('click', this.showNextImage);
}

// Click outside to quit the modal
Gallery.prototype.handleClickOutside = function(e) {
    if (e.currentTarget === e.target) {
        this.closeModal();
    }
}

// Using the escape key to quit the modal
Gallery.prototype.handleKeyUp = function(e) {
    if (e.key === 'Escape') return this.closeModal();  
    if (e.key === 'ArrowRight') return this.showNextImage();  
    if (e.key === 'ArrowLeft') return this.showPrevImage(); 
}


Gallery.prototype.handleKeyRight = function(e) {
    if (e.key === 'ArrowRight') {
        showImage(this.currentImage.nextElementSibling); 
    }
}

Gallery.prototype.handleKeyLeft = function(e) {
    if (e.key === 'ArrowLeft') {
        showImage(this.currentImage.previousElementSibling); 
    }
}

Gallery.prototype.showImage = function(el) {
    if (!el) {
        alert('No image to show');
        return;
    }

    // Update the modal with its info 
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    // Store a reference of the current image
    this.currentImage = el;
    // Call the open modal function
    this.openModal();
}


// Use it on the page
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
const gallery3 = new Gallery(document.querySelector('.gallery3'));
