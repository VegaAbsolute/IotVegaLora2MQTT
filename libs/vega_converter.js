function stringToBytes( str )
{
  let bytes=[];
  for ( var i = 0; i < str.length - 1; i = i + 2 )
  {
     bytes.push( str.substring( i, i + 2 ) );
  }
  return bytes;
}
function bytesToTypeVegaSmoke2 ( byte )
{
  console.log('bytesToTypeVegaSmoke2', byte);
  try
  {
    if( byte !== undefined)
    {
      let reason = parseInt( byte,16 );
      console.log('bytesToTypeVegaSmoke2 reason', reason);
      switch ( reason )
      {
        // case 1:
        // {
        //   return 'by_time';
        //   break;
        // }
        // case 2:
        // {
        //   return 'vibration_alarm';
        //   break;
        // }
        // case 3:
        // {
        //   return 'temperature_alarm';
        //   break;
        // }
        // case 4:
        // {
        //   return 'voltage_status';
        //   break;
        // }
        case 5:
        {
          return 'alarm_fire';
          break;
        }
        case 6:
        {
          return 'alarm_test';
          break;
        }
        case 7:
        {
          return 'alarm_common';
          break;
        }
        case 8:
        {
          return 'alarm_detach';
          break;
        }
        case 9:
        {
          return 'alarm_stop';
          break;
        }
        case 10:
        {
          return 'alarm_low_bat';
          break;
        }
        case 11:
        {
          return 'guard_start';
          break;
        }
        case 12:
        {
          return 'guard_stop';
          break;
        }
        case 13:
        {
          return 'guard_off';
          break;
        }
        case 14:
        {
          return 'status_fault';
          break;
        }
        case 15:
        {
          return 'status_fog';
          break;
        }
        case 16:
        {
          return 'force';
          break;
        }
        default:
        {
          return null;
          break;
        }
      }
    }
    return null;
  }
  catch ( e )
  {
    return null;
  }
}
function bytesToReasonGPNPUMP ( byte )
{
  try
  {
    if( byte !== undefined)
    {
      let reason = parseInt( byte,16 );
      switch ( reason )
      {
        case 1:
        {
          return 'by_time';
          break;
        }
        case 2:
        {
          return 'vibration_alarm';
          break;
        }
        case 3:
        {
          return 'temperature_alarm';
          break;
        }
        case 4:
        {
          return 'voltage_status';
          break;
        }
        case 5:
        {
          return 'tvoc_alarm';
          break;
        }
        case 6:
        {
          return 'leakage_alarm';
          break;
        }
        default:
        {
          return null;
          break;
        }
      }
    }
    return null;
  }
  catch ( e )
  {
    return null;
  }
}
function bytesToReasonGM2 ( byte )
{
  try
  {
    if( byte !== undefined)
    {
      let reason = parseInt( byte,16 );
      switch ( reason )
      {
        case 0:
        {
          return 'by_time';
          break;
        }
        case 1:
        {
          return 'alarm_input_1';
          break;
        }
        case 2:
        {
          return 'alarm_input_2';
          break;
        }
        case 3:
        {
          return 'update_state_output_1';
          break;
        }
        case 4:
        {
          return 'update_state_output_2';
          break;
        }
        case 5:
        {
          return 'alarm_hall';
          break;
        }
        case 6:
        {
          return 'alarm_tamper';
          break;
        }
        default:
        {
          return null;
          break;
        }
      }
    }
    return null;
  }
  catch ( e )
  {
    return null;
  }
}
function bytesToReasonHS0101 ( byte )
{
  try
  {
    if( byte !== undefined)
    {
      let reason = parseInt( byte,16 );
      switch ( reason )
      {
        case 1:
        {
          return 'by_time';
          break;
        }
        case 2:
        {
          return 'alarm_open_sensor_1';
          break;
        }
        case 3:
        {
          return 'alarm_open_sensor_2';
          break;
        }
        case 4:
        {
          return 'vibration_alarm';
          break;
        }
        case 5:
        {
          return 'humidity_alarm';
          break;
        }
        case 6:
        {
          return 'temperature_alarm';
          break;
        }
        default:
        {
          return null;
          break;
        }
      }
    }
    return null;
  }
  catch ( e )
  {
    return null;
  }
}

