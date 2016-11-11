$(function() {
    var icons = {
        header: "ui-icon-plus",
        activeHeader: "ui-icon-minus"
    };
    $("#accordion").accordion({
        icons: icons
    });
    $("#toggle").button().on("click", function() {
        if ($("#accordion").accordion("option", "icons")) {
            $("#accordion").accordion("option", "icons", null);
        } else {
            $("#accordion").accordion("option", "icons", icons);
        }
    });
});
