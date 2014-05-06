$(document).ready(function() {
    window.uwave = {};
    uwave.player = document.getElementById("player");
    uwave.playpause = function(e) {
        if(player.paused) {
            player.play();
            $(".playpause")
                .removeClass("glyphicon-play-circle")
                .addClass("glyphicon-pause");
            $(uwave).trigger("play");
        } else {
            player.pause()
            $(".playpause")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play-circle");
            $(uwave).trigger("pause");
        }
        e.preventDefault();
    };

    // These functions are just for the home page
    $(uwave).on("play", function() {
        $(".playtext").text("Pause");
    });
    $(uwave).on("pause", function() {
        $(".playtext").text("Tune in");
    });
    $(uwave).on("pageload", function() {
        if(!uwave.player.paused) {
            $(".playtext").text("Pause");
            $(".btn-play .playpause")
                .removeClass("glyphicon-play-circle")
                .addClass("glyphicon-pause");
        }
    });

    uwave.fixActiveNav = function() {
        // deactivate the old nav link
        $(".active").removeClass("active");
        // find the new one
        var pagename = window.location.pathname.split(".")[0];
        pagename = pagename.replace("/", "");
        if(pagename == "" || pagename == "index") {
            pagename = "home";
        }
        $(".navli." + pagename).addClass("active");
    };

    $(".navlink").on("click", function(e) {
        var newurl = e.currentTarget.href;
        console.log("Navigating to", newurl);
        $.get(newurl + "?contentonly").success(function(data) {
            $(".pagecontents").html(data);
            history.pushState(null, null, newurl);
            uwave.fixActiveNav();
            $(uwave).trigger("pageload", newurl);
        });
        e.preventDefault();
    });

    $(".tunein").on("click", uwave.playpause);
    uwave.fixActiveNav();

});
