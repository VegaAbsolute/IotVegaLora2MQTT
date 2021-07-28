const converter = require('./vega_converter.js');
function parseLM1 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseSS0101 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseMS0101 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseAS0101 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseMC0101 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseTC11 ( bytes, port )
{
  let res = { valid: false };
  return res;
}

function parseSEEB ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseSVE1 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseSH1 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseTC12 ( bytes, port )
{
  let res = { valid: true };
  switch ( port )
  {
    default:
    {
      let statusBits = converter.byteToBits( bytes[0] );
      res.packetType = statusBits[5] == 1 ? 'pressing_button' : 'automatically';
      res.info_temperature = statusBits[7] == 1;
      res.info_navigation = statusBits[4] == 1;
      res.info_counter_uplink = statusBits[3] == 1;
      res.info_counter_downlink = statusBits[2] == 1;
      res.info_battery = statusBits[1] == 1;
      res.info_RSSI_SNR = statusBits[0] == 1;
      let nextByte = 1;
      if(res.info_temperature)
      {
        res.temperature = converter.bytesToInt( [bytes[nextByte]] );
        nextByte++;
      }
      if(res.info_navigation)
      {
        res.location = {
          latitude:{},
          longitude:{}
        };
        let degressBitsLat = converter.byteToBits( [bytes[nextByte]] );
        let senDegressLat = degressBitsLat[7]+degressBitsLat[6]+degressBitsLat[5]+degressBitsLat[4];
        let junDegressLat = degressBitsLat[3]+degressBitsLat[2]+degressBitsLat[1]+degressBitsLat[0];
        let degressStrLat = converter.bin2dec(senDegressLat).toString()+converter.bin2dec(junDegressLat).toString();
        nextByte++;
        let minutesBitsLat = converter.byteToBits( [bytes[nextByte]] );
        let senMinutesLat = minutesBitsLat[7]+minutesBitsLat[6]+minutesBitsLat[5]+minutesBitsLat[4];
        let junMinutesLat = minutesBitsLat[3]+minutesBitsLat[2]+minutesBitsLat[1]+minutesBitsLat[0];
        let minutesStrLat = converter.bin2dec(senMinutesLat).toString()+converter.bin2dec(junMinutesLat).toString();
        nextByte++;
        let propTenHundMinutesBitsLat = converter.byteToBits( [bytes[nextByte]] );
        let propTenMinutesLat = propTenHundMinutesBitsLat[7]+propTenHundMinutesBitsLat[6]+propTenHundMinutesBitsLat[5]+propTenHundMinutesBitsLat[4];
        let propHundMinutesLat = propTenHundMinutesBitsLat[3]+propTenHundMinutesBitsLat[2]+propTenHundMinutesBitsLat[1]+propTenHundMinutesBitsLat[0];
        let propTenHundMinutesStrLat = converter.bin2dec(propTenMinutesLat).toString()+converter.bin2dec(propHundMinutesLat).toString();
        nextByte++;
        let propThousCodeMinutesBitsLat = converter.byteToBits( [bytes[nextByte]] );
        let propThousMinutesLat = propThousCodeMinutesBitsLat[7]+propThousCodeMinutesBitsLat[6]+propThousCodeMinutesBitsLat[5]+propThousCodeMinutesBitsLat[4];
        let propThousMinutesStrLat = converter.bin2dec(propThousMinutesLat).toString();
        let codeLat = propThousCodeMinutesBitsLat[0]?'S':'N';
        let latitude = degressStrLat+'°'+minutesStrLat+'.'+propTenHundMinutesStrLat+propThousMinutesStrLat+'\''+' '+codeLat;
        let latitude2= parseInt(degressStrLat)+(parseFloat(minutesStrLat+'.'+propTenHundMinutesStrLat+propThousMinutesStrLat)/60);
        latitude2 = Math.round(latitude2*1000000)/1000000;
        res.location.latitude.format1 = latitude;
        res.location.latitude.format2 = latitude2;
        if(codeLat=='N') latitude2 = latitude2*-1;
        
        nextByte++;
        
        let byte1 = converter.byteToBits( [bytes[nextByte]] );
        let senDegressLon = byte1[7]+byte1[6]+byte1[5]+byte1[4];
        let minDegressLon = byte1[3]+byte1[2]+byte1[1]+byte1[0];
        nextByte++;
        let byte2 = converter.byteToBits( [bytes[nextByte]] );
        let junDegressLon = byte2[7]+byte2[6]+byte2[5]+byte2[4];
        let senMinutesLon = byte2[3]+byte2[2]+byte2[1]+byte2[0];
        let degressStrLon = converter.bin2dec(senDegressLon).toString()+converter.bin2dec(minDegressLon).toString()+converter.bin2dec(junDegressLon).toString();
        nextByte++;
        let byte3 = converter.byteToBits( [bytes[nextByte]] );
        let junMinutesLon = byte3[7]+byte3[6]+byte3[5]+byte3[4];
        let minutesStrLon = converter.bin2dec(senMinutesLon).toString()+converter.bin2dec(junMinutesLon).toString();
        let propTenMinutesLon = byte3[3]+byte3[2]+byte3[1]+byte3[0];
        nextByte++;
        let byte4 = converter.byteToBits( [bytes[nextByte]] );
        let propHundMinutesLon = byte4[7]+byte4[6]+byte4[5]+byte4[4];
        let propTenHundMinutesStrLon = converter.bin2dec(propTenMinutesLon).toString()+converter.bin2dec(propHundMinutesLon).toString();
        let codeLon = byte4[0]?'W':'E';
        let longitude = degressStrLon+'°'+minutesStrLon+'.'+propTenHundMinutesStrLon+'\''+' '+codeLon;
        let longitude2= parseInt(degressStrLon)+(parseFloat(minutesStrLon+'.'+propTenHundMinutesStrLon)/60);
        longitude2 = Math.round(longitude2*1000000)/1000000;
        if(codeLon=='E') longitude2 = longitude2*-1;
        res.location.longitude.format1 = longitude;
        res.location.longitude.format2 = longitude2;
        nextByte++;
      }
      if(res.info_counter_uplink)
      {
        res.counter_uplink = converter.bytesToInt( [bytes[nextByte]] );
        nextByte++;
      }
      if(res.info_counter_downlink)
      {
        res.counter_downlink = converter.bytesToInt( [bytes[nextByte]] );
        nextByte++;
      }
      if(res.info_battery)
      {
        var senByte = parseInt(bytes[nextByte]+bytes[nextByte+1],16);
        nextByte++;
        nextByte++;
        res.battery = parseFloat(senByte);
      }
      if(res.info_RSSI_SNR)
      {
        res.rssi = converter.bytesToInt( [bytes[nextByte]] );
        nextByte++;
        res.snr = converter.bytesToIntNegative( [bytes[nextByte]] );
        nextByte++;
      }
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseGM2 ( bytes, port )
{
  let res = { valid: true };
  switch ( port )
  {
    case 2:
    {
      res.packetType = 'regular';
      res.battery = converter.bytesToInt( [bytes[0]] );
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      res.temperature = converter.bytesToInt( [bytes[5]] );
      res.reason = converter.bytesToReasonGM2( bytes[6] );
      res.input1 = converter.byteToBoolean( bytes[7] );
      res.input2 = converter.byteToBoolean( bytes[8] );
      res.output1 = converter.byteToBoolean( bytes[9] );
      res.output2 = converter.byteToBoolean( bytes[10] );
      res.state_hall = converter.byteToBoolean( bytes[11] );
      res.state_tamper = converter.byteToBoolean( bytes[12] );
      res.readings_meter = converter.bytesToFloat( [bytes[13], bytes[14], bytes[15], bytes[16]], 100 );
      res.initial_readings_meter = converter.bytesToFloat( [bytes[17], bytes[18], bytes[19], bytes[20]], 100 );
      break;
    }
    case 4:
    {
      res.packetType = 'timeCorrection';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      break;
    }
    case 3:
    {
      res.packetType = 'settings';
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseTD11 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseTP11 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseTP11rev2 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseMBUS2 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseMBUS2rev2 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseMBUS1 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseMBUS1rev2 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseSS0102 ( bytes, port )
{
  let res = { valid:true };
  res.packetType = 'unknown';
  switch ( port )
  {
    case 3:
    {
      res.packetType = 'settings';
      break;
    }
    case 4:
    {
      res.packetType = 'timeCorrection';
      break;
    }
    case 195:
    {
      res.packetType = 'info';
      break;
    }
    case 85:
    {
      res.packetType = 'diagnostic';
      break;
    }
    case 2:
    {
      res.packetType = converter.bytesToTypeVegaSmoke2( bytes[0] );
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      let statusBits = converter.byteToBits( bytes[5] );
  // // statusBits[1] == 1;
      res.voltage_mV = converter.bytesToInt( [ bytes[6], bytes[7] ] );
      res.current_mA = converter.bytesToInt( [ bytes[8], bytes[9] ] );
      res.temperature_degC = converter.bytesToIntNegative( [ bytes[10], bytes[11] ] );
      res.battery_select_1 = converter.byteToBoolean( bytes[12] );
      res.battery_select_2 = converter.byteToBoolean( bytes[13] );
      res.battery_persent_1 = converter.byteToBoolean( bytes[14] );
      res.battery_persent_2 = converter.byteToBoolean( bytes[15] );
      res.battery = converter.bytesToInt( [bytes[16]] );
      res.battery2 = converter.bytesToInt( [bytes[17]] );
    
      res.status_fog = statusBits[0] == 1;
      res.status_fire = statusBits[1] == 1;
      res.status_test = statusBits[2] == 1;
      res.status_guard = statusBits[3] == 1;
      res.status_fault = statusBits[4] == 1;
      res.status_alarm = statusBits[5] == 1;
      res.status_detach = statusBits[6] == 1;
      res.status_common = statusBits[7] == 1;
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
}
function parseVegaSmoke2 ( bytes, port )
{
  let res = { valid:true };
  res.packetType = 'unknown';
  switch ( port )
  {
    case 3:
    {
      res.packetType = 'settings';
      break;
    }
    case 4:
    {
      res.packetType = 'timeCorrection';
      break;
    }
    case 2:
    {
      res.packetType = converter.bytesToTypeVegaSmoke2( bytes[0] );
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      let statusBits = converter.byteToBits( bytes[5] );
  // // statusBits[1] == 1;
      res.voltage_mV = converter.bytesToInt( [ bytes[6], bytes[7] ] );
      res.current_mA = converter.bytesToInt( [ bytes[8], bytes[9] ] );
      res.temperature_degC = converter.bytesToIntNegative( [ bytes[10], bytes[11] ] );
      res.battery_select_1 = converter.byteToBoolean( bytes[12] );
      res.battery_select_2 = converter.byteToBoolean( bytes[13] );
      res.battery_persent_1 = converter.byteToBoolean( bytes[14] );
      res.battery_persent_2 = converter.byteToBoolean( bytes[15] );
      res.battery = converter.bytesToInt( [bytes[16]] );
    
      res.status_fog = statusBits[0] == 1;
      res.status_fire = statusBits[1] == 1;
      res.status_test = statusBits[2] == 1;
      res.status_guard = statusBits[3] == 1;
      res.status_fault = statusBits[4] == 1;
      res.status_alarm = statusBits[5] == 1;
      res.status_detach = statusBits[6] == 1;
      res.status_common = statusBits[7] == 1;
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  
  for(var key in res)
  {
    if( res[key]===null)
    {
      res.valid = false;
    }
  }

  return res;
}
function parseSI11_SI21 ( bytes, port )
{
  let res = { valid:true };
  res.packetType = parseInt( bytes[0], 16 );
  switch ( res.packetType )
  {
    case 0:
    {
      if( port == 3 ) res.packetType = 'settings';
      break;
    }
    case 1:
    {
      res.packetType = 'regular';
      res.battery = converter.bytesToInt( [bytes[1]] );
      res.settings = converter.bytesToSettingsSI( bytes[2] );
      res.time = converter.bytesToInt( [bytes[3], bytes[4], bytes[5], bytes[6]] );
      res.temperature = converter.bytesToInt( [bytes[7]] );
      res.input1 = converter.bytesToInt( [bytes[8], bytes[9], bytes[10], bytes[11]] );
      res.input2 = converter.bytesToInt( [bytes[12], bytes[13], bytes[14], bytes[15]] );
      res.input3 = converter.bytesToInt( [bytes[16], bytes[17], bytes[18], bytes[19]] );
      res.input4 = converter.bytesToInt( [bytes[20], bytes[21], bytes[22], bytes[23]] );
      break;
    }
    case 2:
    {
      res.packetType = 'alarm';
      res.battery = converter.bytesToInt( [bytes[1]] );
      res.settings = converter.bytesToSettingsSI( bytes[2] );
      res.alarmOnInput = converter.bytesToInt( [bytes[3]] );
      res.input1 = converter.bytesToInt( [bytes[4], bytes[5], bytes[6], bytes[7]] );
      res.input2 = converter.bytesToInt( [bytes[8], bytes[9], bytes[10], bytes[11]] );
      res.input3 = converter.bytesToInt( [bytes[12], bytes[13], bytes[14], bytes[15]] );
      res.input4 = converter.bytesToInt( [bytes[16], bytes[17], bytes[18], bytes[19]] );
      break;
    }
    case 255:
    {
      res.packetType = 'timeCorrection';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key]===null)
    {
      res.valid = false;
    }
  }
  return res;
}
function parseHS0101( bytes, port )
{
  let res = { valid: true };
  switch ( port )
  {
    case 2:
    {
      res.packetType = 'regular';
      res.reason = converter.bytesToReasonHS0101( bytes[0] );
      res.battery = converter.bytesToInt( [bytes[1]] );
      res.time = converter.bytesToInt( [bytes[2], bytes[3], bytes[4], bytes[5]] );
      res.temperature = converter.bytesToFloatNegative( [bytes[6],bytes[7]], 10 );
      res.humidity = converter.bytesToInt( [bytes[8]] );
      res.state_open_sensor_1 = converter.byteToBoolean( bytes[9] );
      res.state_open_sensor_2 = converter.byteToBoolean( bytes[10] );
      res.angle = converter.bytesToInt( [bytes[11]] );
      res.humidity_minimum = converter.bytesToInt( [bytes[12]] );
      res.humidity_maximum = converter.bytesToInt( [bytes[13]] );
      res.temperature_minimum = converter.bytesToIntNegative( [bytes[14]] );
      res.temperature_maximum = converter.bytesToIntNegative( [bytes[15]] );
      break;
    }
    case 4:
    {
      res.packetType = 'timeCorrection';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      break;
    }
    case 3:
    {
      res.packetType = 'settings';
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseVegaLock( bytes, port )
{
  // typedef __packed struct lora_params_t {
  //   uint8_t  id          = LORA_ID_PARAMS; // LORA_ID_PARAMS = 1
  //   uint8_t  state       = 0;              // состояние замка (0-закрыт/1-открыт)
  //   uint8_t  alarm       = 0;              // тревога
  //   uint8_t  battery     = 0;              // заряд АКБ (%)
  //   uint16_t voltage     = 0;              // value*100 (v)
  //   int16_t  temperature = 0;              // value*100 (C°)
  // } lora_params_s;
  let res = { valid: true };
  switch ( port )
  {
    case 2:
    {
      res.packetType = 'regular';
      res.lora_id_params = converter.bytesToInt( [bytes[0]] );
      res.state_lock = converter.byteToBoolean( bytes[1] );
      res.state_alarm = converter.byteToBoolean( bytes[2] );
      res.battery = converter.bytesToInt( [bytes[3]] );
      res.voltage = converter.bytesToFloatNegative( [bytes[4],bytes[5]], 100 );
      res.temperature = converter.bytesToFloatNegative( [bytes[6],bytes[7]], 100 );
      break;
    }
    case 4:
    {
      res.packetType = 'timeCorrection';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      break;
    }
    case 3:
    {
      res.packetType = 'settings';
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseGPNPUMP( bytes, port )
{
  let res = { valid: true };
  switch ( port )
  {
    case 2:
    {
      // res.packetType = 'regular';
      res.reason = converter.bytesToReasonGPNPUMP( bytes[0] );
      res.battery = converter.bytesToInt( [bytes[1]] );
      res.time = converter.bytesToInt( [bytes[2], bytes[3], bytes[4], bytes[5]] );
      res.vibration = converter.bytesToFloat( [bytes[6], bytes[7]], 10 );
      res.voltage_present = converter.byteToBoolean( bytes[8] );
      res.temperature = converter.bytesToFloatNegative( [bytes[9],bytes[10]], 10 );
      res.tvoc = converter.byteToBoolean( bytes[11] );
      res.leakage = converter.byteToBoolean( bytes[12] );
      res.temperature_maximum = converter.bytesToIntNegative( [bytes[13]] );
      res.vibration_maximum = converter.bytesToFloat( [bytes[14], bytes[15]], 10 );
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseSI13 ( bytes, port )
{
  let res = { valid:true };
  res.packetType = parseInt( bytes[0], 16 );
  switch ( res.packetType )
  {
    case 0:
    {
      if( port == 3 ) res.packetType = 'settings';
      break;
    }
    case 1:
    {
      res.packetType = 'regular';
      res.settings = converter.bytesToSettingsSI( bytes[2], 2 );
      res.temperature = converter.bytesToInt( [bytes[7]] );
      res.input1 = converter.bytesToInt( [bytes[8], bytes[9], bytes[10], bytes[11]] );
      res.input2 = converter.bytesToInt( [bytes[12], bytes[13], bytes[14], bytes[15]] );
      break;
    }
    case 2:
    {
      res.packetType = 'alarm';
      res.settings = converter.bytesToSettingsSI( bytes[2], 2 );
      res.alarmOnInput = converter.bytesToInt( [bytes[3]] );
      res.input1 = converter.bytesToInt( [bytes[4], bytes[5], bytes[6], bytes[7]] );
      res.input2 = converter.bytesToInt( [bytes[8], bytes[9], bytes[10], bytes[11]] );
      break;
    }
    case 3:
    {
      res.packetType = 'interface';
      res.totalDataSize = converter.bytesToInt( [bytes[1], bytes[2]] );
      res.dataSize = converter.bytesToInt( [bytes[3]] );
      res.packetNumber = converter.bytesToInt( [bytes[4]] );
      res.packetCount = converter.bytesToInt( [bytes[5]] );
      res.data = converter.extractedData( bytes,6 );
      break;
    }
    case 4:
    {
      res.packetType = 'mercury';
      res.address = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      res.pollResult = converter.byteToBoolean( bytes[5] );
      res.tariff_1 = converter.bytesToFloat([bytes[6], bytes[7], bytes[8], bytes[9]], 1000);
      res.tariff_2 = converter.bytesToFloat([bytes[10], bytes[11], bytes[12], bytes[13]], 1000);
      res.tariff_3 = converter.bytesToFloat([bytes[14], bytes[15], bytes[16], bytes[17]], 1000);
      res.tariff_4 = converter.bytesToFloat([bytes[18], bytes[19], bytes[20], bytes[21]], 1000);
      break;
    }
    case 5:
    {
      res.packetType = 'confirmationCommandExecute';
      res.commandCode = converter.bytesToInt( [bytes[1]] );
      res.pollResult = converter.byteToBoolean( bytes[2]) ? 'success' : 'error';
      break;
    }
    case 255:
    {
      res.packetType = 'timeCorrection';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseSI13rev2 ( bytes, port )
{
  let res = { valid:true };
  res.packetType = parseInt( bytes[0], 16 );
  switch ( res.packetType )
  {
    case 0:
    {
      if( port == 3 ) res.packetType = 'settings';
      break;
    }
    case 1:
    {
      res.packetType = 'regular';
      res.settings = converter.bytesToSettingsSI( bytes[2], 2 );
      res.time = converter.bytesToInt( [bytes[3], bytes[4], bytes[5], bytes[6]] );
      res.temperature = converter.bytesToInt( [bytes[7]] );
      res.input1 = converter.bytesToInt( [bytes[8], bytes[9], bytes[10], bytes[11]] );
      res.input2 = converter.bytesToInt( [bytes[12], bytes[13], bytes[14], bytes[15]] );
      break;
    }
    case 2:
    {
      res.packetType = 'alarm';
      res.settings = converter.bytesToSettingsSI( bytes[2], 2 );
      res.alarmOnInput = converter.bytesToInt( [bytes[3]] );
      res.input1 = converter.bytesToInt( [bytes[4], bytes[5], bytes[6], bytes[7]] );
      res.input2 = converter.bytesToInt( [bytes[8], bytes[9], bytes[10], bytes[11]] );
      res.time = converter.bytesToInt( [bytes[12], bytes[13], bytes[14], bytes[15]] );
      break;
    }
    case 3:
    {
      res.packetType = 'interface';
      res.totalDataSize = converter.bytesToInt( [bytes[1], bytes[2]] );
      res.dataSize = converter.bytesToInt( [bytes[3]] );
      res.packetNumber = converter.bytesToInt( [bytes[4]] );
      res.packetCount = converter.bytesToInt( [bytes[5]] );
      res.data = converter.extractedData( bytes,6 );
      break;
    }
    case 4:
    {
      res.packetType = 'mercury';
      res.address = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      res.pollResult = converter.byteToBoolean( bytes[5] );
      res.tariff_1 = converter.bytesToFloat([bytes[6], bytes[7], bytes[8], bytes[9]], 1000);
      res.tariff_2 = converter.bytesToFloat([bytes[10], bytes[11], bytes[12], bytes[13]], 1000);
      res.tariff_3 = converter.bytesToFloat([bytes[14], bytes[15], bytes[16], bytes[17]], 1000);
      res.tariff_4 = converter.bytesToFloat([bytes[18], bytes[19], bytes[20], bytes[21]], 1000);
      res.time = converter.bytesToInt( [bytes[22], bytes[23], bytes[24], bytes[25]] );
      break;
    }
    case 5:
    {
      res.packetType = 'confirmationCommandExecute';
      res.commandCode = converter.bytesToInt( [bytes[1]] );
      res.pollResult = converter.byteToBoolean( bytes[2]) ? 'success' : 'error';
      break;
    }
    case 6:
    {
      res.packetType = 'modBus';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      res.data = converter.extractedData( bytes,5 );
      break;
    }
    case 255:
    {
      res.packetType = 'timeCorrection';
      res.time = converter.bytesToInt( [bytes[1], bytes[2], bytes[3], bytes[4]] );
      break;
    }
    default:
    {
      res.valid = false;
      break;
    }
  }
  for(var key in res)
  {
    if( res[key] === null )
    {
      res.valid = false;
    }
  }
  return res;
}
function parseSI12 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseTL11 ( bytes, port )
{
  let res = { valid: false, port };
  return res;
}
function parseSI22 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parseGM1 ( bytes, port )
{
  let res = { valid: false };
  return res;
}
function parse( obj )
{
  let result = {};
  var parsedDate = { valid: false };
  result.deviceInfo = {
    devEui: obj.devEui,
    appEui: obj.appEui
  };
  result.networkInfo = {
    ts: obj.ts,
    ack: obj.ack,
    dr: obj.dr,
    fcnt: obj.fcnt,
    freq: obj.freq,
    gatewayId: obj.gatewayId,
    port: obj.port,
    rssi: obj.rssi,
    snr: obj.snr,
    type: obj.type,
  };
  //начинаем парсить данные
  try
  {
    //Получаем массив байт пакета
    let bytes = converter.stringToBytes( obj.data );
    //Приводим appEui к верхнему регистру
    let appEui = obj.appEui;
    if( appEui ) appEui = appEui.toString().toLocaleUpperCase();
    //В зависимости от appEui определяем что за устройство
    switch ( appEui )
    {
      case '7665676173693232':
      {
        result.deviceInfo.deviceModel = 'SI_22';
        parsedDate = parseSI22( bytes, obj.port );
        break;
      }
      case '76656761474D2D31':
      {
        result.deviceInfo.deviceModel = 'GM_1';
        parsedDate = parseGM1( bytes, obj.port );
        break;
      }
      case '76656761544C3131':
      {
        result.deviceInfo.deviceModel = 'TL_11';
        parsedDate = parseTL11( bytes, obj.port );
        break;
      }
      case '7665676173693132':
      {
        result.deviceInfo.deviceModel = 'SI_12';
        parsedDate = parseSI12( bytes, obj.port );
        break;
      }
      case '7665676173693131':
      {
        result.deviceInfo.deviceModel = 'SI_11';
        parsedDate = parseSI11_SI21( bytes, obj.port );
        break;
      }
      case '7665676173693133':
      {
        result.deviceInfo.deviceModel = 'SI_13';
        parsedDate = parseSI13( bytes, obj.port );
        break;
      }
      case '3032676173693133':
      {
        result.deviceInfo.deviceModel = 'SI_13';
        parsedDate = parseSI13rev2( bytes, obj.port );
        break;
      }
      case '7665676173693231':
      {
        result.deviceInfo.deviceModel = 'SI_21';
        parsedDate = parseSI11_SI21( bytes, obj.port );
        break;
      }
      case '4D2D425553203120':
      {
        result.deviceInfo.deviceModel = 'M_BUS_1';
        parsedDate = parseMBUS1( bytes, obj.port );
        break;
      }
      case '3032425553203120':
      {
        result.deviceInfo.deviceModel = 'M_BUS_1';
        parsedDate = parseMBUS1rev2( bytes, obj.port );
        break;
      }
      case '4D2D425553203220':
      {
        result.deviceInfo.deviceModel = 'M_BUS_2';
        parsedDate = parseMBUS2( bytes, obj.port );
        break;
      }
      case '3032425553203220':
      {
        result.deviceInfo.deviceModel = 'M_BUS_2';
        parsedDate = parseMBUS2rev2( bytes, obj.port );
        break;
      }
      case '7665676174703131':
      {
        result.deviceInfo.deviceModel = 'TP_11';
        parsedDate = parseTP11( bytes, obj.port );
        break;
      }
      case '3032676174703131':
      {
        result.deviceInfo.deviceModel = 'TP_11';
        parsedDate = parseTP11rev2( bytes, obj.port );
        break;
      }
      case '7665676174643131':
      {
        result.deviceInfo.deviceModel = 'TD_11';
        parsedDate = parseTD11( bytes, obj.port );
        break;
      }
      case '76656761474D2D32':
      {
        result.deviceInfo.deviceModel = 'GM_2';
        parsedDate = parseGM2( bytes, obj.port );
        break;
      }
      case '7665676173483031':
      {
        result.deviceInfo.deviceModel = 'SH_1';
        parsedDate = parseSH1( bytes, obj.port );
        break;
      }
      case '7665676153564531':
      {
        result.deviceInfo.deviceModel = 'SVE_1';
        parsedDate = parseSVE1( bytes, obj.port );
        break;
      }
      case '7665676153454231':
      {
        result.deviceInfo.deviceModel = 'SEEB_1_VEGA';
        parsedDate = parseSEEB( bytes, obj.port );
        break;
      }
      case '5345454220312020':
      {
        result.deviceInfo.deviceModel = 'SEEB_1_SPBZIP';
        parsedDate = parseSEEB( bytes, obj.port );
        break;
      }
      case '5345454220322020':
      {
        result.deviceInfo.deviceModel = 'SEEB_2_MERCURY';
        parsedDate = parseSEEB( bytes, obj.port );
        break;
      }
      case '7665676173693131':
      {
        result.deviceInfo.deviceModel = 'TC_11';
        parsedDate = parseTC11( bytes, obj.port );
        break;
      }
      case '7665676174733132':
      {
        result.deviceInfo.deviceModel = 'TC_12';
        parsedDate = parseTC12( bytes, obj.port );
        break;
      }
      case '76616D6330313031':
      {
        result.deviceInfo.deviceModel = 'SMART_MC_0101';
        parsedDate = parseMC0101( bytes, obj.port );
        break;
      }
      case '7661616330313031':
      {
        result.deviceInfo.deviceModel = 'SMART_AS_0101';
        parsedDate = parseAS0101( bytes, obj.port );
        break;
      }
      case '766567614D533031':
      {
        result.deviceInfo.deviceModel = 'SMART_MS_0101';
        parsedDate = parseMS0101( bytes, obj.port );
        break;
      }
      case '7665676153533031':
      {
        result.deviceInfo.deviceModel = 'SMART_SS_0101';
        parsedDate = parseSS0101( bytes, obj.port );
        break;
      }
      case '76656761204C4D31':
      {
        result.deviceInfo.deviceModel = 'LM_1';
        parsedDate = parseLM1( bytes, obj.port );
        break;
      }
      case '7665676120373737':
      {
        result.deviceInfo.deviceModel = 'GPNPUMP';
        parsedDate = parseGPNPUMP( bytes, obj.port );
        break;
      }
      case '736D687330313031':
      {
        result.deviceInfo.deviceModel = 'SMART_HS_0101';
        parsedDate = parseHS0101( bytes, obj.port );
        break;
      }
      case '766567616C6F636B':
      {
        result.deviceInfo.deviceModel = 'VEGALOCK';
        parsedDate = parseVegaLock( bytes, obj.port );
        break;
      }
      case '7665676153533033':
      {
        result.deviceInfo.deviceModel = 'VEGA_SMOKE_2';
        parsedDate = parseVegaSmoke2( bytes, obj.port );
        break;
      }
      case '7665676153533032':
      {
        result.deviceInfo.deviceModel = 'SMART_SS_0102';
        parsedDate = parseSS0102( bytes, obj.port );
        break;
      }
      default:
      {
        //Неизвестное устройство
        result.deviceInfo.deviceModel = 'unknown';
        parsedDate.valid = false;
        break;
      }
    }
  }
  catch ( e )
  {
    console.error( 'Error parse rx data', e );
  }
  finally
  {
    result.devicePayload = {
      rawData: obj.data
    };
    //В случае если получилось распарсить пакет, записываем в результат
    if( parsedDate.valid )
    {
      for( var key in parsedDate )
      {
        if( key != 'valid' && key != 'deviceModel' ) result.devicePayload[key] = parsedDate[key];
      }
    }
    return result;
  }
}
module.exports.parse = parse;
