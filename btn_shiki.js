var test = '<div class="ui modal">'
    + '<div class="header">' + $('.head>h1')[0].innerText + '</div>'
    + '<div class="content">'
    + '<p>1</p>2<p>3</p>4<p>5</p>6'
    + '</div></div>';
$('.l-page').append(test);

function md(data) {
    var html = '<div class="ui stackable four column grid">'
        + '<div class="column" style="width: 100%;"><div>'
        + '<div class="ui embed" data-url="' + data['video'] + '" data-icon="video play icon"></div><br>'
        + '<div class="ui stackable four column grid">'
        + '<div class="column" style="width: 50%;">'
        + '<div class="ui relaxed divided list" id="dubs"></div></div>'
        + '<div class="column" style="width: 50%;">'
        + '<div class="ui relaxed divided list" id="eps"></div>'
        + '</div></div></div>'
        + '</div></div>';
    var i = 0;
    var dubs = '';
    var eps = '';
    while (i < data['dub'].length) {
        dubs += '<div class="item"><div class="content">'
            + '<a class="header">' + data['dub'][i] + '</a>'
            + '<div class="description">' + data['host'][i] + '</div>'
            + '</div></div>';
        eps += '<div class="item"><div class="content">'
            + '<a class="header">#' + (i + 1) + '</a>'
            + '</div></div>';

        //console.log( i );
        i++;
    }
    //console.log(dubs);
    $('.ui.modal>.content').html(html);
    $('#dubs').append(dubs);
    $('#eps').append(eps);
    $('.ui.modal').modal('show');
    $('.ui.embed').embed();
}
function watch_anime(shiki_id, ep, dub) {
    var url = 'https://me.cyka.me/' + shiki_id + '/' + ep + '/' + dub
    $.get(url, function (data) {
        console.log(data);
        //alert('Загрузка завершена.');
        //$('.ui.modal>.content').html(data);
        md(data);
    });
}
var ep = $('.watch-online-placeholer').attr('data-episodes_aired');
var html = '<div class="block"><div id="bnt_watch" class="b-link_button dark watch-online">Смотреть онлайн</div></div>';
console.log(html);

$('.l-page').append('<div id="parse">lol</div>');
$('.watch-online-placeholer').html(html);


$(function () {
    var shiki_id = ((window.location.pathname).split("-")[0]).replace('/animes/', '');
    var ep = Number.parseInt($('.current-episodes')[0].innerText) + 1
    $('.b-link_button.dark.watch-online').bind('click', function () {
        watch_anime(shiki_id, ep, 'no');
    });
});
