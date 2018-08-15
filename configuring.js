const fs = require('fs');
const ini = require('ini');
const copyFile = require('fs-copy-file');
function refreshConfig()
{
  try
  {
    copyFile('./default.config', './config.ini', (err) => {
        if (err)
        {
          console.log('error',err);
        }
    });
  }
  catch (e)
  {
    console.error(e)
  }
}
if(!fs.existsSync('./config.ini'))
{
  refreshConfig();
}
else if(process.argv[2]=='refresh')
{
  try
  {
    fs.unlinkSync('./config.ini');
  }
  catch (e)
  {
    console.error(e)
  }
  finally
  {
    refreshConfig();
  }  
}
