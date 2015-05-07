$("#home").on("click", "#findGiftsBt", function(){
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
	var panes = [];
	var $that = null;
	var xStart = 0;
	var yStart = 0;
	var touchStart = false;
	var posX = 0, posY = 0, lastPosX = 0, lastPosY = 0, pane_width = 0, current_pane = 0;
	var allGifts = null;
	var giftsLeft = null;
	var responseGifts = null;


	var loadLoopingGift = function(){
		$('#tinderslide').find("ul").prepend(
			"<li class=pane1>" 				    +
				"<h2>Looping</h2>" 				+
				"<div class='tImg'></div>" 		+
				"<p id=frase>Chegamos ao fim... Deslize mais uma vez para começar de novo, ou chegou a hora de comprar um livro.</p>" +
				"<div class='like'></div>" 		+
				"<div class='dislike'></div>" 	+
			"</li>");
		$(".pane1").find(".tImg").css({
			"background": "url('../www/img/looping_512.jpg') no-repeat scroll center center",
			"background-size": "cover"});
	};


	var loadEmptyGift = function(){
		$('#tinderslide').find("ul").prepend(
			"<li class=pane1>" 				    	+
				"<h2>Nenhum Encontrado</h2>" 		+
				"<div class='tImg'></div>" 			+
				"<p id=frase>Opa, não foram encontrados presentes para este perfil. Tente outras especificações.</p>" +
				"<div class='like'></div>" 			+
				"<div class='dislike'></div>" 		+
			"</li>");
		$(".pane1").find(".tImg").css({
			"background": "url('../www/img/empty_512.jpg') no-repeat scroll center center",
			"background-size": "cover"});
	};


	var initializeLoadedGifts = function(responseGifts, element){
			allGifts = responseGifts.responseJSON.sort(function() { return 0.5 - Math.random() });
		 	giftsToLoad = 2;

		 	currentGift  = allGifts.length - 1;	// getting last index
		 	//pane_count   = allGifts.length + 1;	// 5 (panes + looping gift)
		 	current_pane = 0;	        		// 4
		 	firstLoad = true;

		 	
		 	console.log("Gifts found: " +allGifts.length);

		 	if (allGifts.length == 0) {
		 		loadEmptyGift();
		 	} else{
		 		loadLoopingGift();
		 		loadGiftsInHTML(giftsToLoad, element);
		 	};

		 	$("#loadingGifts").find("img").hide();	// hiding the Loading.gif

		 	container = $(">ul", element);		// [ul]
		 	panes = $(">ul>li", element);		// [li.pane1, li.pane2, li.pane3, li.pane4, li.pane5]
		 	pane_width = container.width();		// 317
	}


	function loadSingleGift() {
			price = allGifts[currentGift].price;
	  	if (price != null){
	  		price = Number(price).toFixed(2);
	  		price = "R$" + price.replace(".", ",");
	  	} else{
	  		price = "";
	  	};

	  	gift = $('#tinderslide').find(".pane1").after(
	  		"<li class=pane"+ (currentGift + 2) + ">"					+
	  			"<h2>"+allGifts[currentGift].name+"</h2>" 				+
	  			"<div class='tImg'></div>" 								+
	  			"<p id=frase>"+allGifts[currentGift].description+"</p>" +
	  			"<div class='price'>"+price+"</div>"					+
	  			"<div class='like'></div>" 								+
	  			"<div class='dislike'></div>" 							+
	  		"</li>");
	  	$(".pane"+ (currentGift + 2)).find(".tImg").css({
	  		"background": "url("+allGifts[currentGift].photo_medium_url+") no-repeat scroll top center",
	  		"background-size": "cover"});
	  	if (firstLoad == false){
	  		panes.splice(1, 0, $("li.pane" + (currentGift + 2))[0]);
	  	}
	  	currentGift--;
	}

	var loadGiftsInHTML = function (howMany, element){
	    var isLastDBPresent = false;

	    if (currentGift < howMany){
	    	howMany = currentGift;
	    }

	    if((currentGift === 0 || currentGift === 1) && allGifts.length > 0){
	    	isLastDBPresent = true;
			}else{
		    for (var count = 0; count < howMany; count++) {
		    	loadSingleGift();
		    }				
			}


	    if(isLastDBPresent){
	    	loadSingleGift();
	    	current_pane = panes.length - 1;
	    }else if(currentGift === -1){
	    	current_pane = 2;
	    }
	    else{
				current_pane += giftsToLoad;	
	    }

	    firstLoad = false;
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
		if (!firstSearch){
					$('#tinderslide ul li').remove()
				}

			//responseGifts = $.post( "https://whichgift.herokuapp.com/api/find_my_gifts.json",
			responseGifts = $.post( "http://localhost:3000/api/find_my_gifts.json",
				{"minPrice":minPrice,"maxPrice":maxPrice,"gender":gender,"ageGroupId": ageGroupId},
				function(data) {})

			.done( function() {
				initializeLoadedGifts(responseGifts, element);
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

			console.log('init currPane:' + current_pane);
		},


		showPane: function (index) {
			console.log('showPane oldCurrPane:' + current_pane);
			panes.eq(current_pane).remove();
			panes.splice(-1,1);
			current_pane = index;
			console.log('showPane newCurrPane:' + current_pane);
			if(panes.length === 0){
				initializeLoadedGifts(responseGifts, document.getElementById('tinderslide'));
			}

		},

		next: function () {
			if (current_pane == 2){
				loadGiftsInHTML(2);
			}
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
						var percent = ((100 / pane_width) * deltaX) / panes.length;
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
				firstSearch = false;
			}
			else if ($.isFunction(Plugin.prototype[options])) {
				$.data(this, 'plugin_' + pluginName)[options]();
	    }else if(!firstSearch){
	    	$.data(this, 'plugin_' + pluginName).init(this);
	    }
		});

		return arguments.callee;
	};

})(jQuery, window, document);
