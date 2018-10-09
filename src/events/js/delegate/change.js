/**
 *------------------------------------------------------------------------------
 *
 *  Delegate Change Events Using 'data-*' Attributes + Directive PubSub System
 *
 */

require(['directive'], function(directive) {

    'use strict';


    let options = [
            { key: 'stopchange' },
            {
                fn: directive.fn,
                key: 'change'
            }
        ],
        rootkey = 'root.change';


    document.addEventListener('change', directive.delegate(options, rootkey), true);

});
