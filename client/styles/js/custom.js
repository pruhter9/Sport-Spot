    windowWidth = $(window).width();
    console.log(windowWidth)
    if (windowWidth < 976 ) {

        $("#map").css("width", 100)

    } else if (windowWidth >= 976) {

        $("#map").css("width", 50)

    }
