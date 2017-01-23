"use strict";
const PORT       = process.env.PORT || 3000;
let express      = require( 'express' ),
      app        = express(),
      handlebars = require( 'express-handlebars' ).create( {
          defaultLayout: 'main',
          helpers      : {
              section: function ( name, options ) {
                  if ( !this._sections ) {
                      this._sections = {};
                  }
                  this._sections[ name ] = options.fn( this );
                  return null;
              }
          }
      } ),
      fortune    = require( './lib/fortune' );

app.engine( 'handlebars', handlebars.engine );

app.set( 'view engine', 'handlebars' );
app.set( 'port', PORT );

/* Middleware to handle QA Tests */
app.use( ( req, res, next ) => {
    res.locals.showTests = app.get( 'env' ) !== 'production' &&
        req.query.test === '1';
    next();
} );

app.use( express.static( __dirname + '/public' ) );

/* Home route */
app.get( '/', ( req, res ) => {
    res.render( 'home' );
} );

/* About route */
app.get( '/about', ( req, res ) => {
    res.render( 'about', {
        fortune       : fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    } );
} );

/* Hood River route */
app.get( '/tours/hood-river', ( req, res ) => {
    res.render( 'tours/hood-river' );
} );

/* Request Group Rate route */
app.get( '/tours/request-group-rate', ( req, res ) => {
    res.render( 'tours/request-group-rate' );
} );

/* Custom 404 */
app.use( ( req, res, next ) => {
    res.status( 404 );
    res.render( '404' );
} );

/* Custom 500 page */
app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 );
    res.render( '500' );
} );

app.listen( app.get( 'port' ), () => {
    console.log( 'Express started on localhost:' + app.get( 'port' ) );
} );
