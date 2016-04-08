(function($){
	
	var my_url = $("#partyId");
	var mm = my_url.val();
	
	jQuery('#my_qr').qrcode({width:100, height:100, text: "localhost:3000"+"/mobile/:"+mm});
	
	
	
	
	
	
	
})(jQuery);