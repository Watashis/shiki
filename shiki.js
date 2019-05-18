// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Watashis
// @match        https://shikimori.one/*
// @include      https://shikimori.one/*
// @grant        none
// ==/UserScript==
var modal = '<link rel="stylesheet/less" type="text/css" href="https://semantic-ui.com/src/definitions/modules/modal.less" />'
          + '<script src="https://semantic-ui.com/dist/semantic.js"></script>'
          + '<script src="https://semantic-ui.com/javascript/modal.js"></script>'
          + '<link rel="stylesheet" type="text/css" class="ui" href="https://semantic-ui.com/dist/semantic.min.css">'
          + '<script src="https://semantic-ui.com/javascript/embed.js"></script>';
$('head').append(modal);
