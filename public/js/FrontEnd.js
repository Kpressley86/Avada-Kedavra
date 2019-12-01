// This will keep the header sticky at the top of the screen
window.onscroll = function () { myFunction() };

var companyTopNavHeader = document.getElementById("companyTopNavHeader");

var sticky = companyTopNavHeader.offsetTop;

function myFunction() {
    if (window.pageXOffset >= sticky) {
        companyTopNavHeader.classList.add("sticky")
    } else {
        companyTopNavHeader.classList.remove("sticky");
    }
}; 
