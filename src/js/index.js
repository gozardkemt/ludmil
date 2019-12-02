import '../css/style.css';
import img from '../img/test.jpg';


 // if (module.hot) { module.hot.accept('./module.js')}

 const doc = window.document;
 const jumper = doc.querySelector('.gallery__jumper');
 const jumperNext = jumper.querySelector('.gallery__jumper--next');
 const jumperBack = jumper.querySelector('.gallery__jumper--back');
 const galleryContent = doc.querySelector('.gallery__content');
 const galleryArrows = galleryContent.getElementsByClassName('.')


jumperNext.addEventListener('click', function() {
	console.log('som tu');
});

jumperBack.addEventListener('click', function() {
	console.log('som tu');
});
