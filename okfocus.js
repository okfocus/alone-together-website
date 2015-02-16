/*! jQuery requestAnimationFrame - v0.1.2pre - 2013-03-05
* https://github.com/gnarf37/jquery-requestAnimationFrame
* Copyright (c) 2013 Corey Frang; Licensed MIT */
(function(e){function o(){t&&(i(o),jQuery.fx.tick())}var t,n=0,r=["webkit","moz","o"],i=window.requestAnimationFrame,s=window.cancelAnimationFrame;for(;n<r.length&&!i;n++)i=window[r[n]+"RequestAnimationFrame"],s=s||window[r[n]+"CancelAnimationFrame"]||window[r[n]+"CancelRequestAnimationFrame"];i?(window.requestAnimationFrame=i,window.cancelAnimationFrame=s,jQuery.fx.timer=function(e){e()&&jQuery.timers.push(e)&&!t&&(t=!0,o())},jQuery.fx.stop=function(){t=!1}):(window.requestAnimationFrame=function(e,t){var r=(new Date).getTime(),i=Math.max(0,16-(r-n)),s=window.setTimeout(function(){e(r+i)},i);return n=r+i,s},window.cancelAnimationFrame=function(e){clearTimeout(e)})})(jQuery);

/* OKSHADOW */

(function(e){function t(){return navigator.userAgent.indexOf("Mobile")!==-1||navigator.userAgent.indexOf("Android")!==-1}e.okshadow=function(n,r){var i=this;i.$el=e(n);i.el=n;i.$el.data("okshadow",i);var s=true;i.init=function(){i.options=e.extend({},e.okshadow.options,r);i.build()};i.build=function(){i.start()};i.clamp=function(e,t,n){return Math.max(t,Math.min(n,e))};i.setoption=function(t,n){if(typeof t==="string"){i.options[t]=n;if(t==="color")return i.update(i.sx,i.sy,i.fuzz)}else{i.options=e.extend(i.options,t)}i.mousemove(i)};i.start=function(){if(t()&&"DeviceOrientationEvent"in window){window.addEventListener("deviceorientation",i.deviceorientation,false);i.deviceorientation({alpha:0,beta:0,gamma:0});window.addEventListener("resize",i.resize,false);i.portraitMode=true}else{e(window).bind({mousemove:i.mousemove});i.mousemove({pageX:e(window).width()/2,pageY:e(window).height()/2})}if(i.options.transparent)i.el.style.color="transparent";i.update()};i.resize=function(){var t=e(window).height()/e(window).width();i.portraitMode=t>=1};i.deviceorientation=function(e){if(e&&"beta"in e&&e.beta){var t,n;if(i.portraitMode){t=e.beta;n=e.gamma}else{t=e.gamma;n=e.beta}distance=Math.sqrt(t*t+n*n);if(i.options.xMax!=null)i.sx=n/90*i.options.xMax;else i.sx=n/90*50;if(i.options.yMax!=null)i.sy=t/90*i.options.yMax;else i.sy=t/90*50;if(i.options.fuzzMax!=null)i.fuzz=Math.min(Math.abs(distance/90*(i.options.fuzzMax-i.options.fuzzMin)+i.options.fuzzMin),i.options.fuzzMax);else i.fuzz=Math.abs(distance/90*(30-i.options.fuzzMin)+i.options.fuzzMin,30);if(i.options.downwards)i.sy=Math.abs(i.sy);i.sx+=i.options.xOffset;i.sy+=i.options.yOffset}};i.mousemove=function(e){var t=i.$el.offset(),n=e.pageX,r=e.pageY,s=t.top+i.$el.height()/2,o=t.left+i.$el.width()/2,u=o-n,a=s-r;sx=u/i.options.xFactor,sy=a/i.options.yFactor,distance=Math.sqrt(u*u+a*a),fuzz=distance/i.options.fuzz+i.options.fuzzMin;if(i.options.xMax!=null)sx=i.clamp(sx,-1*i.options.xMax,i.options.xMax);if(i.options.yMax!=null)sy=i.clamp(sy,-1*i.options.yMax,i.options.yMax);if(i.options.fuzzMax!=null)fuzz=i.clamp(fuzz,i.options.fuzzMin,i.options.fuzzMax);sx+=i.options.xOffset;sy+=i.options.yOffset;i.pageX=n;i.pageY=r;i.sx=sx;i.sy=sy;i.fuzz=fuzz};i.browsers=" -moz- -webkit- -ms-".split(" ");i.update=function(e,t,n){if(!s)return;requestAnimFrame(i.update);var r=i.sx+"px "+i.sy+"px "+i.fuzz+"px "+i.options.color;var o=i.options.textShadow?"text-shadow":"box-shadow";var u={};for(var a in i.browsers){u[i.browsers[a]+o]=r}i.$el.css(u)};i.pause=function(){s=false};i.unpause=function(){if(!s){s=true;i.update()}};i.init()};e.okshadow.options={color:"#888",fuzz:40,fuzzMin:0,fuzzMax:30,xOffset:0,xFactor:30,xMax:30,yOffset:0,yFactor:30,yMax:30,downwards:true,textShadow:false,transparent:false};e.fn.okshadow=function(t){return this.each(function(){new e.okshadow(this,t)})};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()})(jQuery)

