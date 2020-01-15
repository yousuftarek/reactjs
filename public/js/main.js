/**
 * Quick'n'Dirty autoscroller...
 */
function scrollLeft() {
	
	var $itemxs = $(".itemx");					// ALL itemxs
	
	// No scroll if wrapper is hovered.
	if ( $('.itemx-wrapper').data('hover') )
		return;
	
	// Check so we have itemxs, and more itemxs than currently on screen... else return!
	if ( $itemxs.length <= 0 || $itemxs.first().offset().top == $itemxs.last().offset().top )
		return;
	
	// Get itemxs on screen... (based on top)
	var itemxsOnScreen = 1;
	for ( x=1; x < $itemxs.length; x++ ){
		if ( $itemxs.first().offset().top == $itemxs.eq(x).offset().top )
			itemxsOnScreen++;
	}
	
	var $first = $itemxs.slice(0,1),		// first itemx
	$rest  = $itemxs.slice(1),			// All BUT the first itemxs
	$off   = $itemxs.slice(itemxsOnScreen);		// All off screen itemxs

	// Offset to scroll the rest of the elements when itemxs adjust left.
	var offset = $rest.first().offset().left - $first.offset().left;

	// Animate the first itemx fast..
	$first.animate({left: -$first.outerWidth(true)-50 }, 400);

	// Set all off screen itemxs to hidden, so we can fade in later..
	$off.hide();
	
	// Animate the rest of the itemxs a little slower.
	$rest.animate({left: '-'+offset+'px'}, 800, ).promise().done( function() {
		// Reset the itemxs CRAZY THINGS GOING ON HERE?!?!
		var newHtml = '<div class="itemx">' + $first.html().trim() + "</div>\n\r";
		$(".itemx-wrapper").append( newHtml );
		$itemxs.first().remove();
		$itemxs.css({left: ''});

		// Fade in all off screen (+ the last) itemxs, cheat don't really matter.
		$off.fadeIn(400);
	});
	
}

/**
 * Set hover state, :hover fake.
 */
$('.itemx-wrapper').hover(
	function() { $(this).data('hover', true); },
	function() { $(this).data('hover', false); }
).data('hover', false);

/**
 * Set up interval
 */


$(document).ready( function() {
	var interval = setInterval( function(){
			scrollLeft();
    }, 3000 );
    
    $(".publisher-icon").hover(function(){
        $('.pubIcon').css("color", "#FFC800");
        }, function(){
        $('.pubIcon').css("color", "#1E1E1E");
      });

      // $('.slick-slide').attr('style','width: 127px');


});

function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

	

	$('#carouselExample').on('slide.bs.carousel', function (e) {

  
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});


  $('#carouselExample').carousel({ 
                interval: 2000
        });


  $(document).ready(function() {
/* show lightbox when clicking a thumbnail */
    $('a.thumb').click(function(event){
      event.preventDefault();
      var content = $('.modal-body');
      content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);        
        content.html($(this).html());
        $(".modal-profile").modal({show:true});
    });

  });

	(function() {
		function loadJS(u){var r=document.getElementsByTagName("script")[ 0 ],s=document.createElement("script");s.src=u;r.parentNode.insertBefore(s,r);}
	
	if(!window.HTMLPictureElement){
		document.createElement('picture');
		//generating the config array
		window.picturefillCFG = window.picturefillCFG || [];
		picturefillCFG.push([ "algorithm", "saveData" ]);
	
		loadJS("https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.0-beta1/picturefill.min.js");
	}loadJS
	}());  
	
	(function() {
		window.lazySizesConfig = window.lazySizesConfig || {};
		window.lazySizesConfig.loadMode = 1;
	
		window.lazySizesConfig.expand = 222;
		window.lazySizesConfig.expFactor = 1.6;
	}());  
	
		/*
			for this demo not needed because we use CSS intrinsic sizing,
			but really useful if you deal with responsive images or lazyloaded images
		*/
		(function(){
			var oldFlickityCreate = window.Flickity.prototype._create;
	
			window.Flickity.prototype._create = function(){
				var that = this;
				if(this.element.addEventListener){
					this.element.addEventListener('load', function(){
						that.onresize();
					}, true);
				}
				this._create = oldFlickityCreate;
				return oldFlickityCreate.apply(this, arguments);
			};
		})();

		
		
