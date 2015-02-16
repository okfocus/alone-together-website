$(function(){
	var is_iphone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)),
			is_ipad = (navigator.userAgent.match(/iPad/i)),
			is_android = (navigator.userAgent.match(/Android/i)),
			is_mobile = is_iphone || is_ipad || is_android,
			is_firefox = (navigator.userAgent.match(/Firefox/i)),
			is_webkit = (navigator.userAgent.match(/WebKit/i)),
			is_chrome = (navigator.userAgent.match(/Chrome/i)),
			is_safari = (is_webkit && ! is_chrome),
			is_firefox = (navigator.userAgent.match(/Firefox/i)),
			is_desktop = ! is_mobile;
	$("html").addClass(is_mobile ? "mobile" : "desktop");
	if (is_firefox || is_safari) { $("html").addClass("firefox"); }

	var s = document.body.style

	var prefix =
			'webkitTransform' in s ? 'webkit' :
			'mozTransform' in s ? 'moz' :
			'msTransform' in s ? 'ms' : '';
	var transformProp = addPrefix("transform");
	function addPrefix (string) {
			if (prefix) {
					string = prefix + string.charAt(0).toUpperCase() + string.slice(1)
			}
			return string
	}

	$(".top").on("click", function(){
	 var offsetTop = $(".video").offset().top - (window.innerHeight * 0.05)
		$("body,html").animate({ scrollTop: offsetTop }, 300)
	})
	$(".top a").on("click", function(e){
		e.stopPropagation()
	})
	
	var youtube;
	$(".video h2").click(function(){
		$(".player").fadeIn(300, function(){
			if (youtube) {
				return youtube.play()
			}
			youtube = youtube || new YT.Player("youtube", {
				videoId: "GzBJQFI1UaA",
				width: "90%",
				height: window.innerWidth * 9/16 * 0.9,
				events: {
					onReady: function(){
						youtube.playVideo()
					},
					onStateChange: function(e){
						if (e.data == 0) { // finished
							youtube_close()
						}
					},
				},
				playerVars: {
					autohide: 1,
					autoplay: 0,
					disablekb: 1,
					controls: 0,
					enablejsapi: 1,
					fs: 0,
					modestbranding: 1,
					iv_load_policy: 3, // no annotations
					loop: 0,
					showinfo: 0,
					rel: 0,
					wmode: 'opaque',
				},
			})
		})
	})
	$(".player .close").click(youtube_close)
	function youtube_close (e){
		e && e.preventDefault()
		youtube.pauseVideo()
		$(".player").fadeOut(300)
	}
	
	window.onYouTubePlayerAPIReady = function(){
		// console.log("youtube api ready")
	}


	;[ '#alone-gallery',  '#powerplant-gallery' ].forEach(function(id){
		var $el = $(id)
		var $next = $el.next(".next")
		var $caption = $el.find(".caption")
		var gallery = new Flickity( id, {
 			cellSelector: '.cell',
			wrapAround: true,
			prevNextButtons: false,
			pageDots: false,
			setGallerySize: false,
			draggable: is_mobile,
		})
		gallery.on("select", function(){
			$caption.html( $(gallery.selectedElement).data("caption") )
		})
		gallery.on("settle", function(){
			$caption.html( $(gallery.selectedElement).data("caption") )
		})
		if (is_desktop) {
			$el.on("click", function(){
				var scrollTop = document.body.scrollTop
				var offsetTop = $el.offset().top - (window.innerHeight * 0.05)
				if (scrollTop !== offsetTop) {
					$("body,html").animate({ scrollTop: offsetTop }, 300)
				}
				if (Math.abs(scrollTop - offsetTop) < 400) {
					gallery.next()
				}
			})
			$next.on("click", function(){
				gallery.next()
			})
		}
	})
	
	var fixedScrolling = (function(){
		if (is_mobile || is_firefox || is_safari) return;

		var $fixed = $(".fixed"), bgs = []
		var offsets = []

		function build(){
			$fixed.each(function(i){
				var $el = $(this)
				var img = $el.css("background-image")
				var bg = document.createElement("div")
				bg.className = "bg"
				bg.style.backgroundImage = img;
				bgs[i] = bg
				$el.append(bg)
				$el.css('background-image', 'none')
			})
			resize()
		}
		function resize(){
			$fixed.each(function(i){
				var $el = $(this)
				offsets[i] = $el.offset().top
			})
			scroll()
		}
		function scroll(){
			var scrollTop = document.body.scrollTop
			bgs.forEach(function(bg, i){
				bg.style[transformProp] = "translateY(" + (scrollTop - offsets[i]) + "px)"
			})
		}
		$(window).resize(resize)
		$(window).scroll(scroll)
		build()
	})();

});