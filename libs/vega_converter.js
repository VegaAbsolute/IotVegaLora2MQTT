function stringToBytes(str)
{
  let bytes=[];
  for (var i =0;i<str.length-1;i=i+2)
  {
     bytes.push(str.substring(i, i+2));
  }
  return bytes;
}
function bytesToSettingsSI(byte)
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
    settings.confirmedUplinks = bits[1]?'confirmed':'unconfirmed';
    // let b2 = bits[2]!==undefined?bits[2].toString():'0';
    // let b3 = bits[3]!==undefined?bits[3].toString():'0';
    // let period_connect = b2+b3;
    // if(period_connect=='00')
    // {
    //   settings.periodConnectInHours = 1;
    // }
    // else if(period_connect=='10')
    // {
    //   settings.periodConnectInHours = 6;
    // }
    // else if(period_connect=='01')
    // {
    //   settings.periodConnectInHours = 12;
    // }
    // else if(period_connect=='11')
    // {
    //   settings.periodConnectInHours = 24;
    // }
    // else
    // {
    //   return null;
    // }
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

    }
    catch(e)
    {
        return null;
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
module.exports.bytesToSettingsSI = bytesToSettingsSI;
module.exports.bytesToIntNegative = bytesToIntNegative;
module.exports.bytesToInt = bytesToInt;
module.exports.stringToBytes = stringToBytes;
