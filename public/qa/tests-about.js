suite( '"About" Pages Tests', () => {
    "use strict";
    test( 'Page should contain link to contact page', () => {
        assert( $( 'a[href="/contact"]' ).length );
    } );
} );
