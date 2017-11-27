// Thanks to https://ctrlq.org/code/19639-turn-div-clickable-link!
$(document).ready(function () {
    $(".w3-card-2").click(function () {
        window.open($(this).find("a:first").attr("href"));
        return false;
    });
});