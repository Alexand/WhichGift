$("#home").on("click", "#ed-mainButton", function(){
 	var valores = $("#especificacoes").serializeArray();
 	console.log(valores);
 	
 	minPrice = valores[0].value;
 	maxPrice = valores[1].value;
 	ageGroupId = valores[2].value;
 	gender = valores[3].value;

 	// minPrice = "0";				// defaults
 	// maxPrice = "300";
 	// ageGroupId = "1";
 	// gender = "U";
});


;(function ($, window, document, undefined) {
	var pluginName = "Cards",
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


	var loadLoopingGift = function(){
		$('#tinderslide').find("ul").prepend(
			"<li class=pane1>" 				    +
				"<div>Looping</div>" 			+
				"<div class='tImg'></div>" 		+
				"<div class='like'></div>" 		+
				"<div class='dislike'></div>" 	+
			"</li>");
		$(".pane1").find(".tImg").css({
			"background": "url('../www/img/looping_512.jpg') no-repeat scroll center center",
			"background-size": "contain"});
	};


	var loadGiftsInHTML = function (howMany, element){
		$("#frase").replaceWith("<h2 id=frase>"+allGifts[currentPhrase].description+"</h2>");
	    currentPhrase--;
	    if (currentGift < howMany){
	    	howMany = currentGift;
	    	console.log("howMany: " + howMany);
	    };

	    for (var count = 0; count < howMany; count++) {

	    	// Formatando Preço caso haja algum
	    	price = allGifts[currentGift].price;
	    	if (price != null){
	    		price = Number(price).toFixed(2);
	    		price = "R$" + price.replace(".", ",");
	    	} else{
	    		price = "";
	    	};

	    	gift = $('#tinderslide').find(".pane1").after(
	    		"<li class=pane"+ (currentGift + 2) + ">"			+
	    			"<div>"+allGifts[currentGift].name+"</div>" 	+
	    			"<div class='tImg'></div>" 						+
	    			"<div class='price'>"+price+"</div>"			+
	    			"<div class='like'></div>" 						+
	    			"<div class='dislike'></div>" 					+
	    		"</li>");
	    	$(".pane"+ (currentGift + 2)).find(".tImg").css({
	    		"background": "url("+allGifts[currentGift].photo_medium_url+") no-repeat scroll center center",
	    		"background-size": "contain"});
	    	if (firstLoad == false){
	    		panes.splice(1, 0, $("li.pane" + (currentGift + 2))[0]);
	    	}
	    	currentGift--;
	    };
	    firstLoad = false;
	    current_pane += giftsToLoad;
	    console.log("current pane: " +current_pane);
	    //pane_count = current_pane +1;
	    console.log("pane count: " +pane_count);  
	};


	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init(element);
	}

	Plugin.prototype = {
		
		// description:
		// id:
		// name:
		// photo_giant_url:
		// photo_large_url:
		// photo_medium_url:
		// photo_thumb_url:
		// price:
		// site:
		// url:
		
		init: function (element) {

			var responseGifts = $.post( "https://whichgift.herokuapp.com/api/find_my_gifts.json", 
				{"minPrice":minPrice,"maxPrice":maxPrice,"gender":gender,"ageGroupId": ageGroupId},
				function(data) {})

			.done( function() {
			 	allGifts = responseGifts.responseJSON;
			 	giftsToLoad = 2;

			 	currentGift  = allGifts.length - 1;	// getting last index
			 	currentPhrase = currentGift;
			 	pane_count   = allGifts.length + 1;	// 5 (panes + looping gift)
			 	current_pane = 0;	        		// 4
			 	firstLoad = true;

			 	loadLoopingGift();
			 	loadGiftsInHTML(giftsToLoad, element);

			 	container = $(">ul", element);		// [ul]
			 	panes = $(">ul>li", element);		// [li.pane1, li.pane2, li.pane3, li.pane4, li.pane5]
			 	pane_width = container.width();		// 317

			 	//console.log(container);
			 	//console.log(panes);
			 	//console.log(pane_width);
			 	//console.log(pane_count);
			 	//console.log(current_pane);

			})
			.fail( function() {
				//alert( "error" )
			})
			.always( function() {
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

		next: function (element) {
			$("#frase").replaceWith("<h2 id=frase>"+allGifts[currentPhrase].description+"</h2>");
			currentPhrase--;
			if (current_pane == 2){
				loadGiftsInHTML(2);
				console.log(panes);
				console.log(current_pane);
			}
			console.log(currentGift);
			return this.showPane(current_pane - 1);
		},

		dislike: function(element) {
			panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
				if($that.settings.onDislike) {
					$that.settings.onDislike(panes.eq(current_pane));
				}
				$that.next(element);
			});
		},

		like: function(element) {
			panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
				if($that.settings.onLike) {
					$that.settings.onLike(panes.eq(current_pane));
				}
				$that.next(element);
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
							//panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', opa);
							//panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', 0);
						} else if (posX < 0) {
							//panes.eq(current_pane).find($that.settings.dislikeSelector).css('opacity', opa);
							//panes.eq(current_pane).find($that.settings.likeSelector).css('opacity', 0);
						}
					}
					break;
				case 'mouseup':
				case 'touchend':
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
