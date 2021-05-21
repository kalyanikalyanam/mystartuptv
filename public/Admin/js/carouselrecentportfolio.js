jQuery(document).ready(function ($) {		
	$('.recent-portfolio-slider').carouFredSel({
		responsive: true,
		items       : {
        width       : 200,
        height      : 290,
        visible     : {
            min         : 1,
            max         : 4
        }
    },
		width: '100%',
		height: '290px',
		auto: false,
		circular	: true,
		infinite	: false,
		prev : {
			button		: "#car_prev",
			key			: "left",
				},
		next : {
			button		: "#car_next",
			key			: "right",
					},
		swipe: {
			onMouse: true,
			onTouch: true
			},
		scroll: {
        easing: "",
        duration: 1200
    }
	});

	$('.recent-portfolio-slider1').carouFredSel({
		responsive: true,
		items       : {
        width       : 200,
        height      : 290,
        visible     : {
            min         : 1,
            max         : 4
        }
    },
		width: '100%',
		height: '290px',
		auto: false,
		circular	: true,
		infinite	: false,
		prev : {
			button		: "#car_prev1",
			key			: "left",
				},
		next : {
			button		: "#car_next1",
			key			: "right",
					},
		swipe: {
			onMouse: true,
			onTouch: true
			},
		scroll: {
        easing: "",
        duration: 1200
    }
	});

	$('.recent-portfolio-slider2').carouFredSel({
		responsive: true,
		items       : {
        width       : 200,
        height      : 290,
        visible     : {
            min         : 1,
            max         : 4
        }
    },
		width: '100%',
		height: '290px',
		auto: false,
		circular	: true,
		infinite	: false,
		prev : {
			button		: "#car_prev2",
			key			: "left",
				},
		next : {
			button		: "#car_next2",
			key			: "right",
					},
		swipe: {
			onMouse: true,
			onTouch: true
			},
		scroll: {
        easing: "",
        duration: 1200
    }
	});
});

