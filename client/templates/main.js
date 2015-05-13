Template.main.onRendered(function() {
    var nav = $('nav');
    var navBottom = nav.offset().top + nav.height();
    var renderNavbar = function () {
        if ($(this).width() >= 768 && $(this).scrollTop() <= navBottom) {
            nav.removeClass('navbar-fixed-top');
            nav.addClass('navbar-static-top');
        } else {
            nav.removeClass('navbar-static-top');
            nav.addClass('navbar-fixed-top');
        }
    };
    renderNavbar();
    $(window).scroll(renderNavbar);
    $(window).resize(renderNavbar);
});

Template.main.events({
    'click .goto' : function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($.attr(e.target, "href")).offset().top - 120
        }, "slow");
    },
    'click .goto-top' : function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    }
});
