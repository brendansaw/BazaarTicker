$(function() {
    $('.error').hide();
    $(".dataButtonClass").click(function() {

        $('.error').hide();
        var error = 0;
            var uemail = escape_html($("input#uemail").val());
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!(uemail.match(mailformat))) {
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
            formData = {
                'email' : $('input[name=uemail]').val(),
                'item' : $('input[name=formItem]').val(),
                'buyorsell' : $('input[name=buyorsell]').val(),
                'price' : $('input[name=priceReq]').val()
            };

            $.ajax({
                type: 'POST',
                url: 'formtoJSON.php',
                data: formData,
                dataType: 'json',
                encode: true
            })
                console.log(data);

            

            return false;
        }
    });
  });

function escape_html(str) {
  
    if ((str===null) || (str===''))
          return false;
    else
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
        Password: "o*L7GJ08MmrXO7MT",
        To : uemail.value,
        From: "bazaarticker@gmail.com",
        Subject: "BazaarTracker Data",
        Body: bodystr,
    }).then(
        message => alert("Data sent successfully")
    );
}
