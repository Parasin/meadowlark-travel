"use strict";
const PORT       = process.env.PORT || 3000;
let express      = require( 'express' ),
      app        = express(),
      handlebars = require( 'express-handlebars' ).create( { defaultLayout: 'main' } );

app.engine( 'handlebars', handlebars.engine );

app.set( 'view engine', 'handlebars' );
app.set( 'port', PORT );

app.use( express.static( __dirname + '/public' ) );

app.get( '/', ( req, res ) => {
    res.render( 'home' );
} );

app.get( '/about', ( req, res ) => {
    let fortunes = [
        'Fortune 1',
        'Fortune 2',
        'Fortune 3',
        'Fortune 4'
    ];

    let randomFortune = fortunes[ Math.floor( Math.random() * fortunes.length ) ];

    res.render( 'about', { fortune: randomFortune } );
} );

// Custom 404
app.use( ( req, res, next ) => {
    res.status( 404 );
    res.render( '404' );
} );

// Custom 500 page
app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 );
    res.render( '500' );
} );

app.listen( app.get( 'port' ), () => {
    console.log( 'Express started on localhost:' + app.get( 'port' ) );
} );
