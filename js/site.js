
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
	if (is_safari) { $("html").addClass("safari"); }
	
	var loader = new Loader (ready, new alone_loader())
	var images = []
	$(".video").each(function(){
		images.push( $(this).css("background-image").replace("url(","").replace(")","") )
	})
	$(".fixed .cell").each(function(){
		images.push( $(this).css("background-image").replace("url(","").replace(")","") )
	})
	$(".user div").each(function(){
		images.push( $(this).css("background-image").replace("url(","").replace(")","") )
	})
	loader.preloadImages(images)
	$('body,html').scrollTop(0)
	document.body.scrollTop = 0
	$('body').addClass('loading').removeClass('init')
	function ready () {
		$("body").removeClass('loading')
		fartscroll(300)
	}

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
	
	var youtubePlayer;
	$(".video h2").click(function(){
		$(".player").fadeIn(300, function(){
			if (youtubePlayer) {
				youtubePlayer.seekTo(0, true)
				return youtubePlayer.playVideo()
			}
			youtubePlayer = new YT.Player("youtube", {
				videoId: "GzBJQFI1UaA",
				width: "90%",
				height: window.innerWidth * 9/16 * 0.9,
				events: {
					onReady: function(){
						youtubePlayer.playVideo()
					},
					onStateChange: function(e){
						if (e.data == 0 || e.data == 2) { // finished
							youtubePlayer.seekTo(0, true)
							youtubePlayer.stopVideo()
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
		youtubePlayer.stopVideo()
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
				bg.style[transformProp] = "translateY(" + (scrollTop - offsets[i]) + "px) translateZ(0)"
			})
		}
		$(window).resize(resize)
		$(window).scroll(scroll)
		build()
	})();

});


function alone_loader () {
	var ctx = real_loader.getContext('2d')
	ctx.strokeStyle = '#21356B'
	ctx.fillStyle = '#21356B'
  this.update = function (i) {
//     loading_status.style.width = ((100*(1-i))|0) + "%"
		ctx.clearRect(0,0,real_loader.width, real_loader.height)
		ctx.beginPath();
		ctx.moveTo(real_loader.width,real_loader.width/2)
		ctx.arc(real_loader.width/2,real_loader.width/2,real_loader.width/2,0, (1-i) * 2 * Math.PI);
		ctx.moveTo(real_loader.width/2,real_loader.width/2)
		ctx.stroke();
  }
  this.finish = function(cb){
  	$("body").removeClass('loading')
		$("#loader_rapper").addClass("hidden")
		return cb()
  }
}