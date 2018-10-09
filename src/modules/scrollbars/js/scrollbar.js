/**
 *------------------------------------------------------------------------------
 *
 *  Scrollbar Replacement
 *
 */

require(['dom', 'directive', 'emitter', 'node'], function(dom, directive, emitter, node) {

    'use strict';


    let attribute = 'data-scrollbar',
        modifier = 'scrollbar--hidden',
        ref = 'scrollbar';

    let scrolling = false;


    const mount = () => {
        let containers = dom.refs(ref);

        for (let i = 0, n = containers.length; i < n; i++) {
            directive.dispatch('scrollbar', {}, containers[i]);

            // Override To Set Height Of All Scrollbars
            scrolling = false;
        }
    };

    const scroll = function() {
        if (scrolling) {
            return;
        }
        else {
            scrolling = true;
        }

        let scrollbar = dom.id( this.getAttribute(attribute) );

        if (!scrollbar) {
            return;
        }

        let height = (this.clientHeight / this.scrollHeight) * 100,
            translate = `translate3d(0, ${(this.scrollTop / this.clientHeight) * 100}%, 0)`;

        node.update(scrollbar, {
            classname: { [modifier]: height >= 100 },
            style: {
                '-webkit-transform': translate,
                '-ms-transform': translate,
                'transform': translate,
                'height': `${height}%`
            },

            after: () => {
                scrolling = false;
            }
        });
    };


    directive.on('scrollbar', scroll);
    emitter.on('modules.mount', mount);

});
