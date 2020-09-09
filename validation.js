$('.error').hide();
$(".dataButtonClass").click(function() {
    event.preventDefault();
    $('.error').hide();
    var error = 0;
    var uemail = $("input#uemail").val();  
    uemail = escape_html(uemail);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var test_1 = uemail.match(mailformat);
    if (!test_1) {
        $("label#uemail_error").show();
        $("input#uemail").focus();
        ++error;    
    }
    
    var formItem = $("input#formItem").val();
    if (formItem == "") {
        $("label#formItem_error").show();
        $("input#formItem").focus();
        ++error;
    }
    var bors = document.getElementsByName("buyorsell");
    if (bors[0].checked == false && bors[1].checked == false) {
        $("label#buyorsell_error").show();
        $("input#buyorsell").focus();
        ++error;
    }
    var priceReq = $("input#priceReq").val();
    invalidPrice = document.getElementsByName("priceReq");
    if (priceReq == "") {
        invalidPrice.innerHTML == "Please specify a price"
        $("label#priceReq_error").show();
        $("input#priceReq").focus();
        ++error;
    } 
    else if (priceReq < 0) {
        $("label#priceReq_error").show();
        $("input#priceReq").focus();
        ++error;
    }

    if (error > 0) {
        return false;
    }
    else {
        radio = document.getElementsByName("buyorsell");
        buyorsellRadio = ""
        for (i = 0; i < radio.length; ++i) {
            if(radio[i].checked) {
                buyorsellRadio = radio[i].value;
            }
        }

        var obj = new Object();
        obj.uemail = $('input#uemail').val();
        obj.item = $('input#formItem').val();
        obj.buyorsell = buyorsellRadio;
        obj.priceReq = $('input#priceReq').val();

        $.ajax({
            type: 'POST',
            url: 'serverside/formToServer.php',
            data: obj,
            success: function(response)
            {
                if (response.length > 0) {
                    alert("you have too many watches")
                }

                else {
                    alert("added successfuly");
                }
                
            },

            error: function(){
                alert("error occured");
            }
        })
        
        return false;
    }
});

function escape_html(str) {
  
    str = str.toString();
     
    var map = {
       '&': '&amp;',
       '<': '&lt;',
       '>': '&gt;',
       '"': '&quot;',
       "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function(m) { return map[m]; });
}


