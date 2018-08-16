const converter = require('./vega_converter.js');
function parseLM1(pack)
{
  let res = {valid:false};
  return res;
}
function parseSS0101(pack)
{
  let res = {valid:false};
  return res;
}
function parseMS0101(pack)
{
  let res = {valid:false};
  return res;
}
function parseAS0101(pack)
{
  let res = {valid:false};
  return res;
}
function parseMC0101(pack)
{
  let res = {valid:false};
  return res;
}
function parseTC11(pack)
{
  let res = {valid:false};
  return res;
}
function parseSEEB(pack)
{
  let res = {valid:false};
  return res;
}
function parseSEEB(pack)
{
  let res = {valid:false};
  return res;
}
function parseSVE1(pack)
{
  let res = {valid:false};
  return res;
}
function parseSH1(pack)
{
  let res = {valid:false};
  return res;
}
function parseGM2(pack)
{
  let res = {valid:false};
  return res;
}
function parseTD11(pack)
{
  let res = {valid:false};
  return res;
}
function parseTP11(pack)
{
  let res = {valid:false};
  return res;
}
function parseMBUS2(pack)
{
  let res = {valid:false};
  return res;
}
function parseMBUS1(pack)
{
  let res = {valid:false};
  return res;
}
function parseSI21(pack)
{
  let res = {valid:false};
  return res;
}
function parseSI13(pack)
{
  let res = {valid:false};
  return res;
}
function parseSI11(pack)
{
  let res = {valid:false};
  return res;
}
function parseSI12(pack)
{
  let res = {valid:false};
  return res;
}
function parseTL11(pack)
{
  let res = {valid:false};
  return res;
}
function parse(obj)
{
  let result = {};
  //Заполняем результат известными данными
  result = obj;
  //начинаем парсить данные
  try
  {
    //Получаем массив байт пакета
    let bytes = converter.stringToBytes(obj.data);
    //Приводим appEui к верхнему регистру
    let appEui = obj.appEui.toLocaleUpperCase();
    var parsedDate = {valid:false};
    //В зависимости от appEui определяем что за устройство
    switch (appEui)
    {
      case '76656761544C3131':
      {
        result.deviceType = 'TL_11';
        parsedDate = parseTL11(bytes);
        break;
      }
      case '7665676173693132':
      {
        result.deviceType = 'SI_12';
        parsedDate = parseSI12(bytes);
        break;
      }
      case '7665676173693131':
      {
        result.deviceType = 'SI_11';
        parsedDate = parseSI11(bytes);
        break;
      }
      case '7665676173693133':
      {
        result.deviceType = 'SI_13';
        parsedDate = parseSI13(bytes);
        break;
      }
      case '7665676173693231':
      {
        result.deviceType = 'SI_21';
        parsedDate = parseSI21(bytes);
        break;
      }
      case '4D2D425553203120':
      {
        result.deviceType = 'M_BUS_1';
        parsedDate = parseMBUS1(bytes);
        break;
      }
      case '4D2D425553203220':
      {
        result.deviceType = 'M_BUS_2';
        parsedDate = parseMBUS2(bytes);
        break;
      }
      case '7665676174703131':
      {
        result.deviceType = 'TP_11';
        parsedDate = parseTP11(bytes);
        break;
      }
      case '7665676174643131':
      {
        result.deviceType = 'TD_11';
        parsedDate = parseTD11(bytes);
        break;
      }
      case '76656761474D2D32':
      {
        result.deviceType = 'GM_2';
        parsedDate = parseGM2(bytes);
        break;
      }
      case '7665676173483031':
      {
        result.deviceType = 'SH_1';
        parsedDate = parseSH1(bytes);
        break;
      }
      case '7665676153564531':
      {
        result.deviceType = 'SVE_1';
        parsedDate = parseSVE1(bytes);
        break;
      }
      case '7665676153454231':
      {
        result.deviceType = 'SEEB_1_SPBZIP';
        parsedDate = parseSEEB(bytes);
        break;
      }
      case '5345454220312020':
      {
        result.deviceType = 'SEEB_2_MERCURY';
        parsedDate = parseSEEB(bytes);
        break;
      }
      case '7665676173693131':
      {
        result.deviceType = 'TC_11';
        parsedDate = parseTC11(bytes);
        break;
      }
      case '76616D6330313031':
      {
        result.deviceType = 'SMART_MC_0101';
        parsedDate = parseMC0101(bytes);
        break;
      }
      case '7661616330313031':
      {
        result.deviceType = 'SMART_AS_0101';
        parsedDate = parseAS0101(bytes);
        break;
      }
      case '766567614D533031':
      {
        result.deviceType = 'SMART_MS_0101';
        parsedDate = parseMS0101(bytes);
        break;
      }
      case '7665676153533031':
      {
        result.deviceType = 'SMART_SS_0101';
        parsedDate = parseSS0101(bytes);
        break;
      }
      case '7665676153533031':
      {
        result.deviceType = 'LM_1';
        parsedDate = parseLM1(bytes);
        break;
      }
      default:
      {
        //Неизвестное устройство
        result.deviceType = 'unknown';
        parsedDate.valid = false;
        break;
      }
    }
    //В случае если получилось распарсить пакет, записываем в результат
    if(parsedDate.valid)
    {
      for(var key in parsedDate)
      {
        if(key!='valid') result[key] = parsedDate[key];
      }
    }
  }
  catch (e)
  {
    console.error('Error parse rx data',e);
  }
  finally
  {
    return result;
  }
}
module.exports.parse = parse;
