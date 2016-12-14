$(function(){

	//CREATE OFFSET FOR MENU
	var topoffset = 41;

	// MAKE SURE BACK IMG FITS WINDOW HEIGHT 
	var wheight = $(window).height();
	$('.fullheight').css('height', wheight);
	$(window).resize(function(){
		var wheight = $(window).height();
		$('.fullheight').css('height', wheight);
	}); //on resize


	// SMOOTH SCROLLING FUNCTION
	$(function(){
		$('a[href*="#"]:not([href="#"])').click(function(){
			if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top-topoffset
					}, 1000);
					return false;
				} //if
			} //if
		});
	});


	// START SCROLLMAGIC STUFF
	// set up Controller
	var controller = new ScrollMagic({
		globalSceneOptions: {
			triggerHook: 'onLeave'
		}
	});

	// set up PIN Navigation
	var pin = new ScrollScene({
		triggerElement: '#nav',
	}).setPin('#nav').addTo(controller);


	// set up TweenMax
	var attractionstween = TweenMax.staggerFromTo('#attractions article', 1, { opacity: 0, scale: 0 }, { delay: 1, opacity: 1, scale: 1, ease: Back.easeOut }); 

	var scene = new ScrollScene({
		triggerElement: '#attractions',
		offset: -topoffset-1
	}).setTween(attractionstween).addTo(controller);



}); //on load















