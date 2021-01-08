// import $ from 'jquery'

$(function () {
    let $sliceMenu = $('#subMenu')
    let $sliceMenuItems = $sliceMenu.children('li')
    let sliceMenuOpened = false
    let resizeCacheWidth = 0

    let sliceMenuOnline = function (resize) {
        if (resize == true) {
            $sliceMenu.find('.removed').each(function (i, nextElement) {
                let $nextElement = $(nextElement)
                $sliceMenu.append($nextElement.removeClass('removed'))
            })

            $sliceMenu.find('.navbarItemsContainer').remove()
        } else {
            $sliceMenu.css({ visibility: 'visible', opacity: 1 })
        }

        let menuMaxWidth = $('.navbar__left').width()
        let sumMenuItemsWidth = 70

        if ($(window).width() <= 700) {
            menuMaxWidth = 0
        }

        $sliceMenuItems.each(function (i, nextElement) {
            let $nextElement = $(nextElement)
            sumMenuItemsWidth += $nextElement.width()

            if (sumMenuItemsWidth >= menuMaxWidth) {
                $nextElement.addClass('removed')
            }
        })

        //create drop down
        let $removedItems = $sliceMenu.find('.removed')

        if ($removedItems.length > 0) {
            let $removedItemsList = $('<ul/>').addClass('removedItemsList')
            let $navbarItemsLink = $('<li/>')
                .addClass('navbarItemsContainer')
                .append(
                    $('<a/>', { class: 'navbarItemsLink' }).attr('href', '#')
                )

            $removedItems.each(function (i, nextElement) {
                let $nextElement = $(nextElement)
                $removedItemsList.append($nextElement)
            })

            $sliceMenu.append($navbarItemsLink.append($removedItemsList))
        }
    }

    let openDropDownMenu = function (event) {
        if (sliceMenuOpened == false) {
            $('#subMenu .removedItemsList').show()
            sliceMenuOpened = true
        } else {
            $('#subMenu .removedItemsList').hide()
            sliceMenuOpened = false
        }

        return event.preventDefault()
    }

    let closeDropDownMenu = function (event) {
        $('#subMenu .removedItemsList').hide()
        sliceMenuOpened = false
    }

    $(document).on('click', '.navbarItemsLink', openDropDownMenu)

    $(document).on(
        'click',
        '.removedItemsList, .navbarItemsLink',
        function (event) {
            return event.stopImmediatePropagation()
        }
    )

    $(document).on('click', closeDropDownMenu)

    document.addEventListener('DOMContentLoaded', () => {
        resizeCacheWidth = $(window).width()
        sliceMenuOnline(false)
    })

    $(window).on('resize', function (event) {
        //fix mobile scroll/resize lag
        if (resizeCacheWidth != $(window).width()) {
            resizeCacheWidth = $(window).width()
            sliceMenuOnline(true)
        }
    })

    resizeCacheWidth = $(window).width()
    sliceMenuOnline(false)
})

// modal
const modalCloseBtn = `<svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="16" y2="16"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="16" y1="1" x2="1" y2="16"></line></svg>`

$('.js-close').html(modalCloseBtn)

function modalOpen(e) {
    e.preventDefault()

    const dataId = $(this).data('modal')

    if ($('#' + dataId).length === 0) return false

    const modalId = $('#' + dataId)

    modalId.addClass('open')
    // modalId.children('.modal__wrap').prepend(modalCloseBtn)
    $('html').addClass('modal-open')

    return true
}

function modalClose() {
    $('html').removeClass('modal-open')
    $('.modal.open').removeClass('open')
}

$('.header-phone__callback').on('click', modalOpen)

$('.modal').on('click', (e) => {
    let el = $('.modal.open>.modal__wrap')

    if (!el.is(e.target) && el.has(e.target).length === 0) return modalClose()
})

$('.modal-close').on('click', (e) => {
    e.preventDefault()
    return modalClose()
})
