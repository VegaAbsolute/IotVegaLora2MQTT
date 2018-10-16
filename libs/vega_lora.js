const converter = require('./vega_converter.js');
function parseLM1(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSS0101(bytes)
{
  let res = {valid:false};
  return res;
}
function parseMS0101(bytes)
{
  let res = {valid:false};
  return res;
}
function parseAS0101(bytes)
{
  let res = {valid:false};
  return res;
}
function parseMC0101(bytes)
{
  let res = {valid:false};
  return res;
}
function parseTC11(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSEEB(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSEEB(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSVE1(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSH1(bytes)
{
  let res = {valid:false};
  return res;
}
function parseGM2(bytes)
{
  let res = {valid:false};
  return res;
}
function parseTD11(bytes)
{
  let res = {valid:false};
  return res;
}
function parseTP11(bytes)
{
  let res = {valid:false};
  return res;
}
function parseMBUS2(bytes)
{
  let res = {valid:false};
  return res;
}
function parseMBUS1(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSI11_SI21(bytes)
{
  let res = {valid:true};
  res.packetType = parseInt(bytes[0],16);
  switch (res.packetType)
  {
    case 1:
    {
      res.packetType = 'regular';
      res.battery = converter.bytesToInt([bytes[1]]);
      res.settings = converter.bytesToSettingsSI(bytes[2]);
      res.time = converter.bytesToInt([bytes[3],bytes[4],bytes[5],bytes[6]]);
      res.temperature = converter.bytesToInt([bytes[7]]);
      res.input1 = converter.bytesToInt([bytes[8],bytes[9],bytes[10],bytes[11]]);
      res.input2 = converter.bytesToInt([bytes[12],bytes[13],bytes[14],bytes[15]]);
      res.input3 = converter.bytesToInt([bytes[16],bytes[17],bytes[18],bytes[19]]);
      res.input4 = converter.bytesToInt([bytes[20],bytes[21],bytes[22],bytes[23]]);
      break;
    }
    case 2:
    {
      res.packetType = 'alarm';
      res.battery = converter.bytesToInt([bytes[1]]);
      res.settings = converter.bytesToSettingsSI(bytes[2]);
      res.alarmOnInput = converter.bytesToInt([bytes[3]]);
      res.input1 = converter.bytesToInt([bytes[4],bytes[5],bytes[6],bytes[7]]);
      res.input2 = converter.bytesToInt([bytes[8],bytes[9],bytes[10],bytes[11]]);
      res.input3 = converter.bytesToInt([bytes[12],bytes[13],bytes[14],bytes[15]]);
      res.input4 = converter.bytesToInt([bytes[16],bytes[17],bytes[18],bytes[19]]);
      break;
    }
    case 255:
    {
      res.packetType = 'timeCorrectionReq';
      res.time = converter.bytesToInt([bytes[1],bytes[2],bytes[3],bytes[4]]);
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
    if(res[key]===null)
    {
      res.valid = false;
    }
  }
  return res;
}
function parseSI13(bytes)
{
  let res = {valid:true};
  res.packetType = parseInt(bytes[0],16);
  switch (res.packetType)
  {
    case 1:
    {
      res.packetType = 'regular';
      res.settings = converter.bytesToSettingsSI(bytes[2],2);
      res.temperature = converter.bytesToInt([bytes[7]]);
      res.input1 = converter.bytesToInt([bytes[8],bytes[9],bytes[10],bytes[11]]);
      res.input2 = converter.bytesToInt([bytes[12],bytes[13],bytes[14],bytes[15]]);
      break;
    }
    case 2:
    {
      res.packetType = 'alarm';
      res.settings = converter.bytesToSettingsSI(bytes[2],2);
      res.alarmOnInput = converter.bytesToInt([bytes[3]]);
      res.input1 = converter.bytesToInt([bytes[4],bytes[5],bytes[6],bytes[7]]);
      res.input2 = converter.bytesToInt([bytes[8],bytes[9],bytes[10],bytes[11]]);
      break;
    }
    case 3:
    {
      res.packetType = 'interface';
      res.totalDataSize = converter.bytesToInt([bytes[1],bytes[2]]);
      res.dataSize = converter.bytesToInt([bytes[3]]);
      res.packageNumber = converter.bytesToInt([bytes[4]]);
      res.packageCount = converter.bytesToInt([bytes[5]]);
      res.data = converter.extractedData(bytes,6);
      break;
    }
    case 4:
    {
      res.packetType = 'mercury';
      res.address = converter.bytesToInt([bytes[1],bytes[2],bytes[3],bytes[4]]);
      res.pollResult = converter.byteToBoolean(bytes[5]);
      res.tariff_1 = converter.bytesToFloat([bytes[6],bytes[7],bytes[8],bytes[9]],1000);
      res.tariff_2 = converter.bytesToFloat([bytes[10],bytes[11],bytes[12],bytes[13]],1000);
      res.tariff_3 = converter.bytesToFloat([bytes[14],bytes[15],bytes[16],bytes[17]],1000);
      res.tariff_4 = converter.bytesToFloat([bytes[18],bytes[19],bytes[20],bytes[21]],1000);
      break;
    }
    case 5:
    {
      res.packetType = 'confirmationCommandExecute';
      res.commandCode = converter.bytesToInt([bytes[1]]);
      res.pollResult = converter.byteToBoolean(bytes[2])?'success':'error';
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
    if(res[key]===null)
    {
      res.valid = false;
    }
  }
  return res;
}
function parseSI11(bytes)
{
  let res = {valid:false};
  return res;
}
function parseSI12(bytes)
{
  let res = {valid:false};
  return res;
}
function parseTL11(bytes)
{
  let res = {valid:false};
  return res;
}
function parse(obj)
{
  let result = {};
  var parsedDate = {valid:false};
  result.deviceInfo = {
    devEui:obj.devEui,
    appEui:obj.appEui
  };
  result.networkInfo = {
    ts:obj.ts,
    ack:obj.ack,
    dr:obj.dr,
    fcnt:obj.fcnt,
    freq:obj.freq,
    gatewayId:obj.gatewayId,
    port:obj.port,
    rssi:obj.ts,
    snr:obj.snr,
    type:obj.type,
  };
  //начинаем парсить данные
  try
  {
    //Получаем массив байт пакета
    let bytes = converter.stringToBytes(obj.data);
    //Приводим appEui к верхнему регистру
    let appEui = obj.appEui;
    if(appEui) appEui = appEui.toString().toLocaleUpperCase();
    //В зависимости от appEui определяем что за устройство
    switch (appEui)
    {
      case '76656761544C3131':
      {
        result.deviceInfo.deviceModel = 'TL_11';
        parsedDate = parseTL11(bytes);
        break;
      }
      case '7665676173693132':
      {
        result.deviceInfo.deviceModel = 'SI_12';
        parsedDate = parseSI12(bytes);
        break;
      }
      case '7665676173693131':
      {
        result.deviceInfo.deviceModel = 'SI_11';
        parsedDate = parseSI11_SI21(bytes);
        break;
      }
      case '7665676173693133':
      {
        result.deviceInfo.deviceModel = 'SI_13';
        parsedDate = parseSI13(bytes);
        break;
      }
      case '7665676173693231':
      {
        result.deviceInfo.deviceModel = 'SI_21';
        parsedDate = parseSI11_SI21(bytes);
        break;
      }
      case '4D2D425553203120':
      {
        result.deviceInfo.deviceModel = 'M_BUS_1';
        parsedDate = parseMBUS1(bytes);
        break;
      }
      case '4D2D425553203220':
      {
        result.deviceInfo.deviceModel = 'M_BUS_2';
        parsedDate = parseMBUS2(bytes);
        break;
      }
      case '7665676174703131':
      {
        result.deviceInfo.deviceModel = 'TP_11';
        parsedDate = parseTP11(bytes);
        break;
      }
      case '7665676174643131':
      {
        result.deviceInfo.deviceModel = 'TD_11';
        parsedDate = parseTD11(bytes);
        break;
      }
      case '76656761474D2D32':
      {
        result.deviceInfo.deviceModel = 'GM_2';
        parsedDate = parseGM2(bytes);
        break;
      }
      case '7665676173483031':
      {
        result.deviceInfo.deviceModel = 'SH_1';
        parsedDate = parseSH1(bytes);
        break;
      }
      case '7665676153564531':
      {
        result.deviceInfo.deviceModel = 'SVE_1';
        parsedDate = parseSVE1(bytes);
        break;
      }
      case '7665676153454231':
      {
        result.deviceInfo.deviceModel = 'SEEB_1_SPBZIP';
        parsedDate = parseSEEB(bytes);
        break;
      }
      case '5345454220312020':
      {
        result.deviceInfo.deviceModel = 'SEEB_2_MERCURY';
        parsedDate = parseSEEB(bytes);
        break;
      }
      case '7665676173693131':
      {
        result.deviceInfo.deviceModel = 'TC_11';
        parsedDate = parseTC11(bytes);
        break;
      }
      case '76616D6330313031':
      {
        result.deviceInfo.deviceModel = 'SMART_MC_0101';
        parsedDate = parseMC0101(bytes);
        break;
      }
      case '7661616330313031':
      {
        result.deviceInfo.deviceModel = 'SMART_AS_0101';
        parsedDate = parseAS0101(bytes);
        break;
      }
      case '766567614D533031':
      {
        result.deviceInfo.deviceModel = 'SMART_MS_0101';
        parsedDate = parseMS0101(bytes);
        break;
      }
      case '7665676153533031':
      {
        result.deviceInfo.deviceModel = 'SMART_SS_0101';
        parsedDate = parseSS0101(bytes);
        break;
      }
      case '7665676153533031':
      {
        result.deviceInfo.deviceModel = 'LM_1';
        parsedDate = parseLM1(bytes);
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
  catch (e)
  {
    console.error('Error parse rx data',e);
  }
  finally
  {
    result.devicePayload = {
      rawData:obj.data
    };
    //В случае если получилось распарсить пакет, записываем в результат
    if(parsedDate.valid)
    {
      for(var key in parsedDate)
      {
        if(key!='valid'&&key!='deviceModel') result.devicePayload[key] = parsedDate[key];
      }
    }
    return result;
  }
}
module.exports.parse = parse;
