    // Сайтбар меню
    const __active = "active";
    const __menuID = "asideItem";
    const __opener = "jsChild";
    const __drop = "aside__drop";
    let __menuTimeoutID;

    const $_self = $("#" + __menuID);
    const $_eChild = $_self.children("." + __opener);

    const openChild = function(){

        const $_this = $(this);

        $_eChild.removeClass(__active).find("." + __drop).hide();
        $_this.addClass(__active).find("." + __drop).css("display", "block");

        return clearTimeout(__menuTimeoutID);

    }

    const closeChild = function(){
        const $_captureThis = $(this);
        __menuTimeoutID = setTimeout(function(){
            $_captureThis.removeClass(__active).find("." + __drop).hide();
        }, 500);
    }

    $_eChild.hover(openChild, closeChild);

    // Гамбургер
    let slideCollapsedBlock = function(event){
        let $collapsed =  $("#aside").children(".aside__nav");
        if(!$collapsed.is(":visible") || $collapsed.hasClass("toggled")){
            $collapsed.stop().slideToggle().addClass("toggled");
            return event.preventDefault();
        }
    };

    $(document).on("click", "#asideHead", slideCollapsedBlock)
