const WebSocket = require('ws');
const EventEmitter = require('events');
class VegaWS extends EventEmitter
{
  constructor(url)
  {
    super();
    this.url = url;
    this._connect = {
      _status:false
    };
    this.reload();
    const intervel = setInterval(()=>{
      if(!this.status)
      {
        var currentDate = new Date().getTime();
        var validLastTimeReconnect = this.last_time_reconnect!==false;
        var lastDate = validLastTimeReconnect?this.last_time_reconnect:currentDate;
        var time = currentDate-lastDate;
        if(time>10000)
        {
          this.reload();
        }
      }
    }, 5000);
  }
  get last_time_reconnect()
  {
    var validLastTimeReconnect = this._connect._last_time_reconnect!==undefined&&typeof this._connect._last_time_reconnect==='number';
    return validLastTimeReconnect?this._connect._last_time_reconnect:false;
  }
  set last_time_reconnect(ltr)
  {
    this._connect._last_time_reconnect = new Date().getTime();
  }
  get status()
  {
    return this._connect._status;
  }
  set status(st)
  {
    this._connect._status = st;
  }
  reload()
  {
    this._connect = new WebSocket(this.url);
    this.status = false;
    this._connect._self = this;
    this.last_time_reconnect = new Date().getTime();
    this._connect.on('open',this._open);
    this._connect.on('message',this._message);
    this._connect.on('error',this._error);
    this._connect.on('close',this._close);
  }
  _message(message)
  {
    try
    {
      let obj = JSON.parse(message);
      let validCMD = obj.cmd!=undefined;
      if(validCMD)
      {
        this._self.emit(obj.cmd,obj)
      }
    }
    catch (e)
    {
      console.log(e);
    }
    finally
    {
      return;
    }
  }
  _error()
  {
    console.log('WS error');
    this._status = false;
    this._self.emit('no_connect');
  }
  _close(code)
  {
    console.log('WS close');
    this._status = false;
    this._self.emit('no_connect');
  }
  _open()
  {
    console.log('Successful connection on WS');
    this._status = true;
    this._self.emit('run')
  }
  send_json(obj)
  {
    this._connect.send(JSON.stringify(obj),function(e){
      if(e)
      {
        this._status=false;
      }
    });
  }
}
module.exports = VegaWS;