(function($) {
  "use strict";
  $.fn.sliderResponsive = function(settings) {
    
    var set = $.extend( 
      {
        slidePause: 5000,
        fadeSpeed: 800,
        autoPlay: "on",
        showArrows: "off", 
        hideDots: "off", 
        hoverZoom: "on",
        titleBarTop: "off"
      },
      settings
    ); 
    
    var $slider = $(this);
    var size = $slider.find("> div").length; //number of slides
    var position = 0; // current position of carousal
    var sliderIntervalID; // used to clear autoplay
      
    // Add a Dot for each slide
    $slider.append("<ul></ul>");
    $slider.find("> div").each(function(){
      $slider.find("> ul").append('<li></li>');
    });
      
    // Put .show on the first Slide
    $slider.find("div:first-of-type").addClass("show");
      
    // Put .showLi on the first dot
    $slider.find("li:first-of-type").addClass("showli")

     //fadeout all items except .show
    $slider.find("> div").not(".show").fadeOut();
    
    // If Autoplay is set to 'on' than start it
    if (set.autoPlay === "on") {
        startSlider(); 
    } 
    
    // If showarrows is set to 'on' then don't hide them
    if (set.showArrows === "on") {
        $slider.addClass('showArrows'); 
    }
    
    // If hideDots is set to 'on' then hide them
    if (set.hideDots === "on") {
        $slider.addClass('hideDots'); 
    }
    
    // If hoverZoom is set to 'off' then stop it
    if (set.hoverZoom === "off") {
        $slider.addClass('hoverZoomOff'); 
    }
    
    // If titleBarTop is set to 'on' then move it up
    if (set.titleBarTop === "on") {
        $slider.addClass('titleBarTop'); 
    }

    // function to start auto play
    function startSlider() {
      sliderIntervalID = setInterval(function() {
        nextSlide();
      }, set.slidePause);
    }
    
    // on mouseover stop the autoplay
    $slider.mouseover(function() {
      if (set.autoPlay === "on") {
        clearInterval(sliderIntervalID);
      }
    });
      
    // on mouseout starts the autoplay
    $slider.mouseout(function() {
      if (set.autoPlay === "on") {
        startSlider();
      }
    });

    //on right arrow click
    $slider.find("> .right").click(nextSlide)

    //on left arrow click
    $slider.find("> .left").click(prevSlide);
      
    // Go to next slide
    function nextSlide() {
      position = $slider.find(".show").index() + 1;
      if (position > size - 1) position = 0;
      changeCarousel(position);
    }
    
    // Go to previous slide
    function prevSlide() {
      position = $slider.find(".show").index() - 1;
      if (position < 0) position = size - 1;
      changeCarousel(position);
    }

    //when user clicks slider button
    $slider.find(" > ul > li").click(function() {
      position = $(this).index();
      changeCarousel($(this).index());
    });

    //this changes the image and button selection
    function changeCarousel() {
      $slider.find(".show").removeClass("show").fadeOut();
      $slider
        .find("> div")
        .eq(position)
        .fadeIn(set.fadeSpeed)
        .addClass("show");
      // The Dots
      $slider.find("> ul").find(".showli").removeClass("showli");
      $slider.find("> ul > li").eq(position).addClass("showli");
    }

    return $slider;
  };
})(jQuery);


 
//////////////////////////////////////////////
// Activate each slider - change options
//////////////////////////////////////////////
$(document).ready(function() {
  
  $("#slider1").sliderResponsive({
  // Using default everything
    // slidePause: 5000,
    // fadeSpeed: 800,
    // autoPlay: "on",
    // showArrows: "off", 
    // hideDots: "off", 
    // hoverZoom: "on", 
    // titleBarTop: "off"
  });
  
  $("#slider2").sliderResponsive({
    fadeSpeed: 300,
    autoPlay: "off",
    showArrows: "on",
    hideDots: "on"
  });
  
  $("#slider3").sliderResponsive({
    hoverZoom: "off",
    hideDots: "on"
  });
  
}); 

