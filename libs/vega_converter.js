function stringToBytes(str)
{
  let bytes=[];
  for (var i =0;i<str.length-1;i=i+2)
  {
     bytes.push(str.substring(i, i+2));
  }
  return bytes;
}
function bytesToSettingsSI(byte,version)
{
  try
  {
    let settings = {};
    if(byte===undefined||byte==='ff')
    {
      return null;
    }
    let bits = parseInt(byte,16).toString(2).split('').reverse().splice(0,6);
    settings.activationType = bits[0]?'ABP':'OTAA';
    if(version==2)
    {
      //for si13
      settings.confirmedUplinks = bits[1]?'confirmed':'unconfirmed';
      let b2 = bits[2]!==undefined?bits[2].toString():'0';
      let b3 = bits[3]!==undefined?bits[3].toString():'0';
      let period_connect = b2+b3;
      if(period_connect=='00')
      {
        settings.periodConnectInMinutes = 60;
      }
      else if(period_connect=='01')
      {
        //6 H
        settings.periodConnectInMinutes = 360;
      }
      else if(period_connect=='10')
      {
        //12 H
        settings.periodConnectInMinutes = 720;
      }
      else if(period_connect=='11')
      {
        //24 H
        settings.periodConnectInMinutes = 1440;
      }
      else
      {
        settings.periodConnectInHours = null;
      }
    }
    else
    {
      //for si11
      let b1 = bits[1]!==undefined?bits[1].toString():'0';
      let b2 = bits[2]!==undefined?bits[2].toString():'0';
      let b3 = bits[3]!==undefined?bits[3].toString():'0';
      let period_connect = b1+b2+b3;
      if(period_connect=='000')
      {
        settings.periodConnectInMinutes = 5;
      }
      else if(period_connect=='100')
      {
        settings.periodConnectInMinutes = 15;
      }
      else if(period_connect=='010')
      {
        settings.periodConnectInMinutes = 30;
      }
      else if(period_connect=='110')
      {
        settings.periodConnectInMinutes = 60;
      }
      else if(period_connect=='001')
      {
        //6 H
        settings.periodConnectInMinutes = 360;
      }
      else if(period_connect=='101')
      {
        //12 H
        settings.periodConnectInMinutes = 720;
      }
      else if(period_connect=='011')
      {
        //24 H
        settings.periodConnectInMinutes = 1440;
      }
      else
      {
        settings.periodConnectInMinutes = null;
      }
    }
    else
    {
      settings.periodConnectInMinutes = null;
    }
    settings.input1Type = bits[4]?'security':'pulse';
    settings.input2Type = bits[5]?'security':'pulse';
    settings.input3Type = bits[6]?'security':'pulse';
    settings.input4Type = bits[7]?'security':'pulse';
    return settings;
  }
  catch(err)
  {
    return null;
  }
}
function bytesToInt(bytes)
{
    try
    {
        let valid_arr = typeof bytes === 'object'&&bytes.length;
        if(!valid_arr) return null;
        let countMAX = 0;
        bytes.reverse();
        let result='';
        for(var i = 0; i<bytes.length;i++)
        {
            if(bytes[i]=='ff') countMAX++;
            result+=bytes[i]===undefined?'00':bytes[i].toString();
        }
        var result_int = parseInt(result,16);
        if(!isNaN(result_int))
        {
            if(countMAX!==bytes.length)
            {
                return result_int;
            }
        }
        return null;
    }
    catch(e)
    {
        return null;
    }
}
function bytesToFloat(bytes,divider)
{
    try
    {
        let valid_arr = typeof bytes === 'object'&&bytes.length;
        if(!valid_arr) return null;
        let countMAX = 0;
        bytes.reverse();
        let result='';
        for(var i = 0; i<bytes.length;i++)
        {
            if(bytes[i]=='ff') countMAX++;
            result+=bytes[i]===undefined?'00':bytes[i].toString();
        }
        var result_int = parseInt(result,16);
        if(!isNaN(result_int))
        {
            if(countMAX!==bytes.length)
            {
                return result_int/divider;
            }
        }
        return null;
    }
    catch(e)
    {
        return null;
    }
}
function byteToBoolean(byte)
{
  try
  {
    let result = parseInt(byte,16)
    if(result===1) return true;
    return false;
  }
  catch (e)
  {
    return false;
  }
}
function bytesToIntNegative(bytes)
{
    try
    {
        let valid_arr = typeof bytes === 'object'&&bytes.length;
        if(!valid_arr) return null;
        let countMAX = 0;
        bytes.reverse();
        let result='';
        for(var i = 0; i<bytes.length;i++)
        {
            if(bytes[i]=='ff') countMAX++;
            result+=bytes[i]===undefined?'00':bytes[i].toString();
        }
        var result_int = parseInt(result,16);
        if(!isNaN(result_int))
        {
            let maxVal = Math.pow(2, result.length / 2 * 8);
            if (result_int > maxVal / 2 - 1)
            {
                result_int = result_int - maxVal;
            }
            if(countMAX!==bytes.length)
            {
                return result_int;
            }
        }

    }
    catch(e)
    {
        return null;
    }
}
function extractedData(data,before)
{
  let result = '';
  try
  {
      for(var i = before; i<data.length;i++)
      {
          result+=data[i];
      }
  }
  catch(e)
  {

  }
  finally
  {
    return result;
  }
}
module.exports.bytesToSettingsSI = bytesToSettingsSI;
module.exports.bytesToIntNegative = bytesToIntNegative;
module.exports.bytesToInt = bytesToInt;
module.exports.stringToBytes = stringToBytes;
module.exports.extractedData = extractedData;
module.exports.byteToBoolean = byteToBoolean;
