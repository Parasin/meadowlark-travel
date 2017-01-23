suite( 'Global Tests', () => {
    "use strict";
    test( 'page has a valid title', () => {
        assert( document.title && document.title.match( /\S/ ) &&
            document.title.toUpperCase() !== 'TODO' );
    } );
} );
