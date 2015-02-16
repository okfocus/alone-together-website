$(function(){
	var is_iphone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)),
			is_ipad = (navigator.userAgent.match(/iPad/i)),
			is_android = (navigator.userAgent.match(/Android/i)),
			is_mobile = is_iphone || is_ipad || is_android,
			is_desktop = ! is_mobile;
	$("html").addClass(is_mobile ? "mobile" : "desktop");

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
		$("body,html").animate({ scrollTop: $(".video").offset().top }, 300)
	})

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
				gallery.next()
			})
			$next.on("click", function(){
				gallery.next()
			})
		}
	})
	
	var fixedScrolling = (function(){
		if (is_mobile) return;

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