function bytesToSettingsSI ( byte, version )
{
  try
  {
    let settings = {};
    if ( byte === undefined || byte === 'ff' )
    {
      return null;
    }
    let bits = parseInt ( byte, 16 ).toString( 2 ).split('').reverse().splice( 0, 6 );
    settings.activationType = bits[0] ? 'ABP' : 'OTAA';
    if ( version == 2 )
    {
      //for si13
      settings.confirmedUplinks = bits[1] ? 'confirmed' : 'unconfirmed';
      let b2 = bits[2] !== undefined ? bits[2].toString() : '0';
      let b3 = bits[3] !== undefined ? bits[3].toString() : '0';
      let period_connect = b2 + b3;
      if ( period_connect == '00' )
      {
        settings.periodConnectInMinutes = 60;
      }
      else if ( period_connect == '01' )
      {
        //6 H
        settings.periodConnectInMinutes = 360;
      }
      else if ( period_connect == '10' )
      {
        //12 H
        settings.periodConnectInMinutes = 720;
      }
      else if ( period_connect == '11' )
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
      let b1 = bits[1] !== undefined ? bits[1].toString() : '0';
      let b2 = bits[2] !== undefined ? bits[2].toString() : '0';
      let b3 = bits[3] !== undefined ? bits[3].toString() : '0';
      let period_connect = b1 + b2 + b3;
      if ( period_connect == '000' )
      {
        settings.periodConnectInMinutes = 5;
      }
      else if ( period_connect == '100' )
      {
        settings.periodConnectInMinutes = 15;
      }
      else if ( period_connect == '010' )
      {
        settings.periodConnectInMinutes = 30;
      }
      else if ( period_connect == '110' )
      {
        settings.periodConnectInMinutes = 60;
      }
      else if ( period_connect == '001' )
      {
        //6 H
        settings.periodConnectInMinutes = 360;
      }
      else if ( period_connect == '101' )
      {
        //12 H
        settings.periodConnectInMinutes = 720;
      }
      else if ( period_connect == '011' )
      {
        //24 H
        settings.periodConnectInMinutes = 1440;
      }
      else
      {
        settings.periodConnectInMinutes = null;
      }
    }
    settings.input1Type = bits[4] ? 'security' : 'pulse';
    settings.input2Type = bits[5] ? 'security' : 'pulse';
    settings.input3Type = bits[6] ? 'security' : 'pulse';
    settings.input4Type = bits[7] ? 'security' : 'pulse';
    return settings;
  }
  catch ( err )
  {
    return null;
  }
}
function bytesToInt ( bytes )
{
    try
    {
        let valid_arr = typeof bytes === 'object' && bytes.length;
        if ( !valid_arr ) return null;
        let countMAX = 0;
        bytes.reverse();
        let result='';
        for (var i = 0; i < bytes.length; i++)
        {
            if ( bytes[i] == 'ff' ) countMAX++;
            result += bytes[i] === undefined ? '00' : bytes[i].toString();
        }
        var result_int = parseInt( result, 16 );
        if ( !isNaN( result_int ) )
        {
            if (countMAX !== bytes.length)
            {
                return result_int;
            }
        }
        return null;
    }
    catch ( e )
    {
        return null;
    }
}
function bytesToFloat( bytes, divider )
{
    try
    {
        let valid_arr = typeof bytes === 'object' && bytes.length;
        if ( !valid_arr ) return null;
        let countMAX = 0;
        bytes.reverse();
        let result='';
        for ( var i = 0; i < bytes.length; i++ )
        {
            if ( bytes[i] == 'ff' ) countMAX++;
            result += bytes[i] === undefined ? '00' : bytes[i].toString();
        }
        var result_int = parseInt( result, 16 );
        if ( !isNaN( result_int ) )
        {
            if ( countMAX !== bytes.length )
            {
                return result_int / divider;
            }
        }
        return null;
    }
    catch ( e )
    {
        return null;
    }
}
function byteToBoolean ( byte )
{
  try
  {
    let result = parseInt ( byte, 16 )
    if ( result === 1) return true;
    return false;
  }
  catch ( e )
  {
    return false;
  }
}
function bytesToFloatNegative( bytes,  divider )
{
  try
  {
    if( divider === undefined ) divider = 1;
    let result = bytesToIntNegative(bytes);
    if ( result !== null )
    {
      return result / divider;
    }
    return null;
  }
  catch ( e )
  {
    return null;
  }
}
function bytesToIntNegative( bytes )
{
    try
    {
        let valid_arr = typeof bytes === 'object' && bytes.length;
        if ( !valid_arr ) return null;
        let countMAX = 0;
        bytes.reverse();
        let result='';
        for ( var i = 0; i < bytes.length; i++ )
        {
            if ( bytes[i] == 'ff' ) countMAX++;
            result += bytes[i] === undefined ? '00' : bytes[i].toString();
        }
        var result_int = parseInt( result, 16 );
        if ( !isNaN( result_int ) )
        {
            let maxVal = Math.pow( 2, ( result.length / 2 * 8 ) );
            if (result_int > ( ( maxVal / 2 ) - 1) )
            {
                result_int = result_int - maxVal;
            }
            if ( countMAX !== bytes.length )
            {
                return result_int;
            }
        }
        return null;
    }
    catch ( e )
    {
        return null;
    }
}
function extractedData ( data, before )
{
  let result = '';
  try
  {
      for (var i = before; i < data.length; i++ )
      {
          result += data[i];
      }
  }
  catch ( e )
  {

  }
  finally
  {
    return result;
  }
}
function byteToBits ( byte )
{
  let result = [];
  try
  {
      let dec = parseInt(byte,16);
      let binary = dec.toString(2);
      for( var i = 0; i < binary.length; i++ )
      {
        var bit = binary[i];
        result.push(bit);
      }
      while(result.length < 8)
      {
        result.unshift('0');
      }
      result.reverse();
  }
  catch ( e )
  {
    return null;
  }
  finally
  {
    return result;
  }
}
function bin2dec(num){
  return num.split('').reverse().reduce(function(x, y, i){
    return (y === '1') ? x + Math.pow(2, i) : x;
  }, 0);
}
module.exports.bytesToTypeVegaSmoke2 = bytesToTypeVegaSmoke2;
module.exports.bin2dec = bin2dec; 
module.exports.bytesToReasonGM2 = bytesToReasonGM2;
module.exports.byteToBits = byteToBits;
module.exports.bytesToSettingsSI = bytesToSettingsSI;
module.exports.bytesToIntNegative = bytesToIntNegative;
module.exports.bytesToFloatNegative = bytesToFloatNegative;
module.exports.bytesToFloat = bytesToFloat;
module.exports.bytesToInt = bytesToInt;
module.exports.bytesToReasonHS0101 = bytesToReasonHS0101;
module.exports.bytesToReasonGPNPUMP = bytesToReasonGPNPUMP;
module.exports.stringToBytes = stringToBytes;
module.exports.extractedData = extractedData;
module.exports.byteToBoolean = byteToBoolean;
