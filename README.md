[![IotVega](http://iotvega.com/images/logo.png)](http://iotvega.com)
# IotVegaLora2MQTT
Applications for receiving data from the IotVega server, parse data and sending by MQTT.
## Quick start
#### Preparation
- Install node.js, [download](https://nodejs.org/en/download/)
- Install the Nodejs Application Task Manager PM2 `npm install pm2 -g`
#### Installing and running the application
- Make a clone of the repository IotVegaLora2MQTT `git clone https://github.com/VegaAbsolute/IotVegaLora2MQTT.git`
- Go to the Applications folder IotVegaLora2MQTT `cd IotVegaLora2MQTT` or for windows `dir IotVegaLora2MQTT`
- Running the application `pm2 start npm -- start`
- Configure IotVegaLora2MQTT. Edit the config.ini file.
- Restart the application so that the settings are applied `pm2 restart 0`
> To view the program work use the command `pm2 monit`
## Supported Devices Lora2MQTT
- SI-11
- SI-21
## Message structure Description
#### Topics
- /IotVegaServer/# - All messages from the application Iotvega Lora2mqtt
- /IotVegaServer/modalDevice/# - All messages from the application Iotvega Lora2mqtt by modal Device (Possible device models are presented below, For more information, see "Possible device models")
- /IotVegaServer/modalDevice/devEui - All messages from a specific device. Where DevEui - DevEui of your device.
#### Messages  
Messages are in JSON format.
JSON message structure:
- deviceInfo *- General information about the device*
  - devEui *- devEui device*
  - appEui *- appEui device*
  - deviceModel *- model device (possible values, see "Possible device models")*
- networkInfo *- General information about message from device and network status*
  - ts
  - ack
  - dr
  - fcnt
  - freq
  - gatewayId
  - port
  - rssi
  - snr
  - type
- devicePayload *- Data that the device has transferred to the server*
  - rowData *- source data transferred to the server*
  - *The data that was able to parse the application. The set is different for each device model. More structure devicePayload Look in section - "Possible structures devicePayload"*
##### Possible structures devicePayload
##### For SI_11 or SI_21
- packetType *- possible values: regular, alarm, timeCorrection*
- buttary *- charge buttary in %*
- settings
  - activationType *- Possible values: ABP or OTAA*
  - confirmedUplinks *- Possible values: confirmed or unconfirmed*
  - input1Type *- Passible values: security or pulse*
  - input2Type *- Passible values: security or pulse*
  - input3Type *- Passible values: security or pulse*
  - input4Type *- Passible values: security or pulse*
- time *- Unix timestamp*
- temperature *- Temperature inside the case in degrees Celsius*
- input1 *- Number of pulses*
- input2 *- Number of pulses*
- input3 *- Number of pulses or state*
- input4 *- Number of pulses or state*
## Possible device models
- TL_11
- SI_12
- SI_11
- SI_13
- SI_21
- M_BUS_1
- M_BUS_2
- TP_11
- TD_11
- GM_2
- SH_1
- SVE_1
- SEEB_1_SPBZIP
- SEEB_2_MERCURY
- TC_11
- SMART_MC_0101
- SMART_AS_0101
- SMART_MS_0101
- SMART_SS_0101
- LM_1
> unknown - If the device model could not be determined
