nunjucks.configure('/views', { autoescape: true });
var timeout = 1000;

var isDown = false;
var intervalScroll = 10000;
var animationSpeed = 7000;
function getAndRefreshViewers() {
    $.get("/api/pokesos", function(data) {

        var viewers = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].chaineCourante !== null && data[i].username !== null) {
                viewers.push(data[i]);
            }
        }

        $("#block-pokesos").html(nunjucks.render("list-viewers.html", {viewers: viewers}));

        setTimeout(function() {
            getAndRefreshViewers();
        }, timeout);
    });
}
$(document).ready(function() {
    setTimeout(function() {
        getAndRefreshViewers();
    }, timeout);

    setInterval(function() {
        scrollTop = 1000;
        if (isDown) {
            scrollTop = 0;
        }


        $('html, body').animate({
            scrollTop: scrollTop
        }, animationSpeed);


        if (isDown) {
            isDown = false;
        } else {
            isDown = true;
        }
    }, intervalScroll);
});