/* OKZOOM */

$(function(c){var b=document.createElement("div");b.id="ok-lorgnette";b.style.position="absolute";b.style.backgroundRepeat="no-repeat";b.style.pointerEvents="none";b.style.display="none";b.style.zIndex=7879;document.body.appendChild(b);c.okzoom=function(d,e){var a=this;a.$el=c(d);a.el=d;a.$el.data("okzoom",a);a.init=function(){a.options=c.extend({},c.okzoom.options,e);a.el.onmouseover=a.build;a.el.onmousemove=a.mousemove;a.el.onmouseout=a.mouseout;a.options.height=a.options.height||a.options.width;
var b=a.$el.data("okimage");a.has_data_image="undefined"!==typeof b;if(a.has_data_image)a.img=new Image,a.img.src=b};a.build=function(){if(!a.has_data_image)a.img=a.el;a.offset=a.$el.offset();a.width=a.$el.width();a.height=a.$el.height();a.options.scaleWidth?(a.naturalWidth=a.options.scaleWidth,a.naturalHeight=Math.round(a.img.naturalHeight*a.options.scaleWidth/a.img.naturalWidth)):(a.naturalWidth=a.img.naturalWidth,a.naturalHeight=a.img.naturalHeight);a.widthRatio=a.naturalWidth/a.width;a.heightRatio=
a.naturalHeight/a.height;b.style.width=a.options.width+"px";b.style.height=a.options.height+"px";b.style.border=a.options.border;b.style.background=a.options.background+" url("+a.img.src+")";b.style.backgroundRepeat=a.options.backgroundRepeat;b.style.backgroundSize=a.options.scaleWidth?a.naturalWidth+"px "+a.naturalHeight+"px":"auto";b.style.borderRadius=b.style.OBorderRadius=b.style.MozBorderRadius=b.style.WebkitBorderRadius=a.options.round?a.options.width+"px":0;b.style.boxShadow=a.options.shadow};
a.mousemove=function(c){var d=a.options.width/2,f=a.options.height/2,e=-1*Math.floor((c.pageX-a.offset.left)*a.widthRatio-d),g=-1*Math.floor((c.pageY-a.offset.top)*a.heightRatio-f);document.body.style.cursor="none";b.style.display="block";b.style.left=c.pageX-d+"px";b.style.top=c.pageY-f+"px";b.style.backgroundPosition=e+"px "+g+"px";};a.mouseout=function(){b.style.display="none";b.style.background="none";document.body.style.cursor="auto"};a.init()};c.okzoom.options={width:150,height:null,scaleWidth:null,
round:!0,background:"#fff",backgroundRepeat:"no-repeat",shadow:"0 0 5px #000",border:0};c.fn.okzoom=function(b){return this.each(function(){new c.okzoom(this,b)})}});




/*
 * OKGallery by OKFocus - http://okfoc.us - @okfocus
 * Version 1.111
 * Licensed under MIT.
 *
 */

