(function($) {
    $(document).ready(function() {
		nav();
       	fullPageJS();
		SlickJS();
		boxes();
		servicesPop();
		heights();
    });
    $(window).load(function() {
        equalHeights();
    });
    $(window).resize(function() {
		
    });
	$(document).on('scroll',function() {
		parallax();
	});
	
	function nav(){
		$('.menuTop').clone(true).appendTo('.menu-wrap');
	
		$('.menu-toggle').click(function(){
			$('.menu-wrap').addClass('on');
		});
		$('.menu-toggle.on,.menu-overlay').click(function(){
			$('.menu-wrap').removeClass('on');
		});
	}
	function resizeNav(){
		if($(window).width()>768){
			$('.menu-wrap').removeClass('on');
		}
	}
	function fullPageJS(){
		if(($(window).width()>1599) || ($(window).width()<1680)){
			var ptop = '108px'
		} else if(($(window).width()>768) || ($(window).width()<1600)){
			var ptop = '170px'
		} else {
			var ptop = '100px'
		}
		$('#fullpage').fullpage({
			//sectionsColor: ['#b52121', '#b52121', '#292929', '#cc3333', '#e6e6e6', '#e6e6e6'],
			menu: '#topMenu',
			anchors: ['home', 'about', 'services', 'products', 'contact'],
			verticalCentered: true,
			paddingTop: ptop,
			//sectionSelector: '.section',
			scrollOverflow: true,
			//responsiveWidth: 600,
			//responsiveHeight: 900,
			//events
			afterLoad: function(anchorLink, index){
				if(index == 1){
					homeEffect();	
				}
				if(index!=1){
					$('.logo').css('opacity','1');
					$('.logo').addClass('slideInDown');
				}
				// Click for next section
				$('.arrow-anim').on('click',function(){
					$.fn.fullpage.moveTo(index+1);
				});
				if(index == 4){
					cube();
				}
				
			},
			onLeave: function(index, nextIndex, direction){
			//console.log(index)
				if((index == 1 && direction == 'down')){
					$('#motoimg').css({'opacity':'0','visibility':'hidden'});
					$('#mototxt').css({'opacity':'0','visibility':'hidden'});
					$('#first-screen .arrow-anim').css({'opacity':'0','visibility':'hidden'});
					$('#motos li').css({'opacity':'0','visibility':'hidden'});
				}
				
				if((index==2) && (nextIndex==1)){
					$('.logo').removeClass('slideInDown');
					$('.logo').css('opacity','0');
				}
				if((index == 4 && direction == 'up') || (index == 4 && direction == 'down')){
					$('#cube img').css({'opacity':'0','visibility':'hidden'});
				}
			}
			
		});
	}
	function SlickJS(){
		$('.gallery').slick({
    		infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: false,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
			arrows:false
  			//cssEase: 'linear',
			//nextArrow: '<span class="icon-right-arrow"></span>',
  			//prevArrow: '<span class="icon-left-arrow"></span>'
  		});	
		/*$('.sigProContainer').slick({
    		infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: false,
			responsive: [
			{
			  breakpoint: 768,
			  settings: {

				centerMode: true,
				
				slidesToShow: 1
			  }
			}
		]
		});	*/
	}
	function equalHeights() {
		if ($(window).width() >= 481){
        $('#k2ModuleBoxServices').each(function() {
            var highestBox = 0;
            $('.center', this).each(function() {
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            });
            $('.center', this).height(highestBox);
        });
        }
    }
	function boxes(){
		//var targ= $('#k2ModuleBoxServices .center')
		$('#k2ModuleBoxServices .center').mouseenter(function() {
			//console.log('mpike');
			$(this).find('.greenicon').addClass('hide');
			$(this).find('.whiteicon').removeClass('hide');
		});
		$('#k2ModuleBoxServices .center').mouseleave(function() {
			$(this).find('.greenicon').removeClass('hide');
			$(this).find('.whiteicon').addClass('hide');				
		});
	}
	
	function servicesPopup(){
		var popupW = $('#k2ModuleBoxServices').outerWidth();
		var popupH = $('#servicesArea').outerHeight();
		var popupWabs= popupW + 337;
		//console.log(popupW);
		//$('.moduleItemIntrotext').prependTo('#k2ModuleBoxServices');
		$('.moduleItemIntrotext').css({'right':'calc(30vh - ' + popupWabs+'px)','height':popupH+'px'});
		$('.minisection').click(function( event ) {
			var popWindow = $(this).attr("data-id");
			event.preventDefault();
			$(this).parents('li').toggleClass('activeBox');
			$('#'+popWindow).removeClass('hide');
			$('#'+popWindow).removeClass('zoomOut');
			$('#'+popWindow).toggleClass('zoomIn');
			/*$('.moduleItemIntrotext').each(function() {
                if ($('.closebtn:not([data-x='+popWindow+'])')){ 
					$('.closebtn').trigger('click');
				}
            });*/
			
		});
		$('.closebtn').click(function() {
			var xWindow = $(this).attr("data-x");
			//console.log(xWindow);
			$('#'+xWindow).toggleClass('zoomIn');
			$('#'+xWindow).toggleClass('zoomOut');
			setTimeout(function(){
      			$('#'+xWindow).addClass('hide');
   			}, 500);
			
		});
		
		
	}
	function servicesPop(){
		var popupW = $('#k2ModuleBoxServices').outerWidth();
		var popupH = $('#servicesArea').outerHeight();
		var popupWabs= popupW + 337;
		//console.log(popupW);
		$('.moduleItemIntrotext').css({'height':popupH+'px'});
		$('.modal-dialog').css({'height':popupH+'px'});
		//$('.moduleItemIntrotext').prependTo('#k2ModuleBoxServices');
		//$('.moduleItemIntrotext .modal-content').css({'right':'calc(30vh - ' + popupWabs+'px)','height':popupH+'px'});
		//$('.moduleItemIntrotext').each(function(){
			//var bodyH = $('.modal-body').outerHeight();
			//$('.modal-body').css('trasnform','')
		//});
		var previousTarget=null;
		$('.minisection').click(function( event ) {
			var popWindow = $(this).attr("data-id");
			event.preventDefault();
			$(this).parents('li').toggleClass('activeBox');
			$('.moduleItemIntrotext').modal('hide');
			if(this===previousTarget) {
				//alert("You've clicked this element twice.");
			} else {
				$(previousTarget).parents('li').removeClass('activeBox');	
			}
			previousTarget=this;
		});
		$('.closebtn').click(function() {
			$('.minisection').parents('li').removeClass('activeBox');
		});
		
	}
	function parallax(){
		if($('.myParallax').length){
			var halfScroll = window.scrollY*0.5;
			var halfScrollWebkit = document.documentElement.scrollTop*0.5;
			$('.myParallax').css({
				'-webkit-transform':'translateY('+halfScrollWebkit+'px)',
				'-moz-transform':'translateY('+halfScroll+'px)',
				'-o-transform':'translateY('+halfScroll+'px)',
				'-ms-transform':'translateY('+halfScroll+'px)',
				'transform':'translateY('+halfScroll+'px)'
			});
		}
		
	}
	function heights(){
		var menuheight = $('.menuTop').height();
		var productarea = $('.catItemImageBlock').height();
		$('.filterB').css('height',productarea +'px');
		$('.dummy').css('height',menuheight +'px');
		
	}
	
	function cube(){
		var box = $('#cube img');
		tl = new TimelineLite();
		tl.set(box,{scale: 0,autoAlpha:0,x:'8%'});
		//TweenMax.from(box, 1, {scale:0.0, delay: 0.5, ease:Linear.easeNone});
		tl.to(box, 1,{scale: 1, autoAlpha:1/*, ease:Elastic.easeOut*/});
		tl.to(box, 0.3,{scale: 0.95, ease:Linear.easeNone});
		//tl.to(box, 0.3,{scale: 1, ease:Linear.easeNone});
		tl.to(box, 60,{rotation: 360, ease:Linear.easeNone, repeat:-1});
	}
	function homeEffect(){
		var $items = $('#motos li');	
		tl = new TimelineLite(); 
		tl.set('#motoimg',{scale: 0,autoAlpha:0});
		tl.set('#mototxt',{autoAlpha:0});
		tl.set('#first-screen .arrow-anim',{autoAlpha:0});
		tl.set($items,{autoAlpha:0});
		tl.staggerTo('#motoimg', 1, {scale: 1,autoAlpha: 1,delay: 0.5}, 0.5);  
		tl.staggerTo($items, 1, {autoAlpha: 1}, 0.3); 
		tl.staggerTo('#mototxt', 0.5, {autoAlpha: 1}, -2); 
		tl.staggerTo('#first-screen .arrow-anim', 0.2, {autoAlpha: 1},-2); 

	}

})(jQuery);