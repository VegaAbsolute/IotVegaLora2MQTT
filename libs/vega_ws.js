//vega_ws.ini version 1.0.2
const DELAY_MESSAGE = 10000;
const DELAY_RECONNECT = 5000;
const MAX_DELAY_PING = 120000;

let WebSocket = require( 'ws' );
let EventEmitter = require( 'events' );
let moment = require( 'moment' );

class VegaWS extends EventEmitter
{
  constructor(url)
  {
    super();
    this.url = url;
    this._connect = {
      _status: false,
      _lastTimePing: undefined
    };
    this.reload();
    const intervel = setInterval( ()=>{
      let currentDate = new Date().getTime();
      let validlastTimePing = typeof this.lastTimePing == 'number';
      if(!validlastTimePing) this.lastTimePing = currentDate;
      let delayTimeMessage = currentDate - this.lastTimePing;;
      if( !this.status || delayTimeMessage > MAX_DELAY_PING )
      {
        let validLastTimeReconnect = this.last_time_reconnect !== false;
        let lastDate = validLastTimeReconnect ? this.last_time_reconnect : currentDate;
        let time = currentDate - lastDate;
        if( time > DELAY_MESSAGE )
        {
          this.reload();
        }
      }
    }, DELAY_RECONNECT );
  }
  get last_time_reconnect ()
  {
    let validLastTimeReconnect = this._connect._last_time_reconnect !== undefined && typeof this._connect._last_time_reconnect === 'number';
    return validLastTimeReconnect ? this._connect._last_time_reconnect : false;
  }
  set last_time_reconnect ( ltr )
  {
    this._connect._last_time_reconnect = new Date().getTime();
  }
  get status ()
  {
    return this._connect._status;
  }
  get lastTimePing ()
  {
    return this._connect._lastTimePing;
  }
  set lastTimePing ( time )
  {
    this._connect._lastTimePing = time;
  }
  set status ( st )
  {
    this._connect._status = st;
  }
  reload ()
  {
    try
    {
      if(typeof this._connect.terminate === 'function') this._connect.terminate();
      this._connect = new WebSocket( this.url );
      this.status = false;
      this._connect._self = this;
      this.last_time_reconnect = new Date().getTime();
      this._connect.on('open', this._open);
      this._connect.on('message', this._message);
      this._connect.on('error', this._error);
      this._connect.on('close', this._close);
      this._connect.on('ping', this._ping);
    }
    catch (e)
    {
      console.log( moment().format('LLL'), e );
    }
  }
  _message ( message )
  {
    try
    {
      let obj = JSON.parse( message );
      let validCMD = obj.cmd != undefined;
      if ( validCMD )
      {
        this._self.emit ( obj.cmd, obj )
      }
    }
    catch ( e )
    {
      console.log( moment().format('LLL') + ': ', e );
    }
    finally
    {
      return;
    }
  }
  _error ()
  {
    console.log( moment().format('LLL') + ': ', 'WS error');
    this._status = false;
    this._self.emit( 'no_connect' );
  }
  _close ( code )
  {
    console.log( moment().format('LLL') + ': ', 'WS close' );
    this._status = false;
    this._self.emit( 'no_connect' );
  }
  _open ()
  {
    console.log( moment().format('LLL') + ': ', 'Successful connection on WS' );
    this._status = true;
    this._self.emit( 'run' );
  }
  _ping ()
  {
    this._lastTimePing = new Date().getTime();
    this._self.emit( 'ping' );
  }
  send_json ( obj )
  {
    let connect = this._connect;
    this._connect.send( JSON.stringify( obj ), function( e ) {
      if ( e )
      {
        console.log( moment().format('LLL'), e );
        try
        {
          connect._status = false;
        }
        catch (e)
        {
          console.log( moment().format('LLL'), e );
        }
      }
    });
  }
}
module.exports = VegaWS;
