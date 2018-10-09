/**
 *------------------------------------------------------------------------------
 *
 *  Delegate Click Events Using 'data-*' Attributes + Directive PubSub System
 *
 */

require(['directive'], function(directive) {

    'use strict';


    let options = [
            { key: 'stopclick' },
            {
                fn: directive.fn,
                key: 'click'
            }
        ],
        rootkey = 'root.click';


    document.addEventListener('click', directive.delegate(options, rootkey));

});
