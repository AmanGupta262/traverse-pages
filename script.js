/// <reference path="../jquery-3.5.1.js" />
var prev = $('#prev');
var next = $('#next');

var page = 1;

function showPages() {
    var solInput = $('#sol');
    var sol = solInput.val();


    if (sol === "") {
        alert("Please Fill the data")
    }

    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
        method: 'get',
        success: function (data) {
            var photos = data.photos;
            updateBtn(photos);
            if (photos.length === 0) {
                alert('You hava reached last page');
            }
            else {
                $('.result').html("");
                photos.forEach(e => {
                    $('.result').append(`<img src="${e.img_src}" alt="${e.id}">`);
                });
            }
        },
        data: {
            sol: sol,
            page: page,
            api_key: '3CS8CAlbkrulWQJjGVMNdwELZeXR0HopxNBsHuhq'
        }
    });
}
function updateBtn(photos) {

    if (page === 1) {
        prev.attr('disabled', true);
        next.removeAttr('disabled');
    }
    else if (photos.length === 0) {
        next.attr('disabled', true);
        prev.removeAttr('disabled');
        --page;
    }
    else {
        console.log("2");
        prev.removeAttr('disabled');
        next.removeAttr('disabled');
    }
}

$('#fetch').on('click', showPages);

prev.on('click', function () {
    page--;
    showPages();
});
next.on('click', function () {
    page++;
    showPages();
});