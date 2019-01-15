const VegaMQTT = require('./vega_mqtt.js');
const VegaWS = require('./vega_ws.js');
const Config = require('./config.js');
const VegaLora = require('./vega_lora.js');
const { exec } = require('child_process');
const CronJob = require('cron').CronJob;
let config = {};
let statusAuth = false;
let ws = {};
let mqtt = {};
let waitingReboot = false;
//------------------------------------------------------------------------------
//Логика
//------------------------------------------------------------------------------
function checkValidRXType(type)
{
  try
  {
    let validType = typeof type === 'string';
    let types = type.split('+');
    if( types.indexOf( 'UNCONF_UP' ) > -1 || types.indexOf( 'CONF_UP' ) > -1 )
    {
      return true;
    }
    return false;
  }
  catch (e)
  {
    return false;
  }
}
function send(mess,topic)
{
  if(!mess)
  {
    if(config.debugMOD) console.log('Failed to send message MQTT, data not valid');
    return;
  }
  if(!topic)
  {
    if(config.debugMOD) console.log('Failed to send message MQTT, topic not valid');
    return;
  }
  if(!mqtt.status)
  {
    if(config.debugMOD) console.log('Failed to send message MQTT, MQTT disconnect');
    return;
  }
  mqtt.send_json(mess,topic);
}
//------------------------------------------------------------------------------
//ws send message
//------------------------------------------------------------------------------
function auth_req()
{
  let message = {
      cmd:'auth_req',
      login:config.loginWS,
      password:config.passwordWS
    };
    ws.send_json(message);
    return;
}
//------------------------------------------------------------------------------
//commands iotvega.com
//------------------------------------------------------------------------------
function rx(obj)
{
  if(!(obj.type&&checkValidRXType(obj.type))) return;
  try
  {
    let message = VegaLora.parse(obj);
    send(message,'/IotVegaServer/'+message.deviceInfo.deviceModel+'/'+message.deviceInfo.devEui);
  }
  catch (e)
  {
    console.error(e);
  }
  finally
  {
    return;
  }
}
function free()
{
  if(waitingReboot)
  {
    emergencyExit();
  }
}
function emergencyExit()
{
  process.exit(1);
}
function auth_resp(obj)
{
  if(obj.status)
  {
    statusAuth = true;
    console.log('Success authorization on server iotvega');
  }
  else
  {
    console.log('Not successful authorization on server iotvega');
    emergencyExit();
  }
}
//------------------------------------------------------------------------------
//initalization app
//------------------------------------------------------------------------------
function initWS()
{
  ws = new VegaWS(config.ws);
  ws.on('run',auth_req);
  ws.on('auth_resp',auth_resp);
  ws.on('rx',rx);
}
function run(conf)
{
  config = conf;
  if(config.valid())
  {
    if(config.auto_update)
    {
      if(config.debugMOD) console.log('AutoUpdates are active');
      new CronJob({
        cronTime: '*/1 * * * *',
        onTick: updating,
        start: true,
      });
    }
    try
    {
      initWS();
      mqtt = new VegaMQTT(config.mqtt);
    }
    catch (e)
    {
      console.log('Initializing the application was a mistake');
      console.error(e);
      emergencyExit();
    }
  }
  return;
}
function updating()
{
    //тут нужно проверить что программа не чем не занята
  exec('"git" pull', (err, stdout, stderr) => {
    if(stdout&&(stdout.indexOf('Already up to date')>-1||stdout.indexOf('Already up-to-date')>-1)||stdout.indexOf('Уже обновлено')>-1)
    {
      if(config.debugMOD) console.log('Updates not detected');
    }
    else if (err) {
      console.log(err);
      exec('"git" reset --hard HEAD', (err, stdout, stderr) => {
        if(config.debugMOD) console.log('Error updating IotVegaNotifier, restart',err);
        emergencyExit();
      });
    }
    else
    {
      if(config.debugMOD) console.log('The IotVegaNotifier is updated, restart',stdout);
      waitingReboot = true;
      emergencyExit();
    }
  });
}
module.exports.config = config;
module.exports.run = run;
