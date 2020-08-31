checkSize();
$(window).resize(function() {
    
    checkSize();
    
})

function checkSize() {
    mainDiv = document.getElementsByClassName("mainDiv");

    if (window.innerWidth <= 600) {
        for (i = 0; i < mainDiv.length; i++) {
            mainDiv[i].style.float = "none";
            mainDiv[i].style.width = "100%";
        }
    }
    else {
        for (i = 0; i < mainDiv.length; i++) {
            mainDiv[i].style.float = "left";
            mainDiv[i].style.width = "33.3%";
        }
    }
}