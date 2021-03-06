
// INITIALIZE
$( document ).ready(function() {
	$("#openStore").hide();
	$("body").removeClass("ui-mobile-viewport-transitioning");

	// Counting how many times app was launched
	var appLaunchCount = window.localStorage.getItem('launchCount');
	if(appLaunchCount){
			window.localStorage.setItem('launchCount', parseInt(appLaunchCount)+1);
	}else{
	    window.localStorage.setItem('launchCount', 1);
	};

});



//
//
//     FEEDBACK
//
//

var firstSearch = true;

$("#feedbackForm").on("click", "#sendFeedback", function(){
	var valores = $("#feedbackForm").serializeArray();
	motivos = [0, "Bug", "Critica", "Sugestao"];

	category = motivos[valores[0].value];
	name = valores[1].value;
	email = valores[2].value;
	comment = valores[3].value;
	//console.log(valores);

	$.post( "https://whichgift.herokuapp.com/feedbacks",
	        {"feedback": {"name":name, "email":email, "comment":comment, "category":category} },
	        function() {}
	);
});



//
//
//     ESPECIFICAÇÕES
//
//

$("#home").on("click", "#findGiftsBt", function(){
	//(jQuery, window, document); João, precisa dessa linha??

	$("#tinderslide").Cards({
		// dislike callback
	    onDislike: function (item) {
		    // set the status text
	        $('#status').html('Dislike image ' + (item.index()+1));
	    },
		// like callback
	    onLike: function (item) {
		    // set the status text
	        $('#status').html('Like image ' + (item.index()+1));
	    },

		animationRevertSpeed: 200,
		animationSpeed: 500,
		threshold: 1,
		likeSelector: '.like',
		dislikeSelector: '.dislike'
	});
});





//
//
//     CARDS
//
//

// botão Voltar
$("#giftsHeader").on("click","#btnVoltar" , function(){
	$("#loadingGifts").find("img").show();
	$("#openStore").hide();
});

// resetando Especificações
$("#giftsHeader").on("click", "#resetButton", function(){
  $("#especificacoes").closest("form").trigger("reset");
	$("#loadingGifts").find("img").show();
	$("#openStore").hide();
});


//
//
//     TERMOS
//
//

