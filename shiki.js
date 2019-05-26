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

function getHostname(url) {
    var link = document.createElement('a');
    link.href = url;
    return link.hostname;
}

function renderDubList(data, id) {
    $('#dubs').empty();
    var url = '';
    data.dub.forEach(function renderDub(dub) {
        var html = '';
        if (dub.id === id) {
            url = dub.url;
            html = '<div class="item">'
                + ' <div class="content">'
                + '<b class="header">' + dub.author + '</b>';
        } else {
            html = '<div class="item" id="id_' + dub.id + '">'
                + ' <div class="content">'
                + '<a class="header">' + dub.author + '</a>';
        }

        html += '<div class="description">' + getHostname(dub.url) + '</div>'
            + '</div>'
            + '</div>';

        $('#dubs').append(html);

        $('#id_' + dub.id).click(renderDubList.bind(null, data, dub.id));
    });

    $('.ui.embed').attr('data-url', url.split('http://').join('https://'));
    $('.ui.embed').embed();
}

function renderDubListByIndex(data, index) {
    return renderDubList(data, data.dub[index].id);
}

function getEpisodeData(shiki_id, ep, dub) {
    return $.get('https://a.pidorass.com/' + shiki_id + '/' + ep + '/' + dub);
}

function showModal() {
    var shiki_id = ((window.location.pathname).split("-")[0]).replace('/animes/', '');
    var ep = parseInt($('.current-episodes').text(), 10) || 0;
    var eps = $('.watch-online-placeholer').attr('data-episodes_aired');
    if (eps > ep) {
        ep++;
    }

    getEpisodeData(shiki_id, ep, 'no').then(function(data) {
        renderDubListByIndex(data, ep);
        $('.ui.modal').modal('show');
    });
}

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
    ).click(showModal);

}

$(document).ready(start);
$(document).on('page:load', start);
$(document).on('turbolinks:load', start);
