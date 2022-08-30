
const dotenv = require( 'dotenv' );
const express = require( 'express' );
const cors = require( 'cors' );
const os = require( 'os' );
var needle = require( 'needle' );
// const fetch = require('node-fetch');
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const postUrl = process.env.POSTURL || "localhost:5001";

app.use( cors( '*' ) );
app.use( express.urlencoded( { extended: true } ) );

app.use( express.json() );

let results = null;

const setTup = async () => {
   // const response = await fetch('http://localhost:5001/post');
   needle.get( `http://${postUrl}/post`, function ( error, response, body ) {
      if ( !error && response.statusCode == 200 ) {
         console.log( body );
         results = body;
      }

   } );

}


app.get( '/os', async ( req, res ) => {
   console.log();
   const obj = {
      host: os.hostname(),
      platform: os.platform(),
      info: os.userInfo(),
      cpus: os.cpus(),
      memory: os.totalmem(),
      dir: os.homedir(),
      temp: os.tmpdir()
   }
   res.send( obj );
} );

app.get( '/', async ( req, res, next ) => {
   res.send( 'welcome route app1' );
} );

app.get( '/ip', async ( req, res, next ) => {
   res.send( process.env );
} );
app.get( '/config', async ( req, res, next ) => {
   res.send( results );
} );

app.listen( port, () => {
   console.log( `App1 Server is listening at http://${ host }:${ port }` );
   setTup()
} );