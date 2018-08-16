function stringToBytes(str)
{
  let bytes=[];
  for (var i =0;i<str.length-1;i=i+2)
  {
     bytes.push(str.substring(i, i+2));
  }
  return bytes;
}
module.exports.stringToBytes = stringToBytes;
