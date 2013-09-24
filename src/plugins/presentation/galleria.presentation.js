/**
 * Galleria Presentation Plugin 2013-09-23
 *
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */
 
(function( $, window ) {

/*global jQuery, Galleria, window */

Galleria.requires(1.25, 'The Presentation Plugin requires Galleria version 1.2.5 or later.');

Galleria.Presentation = (function() {

    var initFinished = false,

        support = navigator.presentation.displayAvailable,

        windowProxy,

        remoteUrl = "file:///home/guangzhen/galleria/src/plugins/presentation/PresentationClient.html",

        initDisplay = function() {
            if (initFinished)
                return;
            if ( !support ) {
                Galleria.log("Presentation not supported");
                return;
            }
            navigator.presentation.requestShow(
                remoteUrl,
                function(win) {
                    Galleria.log("Init presentation remote display succeed");
                    windowProxy = win;
                    initFinished = true;
                },
                function() {Galleria.log("Presentation failed");}
            );
        };

    if ( !support ) {
        Galleria.log("Presentation not supported");
    }

    return {
        displayImg : function(imgUrl) {
            if (!initFinished) {
                Galleria.log("Presentation remote display not initialized");
                initDisplay();
            } else {
                windowProxy.postMessage(imgUrl, '*');
            }
        },

        init : function() {
            initDisplay();
        }
    };
}());

}( jQuery, this ));

