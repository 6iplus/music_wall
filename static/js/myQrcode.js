(function($){
	
	var my_url = $("#partyId");
	var base_url =$("#base_url");
	
	var mm = my_url.val();
	var nn = base_url.val();
	alert(mm+"#"+nn);
	jQuery('#my_qr').qrcode({width:100, height:100, text: nn+"/party/addsong/"+mm});
	
	
	
	
	
	
	
})(jQuery);