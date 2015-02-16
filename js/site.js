$(function(){
	var is_iphone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)),
			is_ipad = (navigator.userAgent.match(/iPad/i)),
			is_android = (navigator.userAgent.match(/Android/i)),
			is_mobile = is_iphone || is_ipad || is_android,
			is_desktop = ! is_mobile;
	$("html").addClass(is_mobile ? "mobile" : "desktop");

	[ '#alone-gallery',  '#powerplant-gallery' ].forEach(function(id){
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
		$next.on("click", function(){
			gallery.next()
		})
		if (is_desktop) {
			$el.on("click", function(){
				gallery.next()
			})
		}
	})
	
});