// Obtaining Input Values
$("#home").on("click", "#findGiftsBt", function(){
 	var valores = $("#especificacoes").serializeArray();
 	minPrice = valores[0].value;
 	maxPrice = valores[1].value;
 	ageGroupId = valores[2].value;
 	gender = valores[3].value;
});


//Nameless jQuery Plugin declaration
;(function ($, window, document, undefined) {
	var pluginName = "Cards",
		defaults = {
			onDislike: null,
			onLike: null,
			animationRevertSpeed: 200,
			animationSpeed: 500,
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
	var isEmptyGift = 0;
	var utm = "?utm_source=WhichGift&utm_medium=Mobile%20App&utm_campaign=WhichGift";



	function Plugin(element, options) {

		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init(element);
	}

	Plugin.prototype = {

		// id: 									// photo_giant_url:
		// name:								// photo_giant_url:
		// description:					// photo_large_url:
		// price: 							// photo_medium_url:
		// site: 								// photo_thumb_url:

		init: function (element) {
			if (!firstSearch){
				$('#tinderslide ul li').remove();
				container = null;
				panes = [];
				$that = null;
				xStart = 0;
				yStart = 0;
				touchStart = false;
				posX = 0, posY = 0, lastPosX = 0, lastPosY = 0, pane_width = 0, current_pane = 0;
				allGifts = null;
				giftsLeft = null;
				responseGifts = null;
				isEmptyGift = 0;
			};

      //responseGifts = $.post( "http://localhost:3000/api/find_my_gifts.json",
			responseGifts = $.post( "https://whichgift.herokuapp.com/api/find_my_gifts.json",
				{"minPrice":minPrice,"maxPrice":maxPrice,"gender":gender,"ageGroupId": ageGroupId},
				function(data) {})

			.done( function() {
				$that.checkingResponse(responseGifts, element);
			})
			.fail( function() {
				function alertDismissed(){};
				navigator.notification.alert("Opa! WhichGift não conseguiu acessar os Presentes",alertDismissed,"Deu Xabu" );
			})
			.always( function() {
			  	//alert( "finished" )
			});
      $that = this;
			$(element).bind('touchstart mousedown', this.handler);
			$(element).bind('touchmove mousemove', this.handler);
			$(element).bind('touchend mouseup', this.handler);
			$("#openStore")[0].onclick = function(){window.open($(panes[current_pane]).find(".invisible")[0].innerText+utm, '_blank', 'location=yes');};
		},


		checkingResponse: function(responseGifts, element){
			"Checks response from HTTP Request and triggers the right calls"

			// Getting the JSON and randomizing gifts order
			allGifts = responseGifts.responseJSON.sort(function() { return 0.5 - Math.random() });

			current_pane = 0;
			firstLoad = true;
			giftsQt = allGifts.length
			giftsToLoad = 2;
			currentGift = allGifts.length - 1; // getting last index
			console.log("Gifts found: " + giftsQt);

		  if (giftsQt == 0) { // Empty Gift
		  	this.loadEmptyGift();
		  	isEmptyGift = 1;
		  	$("#openStore").hide();

		  } else if (giftsQt < giftsToLoad){
		  	this.loadLoopingGift();
		  	this.loadGiftsInHTML(giftsQt, element);
		  	$("#openStore").show();

		  } else {
		    this.loadLoopingGift();
		    this.loadGiftsInHTML(giftsToLoad, element);
		    $("#openStore").show();
		  };

		  container = $(">ul", element);
		  panes = $(">ul>li", element);
		  pane_width = container.width();
		  $("#loadingGifts").find("img").hide();
		  if (window.localStorage.getItem('launchCount') < 3){
		    	$("#swipeGif").popup("open");
		  };
		},


		loadGiftsInHTML: function (howMany, element) {
			var isLastDBPresent = false;

			if ((currentGift + 1) < howMany){
				howMany = currentGift;
			}

			if ((currentGift === 0 || currentGift === 1) && (allGifts.length > 2 || allGifts.length === 1)) {
				isLastDBPresent = true;
			} else {
				for (var count = 0; count < howMany; count++) {
					this.loadSingleGift();
				}
			}

			if (isLastDBPresent) {
				this.loadSingleGift();
				if (panes.length > 0) {
					current_pane = panes.length - 1;
				}	else {
					current_pane = 1;
				}
			} else if (currentGift === -1) {
				current_pane = 2;
			} else {
				current_pane += giftsToLoad;
			}

			firstLoad = false;
		},


		loadLoopingGift: function(){
			$('#tinderslide').find("ul").prepend(
				"<li class=pane1>" 						+
				"<h2>Looping</h2>" 						+
				"<div class='tImg'></div>" 		+
				"<p id=descricao>Chegamos ao fim... Deslize mais uma vez para começar de novo (ou chegou a hora de dar um vale presentes...)</p>" +
				"<div class='like'></div>" 		+
				"<div class='dislike'></div>" +
				"</li>");
			$(".pane1").find(".tImg").css({
				"background": "url('../www/img/looping_512.jpg') no-repeat scroll center center",
				"background-size": "cover"});
		},


		loadEmptyGift: function(){
			$('#tinderslide').find("ul").prepend(
				"<li class=pane1>" 				      +
				"<h2>Nenhum Encontrado</h2>" 		+
				"<div class='tImg'></div>" 			+
				"<p id=descricao>Opa, não foram encontrados presentes para este perfil. Tente outras especificações.</p>" +
				"<div class='like'></div>" 			+
				"<div class='dislike'></div>" 	+
				"</li>");
			$(".pane1").find(".tImg").css({
				"background": "url('../www/img/empty_512.jpg') no-repeat scroll center center",
				"background-size": "cover"});
		},


		loadMarvelousIdea: function(){
			$('#tinderslide').find("ul").prepend(
				"<li class=pane1>" 				      +
				"<h2>Ideia Maravilhosa</h2>" 		+
				"<div class='tImg'></div>" 			+
				"<p id=descricao>Achou tudo ruim? Então envie para nós sua ideia maravilhosa e quem sabe ela não aparece aqui?!</p>" +
				"<div class='like'></div>" 			+
				"<div class='dislike'></div>" 	+
				"</li>");
			$(".pane1").find(".tImg").css({
				"background": "url('../www/img/marvelousIdea_512.jpg') no-repeat scroll center center",
				"background-size": "cover"});
		},


		loadSingleGift: function() {
			// Formatting the Price (R$***,**)
			price = allGifts[currentGift].price;
			if (price == 0 || price == null){
				price = "";
			} else {
				price = Number(price).toFixed(2);
				price = "R$" + price.replace(".", ",");
			};

			gift = $('#tinderslide').find(".pane1").after(
				"<li class=pane"+ (currentGift + 2) + ">"											+
				"<h2>"+allGifts[currentGift].name+"</h2>" 										+
				"<div class='tImg'></div>" 																		+
				"<div class='invisible'>"+allGifts[currentGift].site+"</div>" +
				"<p id=descricao>"+allGifts[currentGift].description+"</p>" 	+
				"<div class='price'>"+price+"</div>"													+
			  "<div class='like'></div>" 																	+
			  "<div class='dislike'></div>" 															+
			  "</li>");

			$(".pane"+ (currentGift + 2)).find(".tImg").css({
				"background": "url("+allGifts[currentGift].photo_medium_url+") no-repeat scroll top center",
				"background-size": "contain"});

			if (firstLoad == false){
				panes.splice(1, 0, $("li.pane" + (currentGift + 2))[0]);
			}

			currentGift--;
		},


		showPane: function (index) {
			panes.eq(current_pane).remove();
			panes.splice(-1,1);
			current_pane = index;
			if(current_pane == 0){
				$("#openStore").hide();
			} else {
				$("#openStore").show();
			}
			//var js = "window.open('" + $(panes[current_pane]).find(".invisible")[0].innerText +  "', '_blank', 'location=yes');";
			//var newclick = new Function(js);
			$("#openStore")[0].onclick = function(){window.open($(panes[current_pane]).find(".invisible")[0].innerText+utm, '_blank', 'location=yes');};
			//$("#openStore").attr('onclick', "window.open('" + $(panes[current_pane]).find(".invisible")[0].innerText +  "', '_blank', 'location=yes');").click(newclick);

			if(panes.length === 0){
				this.checkingResponse(responseGifts, document.getElementById('tinderslide'));
			}
		},


		next: function () {
			if(isEmptyGift == 1){
				window.location.href = "#home";
			};
			if (current_pane == 2){
				this.loadGiftsInHTML(2);
			};
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
							panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (posY + pane_width+250) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
								if($that.settings.onLike) {
									$that.settings.onLike(panes.eq(current_pane));
								}
								$that.next();
							});
						} else {
							panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width+250) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
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

})(jQuery, window, document) //Nameless jQuery Plugin call
;
