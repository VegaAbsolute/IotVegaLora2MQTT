const mqtt = require('mqtt');
class VegaMQTT
{
  constructor(url)
  {
    this.url = url;
    this._connect = {
      _status:false
    };
    this.reload();
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
    console.log(this.url);
    this._connect = mqtt.connect(this.url);
    this.status = false;
    this._connect._self = this;
    this._connect.on('connect',this._open);
    // this._connect.on('message',this._message);
    this._connect.on('error',this._error);
    this._connect.on('close',this._close);
    this._connect.on('reconnect',this._reconnect);
  }
  _reconnect()
  {
    console.log('MQTT reconnect');
    this._status = false;
  }
  _error()
  {
    console.log('MQTT error');
    this._status = false;
  }
  _close(code)
  {
    console.log('MQTT close');
    this._status = false;
  }
  _open()
  {
    console.log('Successful connection on MQTT');
    this._status = true;
  }
  send_json(obj,topic)
  {
    if(this.status)
    {
      this._connect.publish(topic, JSON.stringify(obj));
      console.log('Success to send data mqtt, topic='+topic);
    }
    else
    {
      console.log('Failed to send data mqtt disconnect');
    }
  }
}
module.exports = VegaMQTT;
