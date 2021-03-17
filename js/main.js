$(document).ready(function () {

	// Fixed header
	const header = $("#header");
	const intro = $("#intro");
	const burger = $('#navToggle');
	const nav = $("#nav");
	let introH = intro.innerHeight();
	let scrollPos = $(window).scrollTop();
	const stat = $('.stat');
	const statCount = $('.stat__count');
	let scrollEvent = false;
	let blockStatus = true;

	checkScroll(scrollPos, introH);
	$(window).on("scroll resize", function () {
		introH = intro.innerHeight();
		scrollPos = $(this).scrollTop();
		scrollEvent = scrollPos > (stat.offset().top - $(window).height())

		checkScroll(scrollPos, introH);
		animStat();
	});

	function checkScroll(scrollPos, introH) {
		if (scrollPos > introH) {
			header.addClass("fixed");
			return;
		}
		header.removeClass("fixed");
	}

	// Animate stat count
	function animStat() {
		if ( scrollEvent && blockStatus ) {
			blockStatus = false;
	
			statCount.each(function () {
				$(this).prop('Counter', 0).animate({
					Counter: $(this).text()
				}, {
					duration: 3000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
			});
			setTimeout(function() {
				statCount.eq(1).text('1m');
			}, 3100);
		}
	}

	// Smooth scroll
	const navLinks = $("[data-scroll]");
	navLinks.on("click", function (event) {
		event.preventDefault();

		let elementId = $(this).data("scroll");
		let elementOffset = $(elementId).offset().top;

		nav.removeClass("show");

		$("html, body").animate({
			scrollTop: elementOffset + 2
		}, 700);
	});

	burger.click(function (evt) {
		evt.preventDefault();

		nav.toggleClass('show');
	});

	// Slider: https://kenwheeler.github.io/slick
	const slider = $('.intro__slides');
	const slidePrev = $('.slickPrev');
	const slideNext = $('.slickNext');
	slider.slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		arrows: false
	});

	slidePrev.on('click', function (e) {
		e.preventDefault();
		let currentSlider = $(this).parents('#intro').find('.intro__slides');
		currentSlider.slick('slickPrev');
	});

	slideNext.on('click', function (e) {
		e.preventDefault();
		let currentSlider = $(this).parents('#intro').find('.intro__slides');
		currentSlider.slick('slickNext');
	});
});