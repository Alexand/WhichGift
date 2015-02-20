/*
 * jTinder v.1.0.0
 * https://github.com/do-web/jTinder
 * Requires jQuery 1.7+, jQuery transform2d
 *
 * Copyright (c) 2014, Dominik Weber
 * Licensed under GPL Version 2.
 * https://github.com/do-web/jTinder/blob/master/LICENSE
 */

// resetando Especificações
$("#giftsHeader").on("click", "#resetButton", function(){
    $("#especificacoes").find("form").trigger("reset");
});

$("#giftsHeader").on("click","a" , function(){
	//alert("voltando")
	//$(".ui-page").css("display", "block");
});

$("#home").find("#home-content").on("click", "#ed-mainButton", function(){
	//alert("indo")
	//$(".ui-page").css("display", "inline");
});


;(function ($, window, document, undefined) {
	var pluginName = "jTinder",
		defaults = {
			onDislike: null,
			onLike: null,
			animationRevertSpeed: 200,
			animationSpeed: 400,
			threshold: 1,
			likeSelector: '.like',
			dislikeSelector: '.dislike'
		};

	var container = null;
	var panes = null;
	var $that = null;
	var xStart = 0;
	var yStart = 0;
	var touchStart = false;
	var posX = 0, posY = 0, lastPosX = 0, lastPosY = 0, pane_width = 0, pane_count = 0, current_pane = 0;

	var allGifts = null;
	var giftsLeft = null;
	var imgCount = 0;


	var loadLoopingGift = function(){
		$('#tinderslide').find("ul").append(
			"<li class=pane0>" 				    +
				"<div>Looping</div>" 			+
				"<div class='tImg'></div>" 		+
				"<div class='like'></div>" 		+
				"<div class='dislike'></div>" 	+
			"</li>");
		$(".pane0").find(".tImg").css({
			"background": "url('../www/img/gifts/looping.jpg') no-repeat scroll center center",
			"background-size": "cover"});
	};


	var loadGiftsInHTML = function (howMany){
	    $("#frase").prepend("<h2>Aqui vai uma frase espetacular valorizando o presente</h2>")
	    for (var count = 1; count <= howMany; count++) {
	    	$('#tinderslide').find("ul").append(
	    		"<li class=pane"+count+">" 					+
	    			"<div>"+giftsLeft[count].name+"</div>" 	+
	    			"<div class='tImg'></div>" 				+
	    			"<div>"+"preco"+"</div>"				+
	    			"<div>"+"loja"+"</div>"					+
	    			"<div class='like'></div>" 				+
	    			"<div class='dislike'></div>" 			+
	    		"</li>");
	    	$(".pane"+count).find(".tImg").css({
	    		"background": "url('../www/img/pane/pane"+count+".jpg') no-repeat scroll center center",
	    		"background-size": "cover"});
	    };
	};


	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init(element);
	}

	Plugin.prototype = {


		init: function (element) {
			var responseGifts = $.post( "https://whichgift.herokuapp.com/api/find_my_gifts.json", function(data) {
			})
			.done(function() {
			 	allGifts = responseGifts.responseJSON;
			 	giftsLeft = allGifts;
			 	console.log(giftsLeft);

			 	//loadLoopingGift();
			 	loadGiftsInHTML(15);

			 	container = $(">ul", element);		// [ul]
			 	panes = $(">ul>li", element);		// [li.pane1, li.pane2, li.pane3, li.pane4, li.pane5]
			 	pane_width = container.width();		// 317
			 	pane_count = panes.length;			// 5
			 	current_pane = panes.length - 1;	// 4
			 	

			 	console.log(container);
			 	console.log(panes);
			 	console.log(pane_width);
			 	console.log(pane_count);
			 	console.log(current_pane);

			})
			.fail(function() {
				//alert( "error" )
			})
			.always(function() {
			  	//alert( "finished" )
			});
			$that = this;
			$(element).bind('touchstart mousedown', this.handler);
			$(element).bind('touchmove mousemove', this.handler);
			$(element).bind('touchend mouseup', this.handler);
		},

		showPane: function (index) {
			panes.eq(current_pane).hide();
			current_pane = index;
		},

		next: function () {
			imgCount++;
			if (imgCount === 0){
				imgCount = 0;
				loadGiftsInHTML();
			}
			return this.showPane(current_pane - 1);
		},

		dislike: function() {
			panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
				if($that.settings.onDislike) {
					$that.settings.onDislike(panes.eq(current_pane));
				}
				$that.next();
			});
		},

		like: function() {
			panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
				if($that.settings.onLike) {
					$that.settings.onLike(panes.eq(current_pane));
				}
				$that.next();
			});
		},

		handler: function (ev) {
			ev.preventDefault();

			switch (ev.type) {
				case 'touchstart':
					if(touchStart === false) {
						touchStart = true;
						xStart = ev.originalEvent.touches[0].pageX;
						yStart = ev.originalEvent.touches[0].pageY;
					}
				case 'mousedown':
					if(touchStart === false) {
						touchStart = true;
						xStart = ev.pageX;
						yStart = ev.pageY;
					}
				case 'mousemove':
				case 'touchmove':
					if(touchStart === true) {
						var pageX = typeof ev.pageX == 'undefined' ? ev.originalEvent.touches[0].pageX : ev.pageX;
						var pageY = typeof ev.pageY == 'undefined' ? ev.originalEvent.touches[0].pageY : ev.pageY;
						var deltaX = parseInt(pageX) - parseInt(xStart);
						var deltaY = parseInt(pageY) - parseInt(yStart);
						var percent = ((100 / pane_width) * deltaX) / pane_count;
						posX = deltaX + lastPosX;
						posY = deltaY + lastPosY;

						panes.eq(current_pane).css("transform", "translate(" + posX + "px," + posY + "px) rotate(" + (percent / 2) + "deg)");

						var opa = (Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2;
						if(opa > 1.0) {
							opa = 1.0;
						}
						if (posX >= 0) {
							panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', opa);
							panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);
						} else if (posX < 0) {

							panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', opa);
							panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);
						}
					}
					break;
				case 'mouseup':
				case 'touchend':
					// incImgPassada();
					// if (imgCount = 4){
					//     loadGiftsInHTML();
					// }
					touchStart = false;
					var pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
					var pageY = (typeof ev.pageY == 'undefined') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
					var deltaX = parseInt(pageX) - parseInt(xStart);
					var deltaY = parseInt(pageY) - parseInt(yStart);

					posX = deltaX + lastPosX;
					posY = deltaY + lastPosY;
					var opa = Math.abs((Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2);

					if (opa >= 1) {
						if (posX > 0) {
							panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
								if($that.settings.onLike) {
									$that.settings.onLike(panes.eq(current_pane));
								}
								$that.next();
							});
						} else {
							panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
								if($that.settings.onDislike) {
									$that.settings.onDislike(panes.eq(current_pane));
								}
								$that.next();
							});
						}
					} else {
						lastPosX = 0;
						lastPosY = 0;
						panes.eq(current_pane).animate({"transform": "translate(0px,0px) rotate(0deg)"}, $that.settings.animationRevertSpeed);
						panes.eq(current_pane).find($that.settings.likeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
						panes.eq(current_pane).find($that.settings.dislikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
					}
					break;
			}
		}
	};

	$.fn[ pluginName ] = function (options) {
		this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
			else if ($.isFunction(Plugin.prototype[options])) {
				$.data(this, 'plugin_' + pluginName)[options]();
		    }
		});

		return this;
	};

})(jQuery, window, document);