(function($){
  "use strict";
	var hasCssTransitions;

	$.okgallery = function(el, options){
		var base = this;
		base.$el = $(el);
		base.el = el;
		// Don't load OKGallery twice on an element
		if (base.$el.data("okgallery")) {
			return;
		}
		base.$el.data("okgallery", base);
		base.$children = base.$el.children("div");

		var current = -1;
		
		base.init = function(){
			base.options = $.extend({}, $.okgallery.options, options);
			base.build();
		};
		
		base.build = function(){
			if (base.options.width != null &&
					base.options.height != null &&
					base.options.height > 0) {
				base.options.aspect = base.options.width / base.options.height;
			}
			base.$children.css("opacity", 0);

			base.resize();

			base.buildCss();
			base.buildDots();
			base.bindArrows();
			
			// defer this so the wrapper does not slide open
			setTimeout(base.buildTransitions);
      if (base.options.autoplayOnHover) {
  			base.$el.hover(function(){
          base.autoplayOn();
          base.autoplayTimeout = setTimeout(base.next, 750);
        }, function(){
          base.autoplayOff();
          base.first();
        });
      } else {
  			base.$el.bind("click", base.clickNext);
      }
			$(window).resize(base.debounceResize);
			base.start();
		};
		
		base.bindArrows = function(){
			if (base.options.prevSelector != null) {
				$(base.options.prevSelector).click(base.clickPrev);
			}
			if (base.options.nextSelector != null) {
				$(base.options.nextSelector).click(base.clickNext);
			}
			if (base.options.useKeyboard) {
				$(window).keydown(function(e){
					if (e.keyCode == 37) {
						base.prev();
					} else if (e.keyCode == 39) {
						base.next();
					}
				});
			}
		};

		base.buildCss = function(){
			base.$el.css({
				'width': "100%",
				'position': 'relative',
				'overflow': 'hidden',
				'cursor': 'pointer',
				'WebkitUserSelect': 'none',
				'MozUserSelect': 'none',
				'MsUserSelect': 'none',
				'OUserSelect': 'none',
				'userSelect': 'none'
			});

			base.$children.css({
				'position': "absolute",
				'top': 0,
				'left': 0,
				'width': "100%",
				'height': "100%",
				'backgroundSize': base.options.backgroundSize,
				'backgroundPosition': base.options.backgroundPosition,
				'WebkitUserSelect': 'none',
				'MozUserSelect': 'none',
				'MsUserSelect': 'none',
				'OUserSelect': 'none',
				'userSelect': 'none'
			});
      if (base.options.aspect == "fullscreen") {
  			base.$el.css({
          'height': "100%",
          'position': "fixed",
          'top': "0",
          'left': "0"
        });
        $("html,body").css({
          'width': '100%',
          'height': '100%',
          'margin': 0,
          'overflow-x': 'hidden'
        });
      }
		}
		
		base.buildTransitions = function(){
			if (! hasCssTransitions) return;

			var transition = {};
			transition[hasCssTransitions + "Property"] = "all"; // "width, height, top, left";
			transition[hasCssTransitions + "Duration"] = (base.options.resizeTime/1000) + "s";
			base.$el.css(transition);

			var fadeTransition = {};
			fadeTransition[hasCssTransitions + "Property"] = "all"; // "opacity";
			fadeTransition[hasCssTransitions + "Duration"] = (base.options.fadeTime/1000) + "s";
			base.$children.css(fadeTransition);
		};
		
		base.buildDots = function(){
			if (! base.options.dots) return;
			var width = px(base.options.dotWidth);
			var margin = px(base.options.dotMargin);
			var shadow = "0 0 ";
			shadow += px(base.options.dotShadowWidth);
			shadow += " " + base.options.dotShadowColor;

			base.$dotParent = $("<div/>").css({
				"width": "100%",
				"paddingTop": base.options.dotContainerPadding,
				"paddingBottom": base.options.dotContainerPadding,
				"textAlign": "center",
				'WebkitUserSelect': 'none',
				'MozUserSelect': 'none',
				'MsUserSelect': 'none',
				'OUserSelect': 'none',
				'userSelect': 'none'
			});
			
			base.$children.each(function(index){
				var $dot = $("<a/>");
				$dot.data("index", index)
				$dot.click(base.clickDot);
				
				if (base.options.dotClass) {
					$dot.addClass(base.options.dotClass);
				} else {
				  $dot.css({
				  	"cursor": "pointer",
				  	"display": "inline-block",
				  	"margin": margin,
						"backgroundColor": base.options.dotColor,
						"width": width,
						"height": width,
						"borderRadius": width,
						"WebkitBorderRadius": width,
						"MozBorderRadius": width,
						"MsBorderRadius": width,
						"OBorderRadius": width,
						"boxShadow": shadow,
						"WebkitBoxShadow": shadow,
						"MozBoxShadow": shadow,
						"MsBoxShadow": shadow,
						"OBoxShadow": shadow
					});
				}
				base.$dotParent.append($dot);
			});
			
			if (base.options.dotsInside) {
				base.$el.append(base.$dotParent);
				base.$dotParent.css({
					'position': 'absolute',
					'bottom': 0,
					'left': 0,
					'zIndex': 1
				});
			} else {
				base.$dotParent.insertAfter(base.$el);
			}
			
			base.$dots = base.$dotParent.children();
		};
		
		base.start = function(){
			base.next();
		};
		
		base.rand = function(n,a) {
			var m = n;
			while (m == n) {
				m = Math.floor(Math.random() * a);
			}
			return m;
		};
		
		base.clickDot = function(e){
			e.preventDefault();
			e.stopPropagation();
			var index = $(this).data("index");
			base.show(index);
			return false;
		};
		
    base.autoplayOn = function(){
		  base.options.autoplay = true;
    };
    base.autoplayOff = function(){
			if (base.autoplayTimeout) clearTimeout(base.autoplayTimeout);
		  base.options.autoplay = false;
    };

		base.clickPrev = function(){
			if (base.options.clickDisablesAutoplay) {
				base.options.autoplay = false;
				clearTimeout(base.autoplayTimeout);
			}
			if (base.options.clickDisablesRandom) {
				base.options.random = false;
			}
			base.prev();
		};
		
		base.clickNext = function(){
			if (base.options.clickDisablesAutoplay) {
				base.options.autoplay = false;
				clearTimeout(base.autoplayTimeout);
			}
			if (base.options.clickDisablesRandom) {
				base.options.random = false;
			}
			base.next();
		};
		
		base.first = function(){
			if (base.options.random) {
				base.show( base.rand(current, base.$children.length) );
			} else {
				base.show( 0 );
			}
		};
		
		base.next = function(){
			if (base.options.random) {
				base.show( base.rand(current, base.$children.length) );
			} else {
				base.show( current + 1 );
			}
		};
		
		base.prev = function(){
			base.show( current - 1 );
		};
		
		base.show = function(index){
			index = (index + base.$children.length) % base.$children.length;

			if (index != current) {
				if (current > -1) {
					var $current = base.$children.eq(current);
					$current.css("z-index", 0);
					setTimeout(function(){
						$current.hide().css("opacity", 0);
					}, base.options.fadeTime * 1.5);
				}
	
				var $index = base.$children.eq(index);
				$index.css("opacity", 0).show();
				$index.css("z-index", 1);
				setTimeout(function(){
					$index.css("opacity", 1);
				});
			}

			if (base.options.autoplay) {
				if (base.autoplayTimeout) clearTimeout(base.autoplayTimeout);
				base.autoplayTimeout = setTimeout(base.next, base.options.fadeTime + base.options.delayTime);
			}
			if (base.options.dots) {
				if (base.options.dotActiveClass) {
					base.$dots.eq(current).removeClass(base.options.dotActiveClass);
					base.$dots.eq(index).addClass(base.options.dotActiveClass);
				} else {
					base.$dots.eq(current).css("background-color", base.options.dotColor);
					base.$dots.eq(index).css("background-color", base.options.dotActiveColor);
				}
			}
			current = index;
		};
		
		base.autoplayTimeout = null;
		base.debounceTimeout = null;
		base.debounceResize = function(){
			if (base.debounceTimeout) clearTimeout(base.debounceTimeout);
			base.debounceTimeout = setTimeout(base.resize, 100);
		};

		base.resize = function(){
      if (base.options.aspect == "fullscreen") return;
  		base.el.style.height = Math.floor(base.$el.width() / base.options.aspect) + "px";
		};
		
		base.init();
	};

	hasCssTransitions = (function(){
		var div = document.createElement("div");
		var p, ext, pre = ["msTransition", "OTransition", "WebkitTransition", "MozTransition", "transition"];
		for (p in pre) {
			if (div.style[ pre[p] ] !== undefined) {
				ext = pre[p];
				break;
			}
		}
		return ext;
	})();

	function px (n) {
		if (n.toString().indexOf("px") == -1)
			return n + "px";
		return n;
	}
	
  $.okgallery.options = {
		'aspect': 16/9,
  	'width': null,
  	'height': null,
		'random': false,
		'autoplay': false,
    'autoplayOnHover': false,
  	'prevSelector': null,
  	'nextSelector': null,
		'clickDisablesRandom': true,
		'clickDisablesAutoplay': true,
		'resizeTime': 200,
		'delayTime': 2000,
		'fadeTime': 700,
		'backgroundSize': "cover",
		'backgroundPosition': "center center",
		'dots': true,
		'dotsInside': false,
		'dotClass': null,
		'dotActiveClass': null,
		'dotWidth': 14,
		'dotMargin': 4,
		'dotContainerPadding': 10,
		'dotColor': "#eee",
		'dotShadowColor': "#888",
		'dotShadowWidth': 2,
		'dotActiveColor': "yellow",
		'useKeyboard': false,
		'images': null
  };
  
  $.fn.okgallery = function(options){
    return this.each(function(){
      (new $.okgallery(this, options));            
    });
  };

})(jQuery);

/**
 *
 * okjavascript
 *
**/


$(function(){
	
	
	$(".okgallery").okgallery({
    "random": false,
    "autoplay": false,
    "aspect": 960/960,
	'nextSelector': '.next',
    'dots': false,
		'resizeTime': 200,
		'delayTime': 4000,
		'fadeTime': 200,
    'useKeyboard': true,
  });


});



