$(document).ready(function () {
    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false,
    })

    new Typed('.typed', {
        strings: ['Eat.', 'Drink.', 'Repeat.'],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false,
    })
})
