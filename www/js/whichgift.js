
//
//
//     FEEDBACK
//
//

$("#feedbackForm").on("click", "#ed-mainButton", function(){
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
	//alert("indo")
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
		animationSpeed: 400,
		threshold: 1,
		likeSelector: '.like',
		dislikeSelector: '.dislike'
	});

	// $('.actions .like, .actions .dislike').click(function(e){
	// 	e.preventDefault();
	// 	$("#tinderslide").Cards($(this).attr('class'));
	// });
});





//
//
//     CARDS
//
//

// botão Voltar
$("#giftsHeader").on("click","a" , function(){
	//alert("voltando")
});

// resetando Especificações
$("#giftsHeader").on("click", "#resetButton", function(){
    $("#especificacoes").closest("form").trigger("reset");
});