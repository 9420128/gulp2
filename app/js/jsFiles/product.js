$(function () {
    let $catalogElement = $('#catalogElement')
    let $elementNavigation = $('#elementNavigation')
    let $elementTools = $('#elementTools')
    let maxScroll

    if (
        $elementNavigation.find('.products-tabs').height() >
        $elementTools.find('.fixContainer').height()
    ) {
        maxScroll =
            $catalogElement.offset().top - $('.products-tabs').outerHeight()
    } else {
        maxScroll =
            $catalogElement.offset().top - $('.fixContainer').outerHeight() - 36
    }
    let navOffset = $elementTools.offset().top

    let scrollControl = function (event) {
        let curScrollValueY = event.currentTarget.scrollY
            ? event.currentTarget.scrollY
            : $(window).scrollTop()

        if (curScrollValueY <= maxScroll + $catalogElement.height()) {
            if (navOffset <= curScrollValueY) {
                $elementNavigation
                    .addClass('fixed')
                    .find('.products-tabs')
                    .removeClass('maxScroll')

                $elementTools
                    .addClass('fixed')
                    .find('.fixContainer')
                    .removeClass('maxScroll')
            } else {
                $elementNavigation
                    .removeClass('fixed')
                    .find('.products-tabs')
                    .removeClass('maxScroll')
                $elementTools
                    .removeClass('fixed')
                    .find('.fixContainer')
                    .removeClass('maxScroll')
            }
        } else {
            $elementNavigation
                .removeClass('fixed')
                .find('.products-tabs')
                .addClass('maxScroll')
            $elementTools
                .removeClass('fixed')
                .find('.fixContainer')
                .addClass('maxScroll')
        }
    }

    $(window).on('ready scroll resize', scrollControl)
    $(document).on('load', scrollControl)
})

//global function
// прокрутка в карточке товара
let startElementTabs

$(function () {
    //vars
    let arCoordinates, $mainScrollObj, $tabElements, $tabs

    //after page load
    $(window).on('load', function () {
        let scrollToElement = function (event) {
            let $this = $(this).parents('.products-tabs__item')
            let toElementID = $this.data('id')

            if (toElementID) {
                $tabElements.removeClass('active')

                $mainScrollObj.stop().animate(
                    {
                        scrollTop: getElementOffset('#' + toElementID) + 'px',
                    },
                    250
                )

                return event.preventDefault($this.addClass('active'))
            }
        }

        let calcCloseElement = function (coordinate) {
            let copyCoordinate = []

            $.each(arCoordinates, function (i, val) {
                if (coordinate <= val) {
                    copyCoordinate.push({
                        id: i,
                        value: val,
                    })
                }
            })

            copyCoordinate.sort(function (obj1, obj2) {
                if (obj1.value < obj2.value) return -1
                if (obj1.value > obj2.value) return 1
                return 0
            })

            return copyCoordinate[0]
        }

        let scrollControl = function (event) {
            let curScrollValueY = event.currentTarget.scrollY
                ? event.currentTarget.scrollY
                : $(window).scrollTop()
            let arCurrentTab = calcCloseElement(curScrollValueY)
            if (arCurrentTab != undefined) {
                $tabElements.removeClass('active')
                $tabElements
                    .filter('[data-id="' + arCurrentTab['id'] + '"]')
                    .addClass('active')
            }
        }

        let getElementOffset = function (getElement) {
            //get jquery element
            let $curElement = $(getElement)

            //get element offset
            let elementOffset = $curElement.offset()

            //if not empty
            if (typeof elementOffset == 'object') {
                return elementOffset.top
            }
        }

        startElementTabs = function () {
            $tabs = $('.products .products-tabs')
            $tabElements = $tabs.find('.products-tabs__item:not(".disabled")')
            $mainScrollObj = $('html, body')
            arCoordinates = {}

            $tabElements.each(function (i, nextElement) {
                let $nextElement = $(nextElement)
                if ($nextElement.data('id')) {
                    arCoordinates[$nextElement.data('id')] = getElementOffset(
                        '#' + $nextElement.data('id')
                    )
                }
            })
        }

        //calc tabs
        startElementTabs()

        $(document).on(
            'click',
            '#elementNavigation .products-tabs__item a, .products__mobil .products-tabs__item a',
            scrollToElement
        )
        $(window).on('scroll', scrollControl)
    })
})

const scrollToPropertyList = function (event) {
    $('html, body').animate(
        {
            scrollTop: $('#properties').offset().top + 'px',
        },
        250
    )

    return event.preventDefault()
}

$(document).on('click', '.js-properties', scrollToPropertyList)
