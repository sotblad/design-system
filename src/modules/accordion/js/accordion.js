/**
 *------------------------------------------------------------------------------
 *
 *  Set Max Height Of Accordion Element
 *
 */

require(['directive', 'dom', 'node'], function(directive, dom, node) {

    'use strict';


    let attribute = 'data-accordion',
        classname = 'accordion';


    function active(element) {
        return element.classList.contains(classname) && element.style.maxHeight > '0px';
    }


    const accordion = function() {
        let target = dom.id( this.getAttribute(attribute) );

        if (!target || active(target)) {
            return;
        }

        node.update(target, {
            style: { maxHeight: `${target.scrollHeight}px` },

            before: () => {
                node.style(node.siblings(target, active), { maxHeight: '0px' });
            }
        });
    };


    directive.on('accordion', accordion);

});
