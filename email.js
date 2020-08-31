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
