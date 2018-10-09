/**
 *------------------------------------------------------------------------------
 *
 *  Toggle State Click Event
 *
 */

require(['directive', 'dom', 'modules/state'], function(directive, dom, state) {

    'use strict';


    let active = [],
        attribute = 'data-toggle';


    const detoggle = (e) => {
        if (active.length === 0) {
            return;
        }

        let target = e.target;

        for (let i = 0, n = active.length; i < n; i++) {
            let element = active[i];

            if (element.contains(target)) {
                return;
            }

            directive.dispatch('toggle', { type: 'click' }, element);
        }
    };

    const toggle = function(e) {
        let target = dom.id( this.getAttribute(attribute) ) || this,
            type = e.type;

        if (type === 'focus' || type === 'mouseenter') {
            type = 'activate';
        }
        else if (type === 'blur' || type === 'mouseleave') {
            type = 'deactivate';
        }
        else {
            type = 'toggle';
        }

        // 'target' Is Being Deactivated
        if (state.active(target)) {
            let index = active.indexOf(target);

            if (index > -1) {
                active.splice(index, 1);
            }
        }
        else {
            active.push(target);
        }

        state[type](target);
    };


    directive.on('root.click', detoggle);
    directive.on('toggle', toggle);

});
