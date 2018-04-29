require( "babel-register" )( {
    presets: [ "env","react-app" ],
} );
require("ignore-styles");
require( "./src/server" );