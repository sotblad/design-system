/**
 *--------------------------------------------------------------------------
 *
 *  Frontend Development Helper
 *
 *  Displays Browser Dimensions, And Reloads CSS On Button Press
 *
 */

(function( window, document ) {

    'use strict';


    let development = document.createElement('div');


    development.innerHTML = `
        <span class='development-dimensions'>${window.innerWidth} x ${window.innerHeight}</span>
        <span class='development-reloadcss'>R</span>
    `;
    development.className = 'development';

    document.body.prepend(development);


    let dimensions = document.getElementsByClassName('development-dimensions')[0] || null,
        reload = document.getElementsByClassName('development-reloadcss')[0] || null,
        stylesheet = document.getElementById('stylesheet');


    if (!dimensions || !reload || !stylesheet) {
        return;
    }


    reload.addEventListener('click', () => {
        stylesheet.setAttribute('href', `${stylesheet.getAttribute('href').split('?')[0]}?js=${Math.random( 0, 10000 )}`);
    });


    window.addEventListener('resize', () => {
        dimensions.textContent = `${window.innerWidth} x ${window.innerHeight}`;
    });

})( window, document );
