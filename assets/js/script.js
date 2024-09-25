(function () {

	var body = document.querySelector('body');

	//preloader >>>>>>>>>>>>>>>>>>>>>>*/
	var preloader = document.querySelector('.loader');
	//body.classList.add('overflow');
	window.onload = function () {
		window.setTimeout(function () {
			preloader.classList.add('disable');
			//document.body.classList.remove('overflow');
			preloader.remove();
		}, 800);
	}

	/* Slider >>>>>>>>>>>>>>>>>>>*/
	var rightArrow = document.getElementById('right-arrow');
	var leftArrow = document.getElementById('left-arrow');
	var slides = document.getElementsByClassName('review-item');
	var activeSlide = document.querySelector('.review-item.active')



	function changeSlideRight() {
		//activeSlide.classList.remove('active');
		for (var i = 0; i < slides.length; i++) {
			if (slides[i].classList.contains('active')) {
				slides[i].classList.remove('active');
				if (i < slides.length - 1)
					slides[++i].classList.add('active');
				else
					slides[0].classList.add('active');
				return;
			}
		}
	}

	function changeSlideLeft() {
		//activeSlide.classList.remove('active');
		for (var i = slides.length - 1; i >= 0; i--) {
			if (slides[i].classList.contains('active')) {
				slides[i].classList.remove('active');
				if (i > 0)
					slides[--i].classList.add('active');
				else
					slides[slides.length - 1].classList.add('active');
				return;
			}
		}
	}

	rightArrow.addEventListener('click', function () {
		changeSlideRight()
	})


	leftArrow.addEventListener('click', function () {
		changeSlideLeft()
	})

	/* Slider />>>>>>>>>>>>>>>>>>>*/

	/* carousel >>>>>>>>>>>>>>>>>>>*/
	var root = document.documentElement;
	var carouselElementsDisplayed = getComputedStyle(root).getPropertyValue("--carousel-elements-displayed");
	var carouselContent = document.querySelector("ul.carousel-content");

	root.style.setProperty("--carousel-elements", carouselContent.children.length);

	for (var i = 0; i < carouselElementsDisplayed; i++) {
		carouselContent.appendChild(carouselContent.children[i].cloneNode(true));
	}

	/* carousel />>>>>>>>>>>>>>>>>>>*/

	//load-more >>>>>>>>>>>>>>>>>>>>>>*/
	var loadMore = document.querySelector("#load-more");
	var hiddenWorks = document.querySelectorAll(".portfolio-hidden");
	var catalogBlock = document.querySelector('.portfolio-content');

	loadMore.addEventListener('click', loadContent);

	function loadContent() {
		loadMore.style.display = 'none';
		for (var i = 0; i < hiddenWorks.length; i++) {
			catalogBlock.appendChild(hiddenWorks[i]);
		}
	}

	//load-more />>>>>>>>>>>>>>>>>>>>>>*/

	/* filter >>>>>>>>>>>>>>>>>>>>>>*/

	var closestsElementClass = function (elem, className) {
		var node = elem;
		while (node) {
			if (node.classList.contains(className)) {
				return node;
			}
			node = node.parentElement;
		}
		return null;
	}

	var catalog = document.querySelector('.portfolio-content');
	var catalogNav = document.querySelector('.portfolio-filter');
	var catalogItems = document.querySelectorAll('.portfolio-content__item');

	function removeChildren(item) {
		while (item.firstChild) {
			item.removeChild(item.firstChild)
		}
	}

	function updateChildren(item, children) {
		removeChildren(item);
		for (var i = 0; i < children.length; i++) {
			item.appendChild(children[i]);
		}
	}

	catalogNav.addEventListener('click', function (e) {

		var target = e.target;
		var item = closestsElementClass(target, 'portfolio-filter__link');
		if (item === null || item.classList.contains('is-active')) {
			return;
		}
		loadContent();

		e.preventDefault();
		var filterValue = item.getAttribute('data-filter');
		var previousActiveBtn = document.querySelector('.portfolio-filter__link.is-active');
		previousActiveBtn.classList.remove('is-active');
		item.classList.add('is-active');

		if (filterValue === 'all') {
			updateChildren(catalog, catalogItems);
			return;
		}

		var filteredItems = [];
		for (var i = 0; i < catalogItems.length; i++) {
			var currentItem = catalogItems[i];
			if (currentItem.getAttribute('data-category') === filterValue) {
				filteredItems.push(currentItem);
			}
		}
		updateChildren(catalog, filteredItems);

	});

	/* filter />>>>>>>>>>>>>>>>>>>>>>*/

	var smoothScroll = function (targetEl, duration) {
		var headerElHeight = document.querySelector('#header').clientHeight;
		var target = document.querySelector(targetEl);
		var targetPosition = target.getBoundingClientRect().top;
		var startPosition = window.pageYOffset;
		var startTime = null;

		var ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		var animation = function (currentTime) {
			if (startTime === null) startTime = currentTime;
			var timeElapsed = currentTime - startTime;
			var run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		requestAnimationFrame(animation);
	};

	var scrollTo = function () {
		var headerNav = document.querySelector('.navigation');
		var links = document.querySelectorAll('.nav-link');

		links.forEach(each => {
			each.addEventListener('click', function () {
				var currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000);
				headerNav.classList.remove('active');
				document.querySelector("#burger").classList.remove('hamburger_active');
				//body.classList.toggle('overflow')
				if (body.classList.contains('overflow'))
					body.classList.remove('overflow')
			});
		});
	};
	scrollTo();

	var burger = document.querySelector("#burger");
	var navigation = document.querySelector(".navigation");

	var contactBtn = document.querySelector(".hire--btn");
	burger.addEventListener('click', function () {
		body.classList.toggle('overflow')
		navigation.classList.toggle('active');
		burger.classList.toggle('hamburger_active');
	})

	contactBtn.addEventListener('click', function () {
		navigation.classList.toggle('active');
		burger.classList.toggle('hamburger_active');
		//body.classList.toggle('overflow')
		if (body.classList.contains('overflow'))
			body.classList.remove('overflow')
	})

	//filter >>>>>>>>>>>>>>>>>>>>>>*/
	var filter = document.querySelector("#filter");
	var filterBlock = document.querySelector(".portfolio-filter");
	filter.addEventListener('click', function () {
		filterBlock.classList.toggle('open');
	})
	//filter />>>>>>>>>>>>>>>>>>>>>>*/

	//popup  >>>>>>>>>>>>>>>>>>>>>>*/

	var closestsElementAttr = function (elem, attr) {
		var node = elem;
		while (node) {
			var attribute = node.getAttribute(attr);
			if (attribute) {
				return attribute;
			}
			node = node.parentElement;
		}
		return null;
	}

	var closestsElementClass = function (elem, className) {
		var node = elem;
		while (node) {
			if (node.classList.contains(className)) {
				return node; 
			}
			node = node.parentElement;
		}
		return null;
	}

	function showPopup(target) {
		target.classList.add('is-active');
	}

	function closePopup(target) {
		target.classList.remove('is-active');
	}

	function bodyOverflow() {
		body.classList.toggle('overflow');
	}


	body.addEventListener('click', function (e) {
		var target = e.target;
		var popupClass = closestsElementAttr(target, 'data-popup');

		if (popupClass === null) {
			return;
		}
		e.preventDefault();
		var popup = document.querySelector('.' + popupClass);
		if (popup) {
			showPopup(popup);
			bodyOverflow();
		}
	})

	body.addEventListener('click', function (e) {
		var target = e.target;
		if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__wrapper') || e.target.classList.contains('popup__inner')) {
			var popup = closestsElementClass(target, 'popup');
			closePopup(popup);
			bodyOverflow();
		}

	});

	body.addEventListener('keydown', function (e) {
		if (e.keyCode !== 27)
			return;
		else {
			var popup = document.querySelector('.popup.is-active');
			closePopup(popup);
			bodyOverflow();
		}
	});

	//popup  />>>>>>>>>>>>>>>>>>>>>>*/


	//scroll-up  >>>>>>>>>>>>>>>>>>>>>>*/

	var intervalId = 0;
	var scrollButton = document.querySelector('.to-top');
	var header = document.querySelector('#header');
	var headerHeight = header.clientHeight;


	window.addEventListener('scroll', function () {
		if (window.pageYOffset > headerHeight)
			scrollButton.style.display = "block";
		else
			scrollButton.style.display = "none";
	});


	function scrollStep() {
		if (window.pageYOffset === 0) {
			clearInterval(intervalId);
		}
		window.scroll(0, window.pageYOffset - 50);
	}

	function scrollToTop() {
		//speed
		intervalId = setInterval(scrollStep, 5);
	}

	scrollButton.addEventListener('click', scrollToTop);

	//scroll-up  />>>>>>>>>>>>>>>>>>>>>>*/
	
	//tooltip    >>>>>>>>>>>>>>>>>>>>>>*/
	let tooltipElem;

	document.onmouseover = function (event) {
		let target = event.target;
		let tooltipHtml = target.dataset.tooltip;
		if (!tooltipHtml) return;


		tooltipElem = document.createElement('div');
		tooltipElem.className = 'tooltip';
		tooltipElem.innerHTML = tooltipHtml;
		document.body.append(tooltipElem);
		let coords = target.getBoundingClientRect();

		let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
		if (left < 0) left = 0;

		let top = coords.top - tooltipElem.offsetHeight - 5;
		if (top < 0) { 
			top = coords.top + target.offsetHeight + 5;
		}

		tooltipElem.style.left = left + 'px';
		tooltipElem.style.top = top + 'px';
	};

	document.onmouseout = function (e) {

		if (tooltipElem) {
			tooltipElem.remove();
			tooltipElem = null;
		}

	};
	//tooltip    />>>>>>>>>>>>>>>>>>>>>>*/


	//GA 4 event registration   >>>>>>>>>>>>>>>>>>>>>>*/
	document.querySelector('.hire--btn').addEventListener('click', function() {
		gtag('event', 'click_contact_button', {
			'link_url': '#header',
			'event_category': 'Contact Button',
			'event_label': 'Popup Contact'
		});
	});
	//GA 4 event registration   />>>>>>>>>>>>>>>>>>>>>>*/
})()
