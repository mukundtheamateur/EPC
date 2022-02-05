if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(reg => console.log('service worker registered', reg))
      .catch(err => console.log('service worker not registered', err));
  }

var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight',
    progress = document.querySelector('#progress'),
    scroll;
var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");

document.addEventListener('scroll', function () {
    scroll = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    progress.style.setProperty('--scroll', scroll + '%');
    scrollpos = window.scrollY;

    if (scrollpos > 10) {
        header.classList.add("bg-black-555");
        navcontent.classList.remove("bg-black-555");
        navcontent.classList.add("bg-black-555");
    } else {
        header.classList.remove("bg-black-555");
        navcontent.classList.remove("bg-black-555");
        navcontent.classList.add("bg-black-555");

    }

});

document.getElementById('nav-toggle').onclick = function () {
    document.getElementById("nav-content").classList.toggle("hidden");
}

var emailBtn = document.getElementById("emailBtn");
$('#footerForm').submit(function (e) {
    emailBtn.disabled = true
    emailBtn.innerHTML = 'Processing'
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'https://i-gnez.herokuapp.com/rcount',
        data: $(this).serialize(),
        statusCode: {
            429: function (response) {
                openClose('emailError', 'Permitted Limit Exhausted', 'Hey techie, your Permitted limit has been exhausted. Please try again after some time');
                emailBtn.remove();
            },
            200: function (response) {
                if (response.message == 'No event registered') {
                    openClose('emailError', 'Hello Stranger ', 'You are not registered in any event');
                } else {
                    openClose('emailSuccess', 'List sent sucessfully', 'Please check your inbox for further details')
                }
                emailBtn.disabled = false;
                emailBtn.innerHTML = 'Submit';
            }
        }
    });
})


$(document).ready(function () {
    preloaderFadeOutTime = 500;

    function hidePreloader() {
        var preloader = $('.spinner-wrapper');
        preloader.fadeOut(preloaderFadeOutTime);
    }
    hidePreloader();
});

function openClose(e, t, a) {
    var n = document.getElementById(e);
    message = n.getElementsByClassName("message")[0], title = n.getElementsByClassName("modalTitle")[0], message.innerHTML = a, title.innerHTML = t, "none" === n.style.display ? n.style.display = "block" : n.style.display = "none"
}