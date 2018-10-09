/**
 *------------------------------------------------------------------------------
 *
 *  Reusable Overlay Functionality ( Menus, Modals )
 *
 *  container
 *      id              Overlay Container Id ( str )
 *      modifier        Create Modifier Classname Using Value Provided
 *                      By 'child.attribute.modifier' ( fn )
 *      modifiers       Modifiers Applied To Overlay During Activation  ( arr )
 *  child
 *      attribute
 *          modifier    Prefix-less Modifier To Add On Overlay Container ( str )
 *          trigger     Contains Value To Generate Id ( str )
 *      id              Create Child Id Using Value Provided By Trigger ( fn )
 *  directives
 *      close           Close Overlay + Children ( str )
 *      trigger         Trigger Opening/Closing An Overlay Child ( str )
 *
 */

define('modules/overlays', {
    dependencies: ['directive', 'dom', 'emitter', 'node', 'modules/state'],
    value: function(directive, dom, emitter, node, state) {

        'use strict';


        // Dispatch Shared Functions
        function shared(activate, deactivate, dispatch) {
            state.activate(activate);
            state.deactivate(deactivate);

            emitter.dispatch(`overlay.${dispatch}`);
        }

        // Return Active Siblings
        function siblings(element) {
            return node.siblings(element, (s) => state.active(s));
        }


        const register = (child, container, directives) => {
            container.node = dom.id(container.id);

            if (!container.node) {
                return;
            }


            function activate(target) {
                let attribute = target.getAttribute(child.attribute.modifier),
                    modifier = attribute ? container.modifier( attribute ) : null;

                if (modifier && !container.modifiers.includes(modifier)) {
                    node.update(container.node, {
                        classname: {
                            [modifier]: 'add',
                            [container.modifiers]: 'remove'
                        },

                        after: () => {
                            container.modifiers = [modifier];
                        }
                    });
                }

                shared([container.node, target], siblings(target), 'activated');
            }

            function deactivate() {
                shared([], siblings(container.node.firstElementChild).concat([container.node]), 'deactivated');

                // Let Closing CSS Animation Finish Before Removing Modifiers
                setTimeout(() => {
                    node.update(container.node, {
                        classname: {
                            [container.modifiers]: 'remove'
                        },

                        after: () => {
                            container.modifiers = [];
                        }
                    });
                }, 500);
            }


            const close = () => {
                if (!state.active(container.node)) {
                    return;
                }

                deactivate();
            };

            const trigger = function() {
                let id = child.id( this.getAttribute(child.attribute.trigger) ),
                    target = dom.id(id);

                if (target && !state.active(target)) {
                    activate(target);
                }
                else {
                    close();
                }
            };


            directive.on(directives.close, close);
            directive.on(directives.trigger, trigger);
        };


        return register;

    }
});
