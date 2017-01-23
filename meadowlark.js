"use strict";
const PORT       = process.env.PORT || 3000;
let express      = require( 'express' ),
      app        = express(),
      handlebars = require( 'express-handlebars' ).create( { defaultLayout: 'main' } ),
      fortune    = require( './lib/fortune' );

app.engine( 'handlebars', handlebars.engine );

app.set( 'view engine', 'handlebars' );
app.set( 'port', PORT );

app.use( express.static( __dirname + '/public' ) );

app.get( '/', ( req, res ) => {
    res.render( 'home' );
} );

app.get( '/about', ( req, res ) => {
    res.render( 'about', { fortune: fortune.getFortune() } );
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
