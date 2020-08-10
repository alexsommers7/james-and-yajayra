// INTERSECTION OBSERVER API - FADE ON SCROLL
const observerOptions = {
    root: null, // Null = use viewport as root
    rootMargin: "0px", // Margin if desired for root
    threshold: 0.5 // Percentage of visibility needed on target element to run callback function
  };
  
  function observerCallback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade in from top
        if (entry.target.classList.contains('fadeFromTop')) {
            entry.target.classList.replace('fadeFromTop', 'fadeFromTopVisible');
        }
        // Fade in from bottom
        else if (entry.target.classList.contains('fadeFromBottom')) {
            entry.target.classList.replace('fadeFromBottom', 'fadeFromBottomVisible');
        }
        // Fade in from left
        else if (entry.target.classList.contains('fadeFromLeft')) {
            entry.target.classList.replace('fadeFromLeft', 'fadeFromLeftVisible');
        }
        // Fade in regular
        else if (entry.target.classList.contains('fadeRegular')) {
            entry.target.classList.replace('fadeRegular', 'fadeRegularVisible');
        }
      }
    });
  }
  
const fadeElms = document.querySelectorAll('.fade');
  
const observer = new IntersectionObserver(observerCallback, observerOptions);
fadeElms.forEach(el => observer.observe(el));



// SMOOTH MOUSE SCROLL
var mq = window.matchMedia( "(min-width: 1300px)" );

function init(){
	if (mq.matches) {
		new SmoothScroll(document,120,15)
	}
	else {
		return;
	}
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

	function update() {
		moving = true
    
		var delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
	}

	var requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}
