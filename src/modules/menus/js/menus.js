/**
 *------------------------------------------------------------------------------
 *
 *  Register Menus Directives Using Overlay Module
 *
 */

require(['emitter'], function(emitter) {

    'use strict';


    let container = {
            id: 'menus',
            modifier: (k) => `menus--${k}`,
            modifiers: []
        },
        child = {
            attribute: {
                modifier: 'data-modifier',
                trigger: 'data-menu'
            },
            id: (k) => `menu-${k}`,
        },
        directives = {
            close: 'menus',
            trigger: 'menu'
        };


    function mount() {
        require('modules/overlays')(child, container, directives);
    }


    emitter.on('modules.mount', mount);

});
