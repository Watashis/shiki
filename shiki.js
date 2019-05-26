// ==UserScript==
// @name         Shiki_button
// @version      0.1
// @author       Watashis
// @match https://shikimori.org/*
// @match http://shikimori.org/*
// @match https://shikimori.one/*
// @match http://shikimori.one/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://semantic-ui.com/dist/semantic.min.js
// @grant        none
// ==/UserScript==


var $ = jQuery.noConflict(true);

function dubset(data, id) {
    console.log(id);
    console.log(data);
    $('#dubs').empty()
    var i = 0;
    while (i < data['dub'].length) {
        var dubs = '';
        if (id == data['dub'][i]['id']) {
            var url = data['dub'][i]['url'].replace("http://", "https://");
            console.log(url)
            dubs = '<div class="item">'
                + ' <div class="content">'
                + '<b class="header">' + data['dub'][i]['author'] + '</b>';
        } else {
            dubs = '<div class="item" id="id_' + data['dub'][i]['id'] + '">'
                + ' <div class="content">'
                + '<a class="header">' + data['dub'][i]['author'] + '</a>';
        }

        var url2 =((data['dub'][i]['url'].replace("http://", "https://")).replace("https://", "")).split('/')[0]
        dubs += '<div class="description">' + url2 + '</div>'
            + '</div>'
            + '</div>';
        $('#dubs').append(dubs);
        $('#id_' + data['dub'][i]['id']).click(function (i) {
            dubset(data,data['dub'][i]['id']);
        }.bind(null, i));
        i++;
    }
    $('.ui.embed').attr('data-url', url);
    $('.ui.embed').embed();
    return 1;
}

function md(data, ep) {
    console.log(data)
    console.log(data['dub'].length);
    var i = 0;
    var url = data['dub'][0]['url'].replace("http://", "https://");
    while (i < data['dub'].length) {
        var dubs = '';
        if (i === 0) {
            dubs = '<div class="item">'
                + ' <div class="content">'
                + '<b class="header">' + data['dub'][i]['author'] + '</b>';
        } else {
            dubs = '<div class="item" id="id_' + data['dub'][i]['id'] + '">'
                + ' <div class="content">'
                + '<a class="header">' + data['dub'][i]['author'] + '</a>';
        }

        var url2 =((data['dub'][i]['url'].replace("http://", "https://")).replace("https://", "")).split('/')[0]
        dubs += '<div class="description">' + url2 + '</div>'
            + '</div>'
            + '</div>';
        $('#dubs').append(dubs);
        $('#id_' + data['dub'][i]['id']).click(function (i) {
            dubset(data, i);
        }.bind(null, i));
        i++;
    }
    //console.log(dubs);
    //$('.ui.modal>.content').html(html);
    //$('#eps').append(eps);
    $('.ui.embed').attr('data-url', url);
    $('.ui.embed').embed();
    return 1;
}


function watch_anime(shiki_id, ep, dub) {
    return $.get('https://a.pidorass.com/' + shiki_id + '/' + ep + '/' + dub);
}


var cls = function () {
    console.log('work')
    var shiki_id = ((window.location.pathname).split("-")[0]).replace('/animes/', '');
    try {
        var ep = Number.parseInt($('.current-episodes')[0].innerText)
    } catch (e) {
        var ep = 0;
    }
    var eps = $('.watch-online-placeholer').attr('data-episodes_aired');
    if (eps > ep) {
        ep++;
    }
    console.log(shiki_id)
    watch_anime(shiki_id, ep, 'no').then(data => {
        md(data, ep);
        $('.ui.modal').modal('show');
    });
};



function start() {
    var modals = '<link rel="stylesheet/less" type="text/css" href="https://semantic-ui.com/src/definitions/modules/modal.less" />'
        + '<script src="https://semantic-ui.com/javascript/modal.js"></script><link rel="stylesheet" type="text/css" class="ui" href="https://semantic-ui.com/dist/semantic.min.css"><script src="https://semantic-ui.com/javascript/embed.js"></script>';
    $('head').append(modals);
    var test = '<div class="ui modal">'
        + '<div class="header">' + $('.head>h1')[0].innerText + '</div>'
        + '<div class="content">'
        + '<div class="ui stackable four column grid">'
        + '<div class="column" style="width: 100%;">'
        + '<div>'
        + '<div class="ui embed" data-url="" data-icon="video play icon"></div><br>'
        + '<div class="ui stackable four column grid">'
        + '<div class="column" style="width: 50%;">'
        + '<div class="ui relaxed list" id="dubs"></div>'
        + '</div>'
        + '<div class="column" style="width: 50%;">'
        + '<div class="ui relaxed divided list" id="eps"></div>'
        + '</div></div></div>';
    + '</div></div>';
    $('.l-page').append(test);
    var animeName = $("#animes_show > section > div > header > h1").text().split(" / "),
        link = $('<a target="_blank"/>');

    var ep = $('.watch-online-placeholer').attr('data-episodes_aired');
    $($('.head>h1')[0]).css('margin', '-.28em 0');

    $(".watch-online-placeholer").empty().append(
        $('<div/>').addClass('watch-online').append(
            link.addClass("b-link_button dark").text('Смотреть онлайн')
        ).append(
        ).append($('<div/>').addClass('clearfix'))
    ).click(cls);

}

$(document).ready(start);
$(document).on('page:load', start);
$(document).on('turbolinks:load', start);
