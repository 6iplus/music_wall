(function ($) {
    $(document).ready(function(){
    var Button1 = $("#button1");
    var Button2 = $("#button2");
    function isValid(str) { return /([A-Za-z0-9])\w*/g.test(str); }

    $(document).on('submit', '#form1', function (event) {
        try {
            var input1 = $("#form1 input[name=\"loginname\"]").val(),
            input2 = $("#form1 input[name=\"loginpw\"]").val();
    
            if (input1 === undefined || input1 === "" || input1 === null) {
                throw "Please input username.";
            } 
            if(!isValid(input1)) {
                throw "Username should only contain letters or numbers.";
            } 
            if (input2 === undefined || input2 === "" || input2 === null) {
                throw "Please input password.";
            } 
            if (!isValid(input2)) {
                throw "Password should only contain letters or numbers.";
            }
            
        } catch (err) {
            if(!($("#error").length)) {
                Button1.after("<p id=\"error\"></p>");
                $("#error").css({"color":"red", "font-family": "sans-serif", "font-style":"italic"});
                $("#error").text(err);
            } else {
                $("#error").text(err);
            }
            return false;
        }
    });
        
 ////////////////////////////////////////////////////////////////////////////////////////////       
        
        
        
          $(document).on('submit', '#form2', function (event) {
        try {
            var input1 = $("#form2 input[name=\"username\"]").val(),
            input2 = $("#form2 input[name=\"password\"]").val();
                
            if (input1 === undefined || input1 === "" || input1 === null) {
                throw "Please input username.";
            } else if (!isValid(input1)) {
                throw "Username should only contain letters or numbers.";
            } 
            if (input2 === undefined || input2 === "" || input2 === null) {
                throw "Please input password.";
            } else if (!isValid(input2)) {
                throw "Password should only contain letters or numbers.";
            }
            
        } catch (err) {
            if(!($("#error2").length)) {
                Button2.after("<p id=\"error2\"></p>");
                $("#error2").css({"color":"red", "font-family": "sans-serif", "font-style":"italic"});
                $("#error2").text(err);
            } else {
                $("#error2").text(err);
            }
            return false;
        }
    });  
        
        
        
    
        
        

    });
})(jQuery);
// jQuery is exported as $ and jQuery
