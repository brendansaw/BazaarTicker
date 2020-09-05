$(function() {
    $('.error').hide();
    $(".dataButtonClass").click(function() {

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
            bruh = ""
            for (i = 0; i < radio.length; ++i) {
                if(radio[i].checked) {
                    bruh = radio[i].value;
                }
            }
            var formData = {
                'email' : $('input#uemail').val(),
                'item' : $('input#formItem').val(),
                'buyorsell' : bruh,
                'price' : $('input#priceReq').val()
            };

            $.ajax({
                type: 'POST',
                url: 'formtoJSON.php',
                data: formData,
                dataType: 'json'
                 
            })
            
            return false;
        }
    });
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

function sendMail() {

    buy00 = document.getElementById("buy00");
    buy10 = document.getElementById("buy10");
    buy20 = document.getElementById("buy20");
    sell00 = document.getElementById("sell00");
    sell10 = document.getElementById("sell10");
    sell20 = document.getElementById("sell20");

    bodystr = "Item: " + formItem.value + "<br> Best Buy Price: " + buy00.innerHTML + "<br> Quantity: " + buy10.innerHTML + "<br> Orders: " + buy20.innerHTML + "<br> Best Sell Price: " + sell20.innerHTML + "<br> Quantity: " + sell10.innerHTML + "<br> Orders: " + sell00.innerHTML + "<br> Thank you for using our services!";

    Email.send({
        Host: "smtp.gmail.com",
        Username: "bazaarticker@gmail.com",
        Password: "",
        To : uemail.value,
        From: "bazaarticker@gmail.com",
        Subject: "BazaarTracker Data",
        Body: bodystr,
    }).then(
        message => alert("Data sent successfully")
    );
}
