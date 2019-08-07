[![IotVega](http://iotvega.com/images/logo.png)](http://iotvega.com)
# IotVegaLora2MQTT
Applications for receiving data from the IotVega server, parse data and sending by MQTT.
## Quick start
#### Preparation
- Install node.js, [download](https://nodejs.org/en/download/)
- Install the Nodejs Application Task Manager PM2 `npm install pm2 -g`
#### Installing and running the application
- Make a clone of the repository IotVegaLora2MQTT `git clone https://github.com/VegaAbsolute/IotVegaLora2MQTT.git`
- Go to the Applications folder IotVegaLora2MQTT `cd IotVegaLora2MQTT`
- Running the application `pm2 start npm -- start`
- Configure IotVegaLora2MQTT. Edit the config.ini file.
- Restart the application so that the settings are applied `pm2 restart 0`
> To view the program work use the command `pm2 monit`
## Supported Devices Lora2MQTT
- SI-11
- SI-21
- SI-13
- SMART HS-0101
- GM-2
- TC-12
## Message structure Description
#### Topics
- /IotVegaServer/# - All messages from the application Iotvega Lora2mqtt
- /IotVegaServer/modelDevice/# - All messages from the application Iotvega Lora2mqtt by model Device (Possible device models are presented below, For more information, see "Possible device models")
- /IotVegaServer/modelDevice/devEui - All messages from a specific device. Where DevEui - DevEui of your device.
##### Example topic
/IotVegaServer/SI_11/3334448882221113
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
  - rawData *- source data transferred to the server*
  - *The data that was able to parse the application. The set is different for each device model. More structure devicePayload Look in section - "Possible structures devicePayload"*
##### Possible structures devicePayload
##### For SI_11 or SI_21
- packetType *- possible values: regular, alarm, timeCorrection, settings*
- battery *- charge battery in %*
- settings
  - activationType *- Possible values: ABP or OTAA*
  - periodConnectInMinutes *- In minutes*
  - input1Type *- Passible values: security or pulse*
  - input2Type *- Passible values: security or pulse*
  - input3Type *- Passible values: security or pulse*
  - input4Type *- Passible values: security or pulse*
- time *- Unix timestamp*
- temperature *- Temperature inside the case in degrees Celsius*
- input1 *- Number of pulses or state*
- input2 *- Number of pulses or state*
- input3 *- Number of pulses or state*
- input4 *- Number of pulses or state*
##### For SI_13
- packetType *- possible values: regular, alarm, timeCorrection, settings, modBus*
- battery *- charge battery in %*
- settings
  - activationType *- Possible values: ABP or OTAA*
  - confirmedUplinks *- Possible values: confirmed or unconfirmed*
  - periodConnectInMinutes *- In minutes*
  - input1Type *- Passible values: security or pulse*
  - input2Type *- Passible values: security or pulse*
- time *- Unix timestamp*
- temperature *- Temperature inside the case in degrees Celsius*
- input1 *- Number of pulses or state*
- input2 *- Number of pulses or state*
- input3 *- Number of pulses or state*
- input4 *- Number of pulses or state*
- alarmOnInput *- Entry number*
- totalDataSize *- Total size obtained through the data interface*
- dataSize *- The size of the data in this packet*
- packetNumber *- Packet sequence number*
- packetCount *- Total count packages*
- data *- Data*
- address *- Meter address*
- pollResult *- Poll result*
- tariff_1 *- indications on tariff 1*
- tariff_2 *- indications on tariff 2*
- tariff_3 *- indications on tariff 3*
- tariff_4 *- indications on tariff 4*
- commandCode *- command code*
- commandResult *- Passible values: success or error*
##### SMART_HS_0101
- reason *- possible values: by_time, vibration_alarm, alarm_open_sensor_1, alarm_open_sensor_2, humidity_alarm, temperature_alarm*
- packetType *- possible values: regular, timeCorrection, settings*
- battery *- charge battery in %*
- time *- Unix timestamp*
- temperature *- Temperature inside the case in degrees Celsius*
- humidity *- Humidity in %*
- state_open_sensor_1 *- state*
- state_open_sensor_2 *- state*
- angle *- Angle of vertical deviation in %*
- humidity_minimum *- Min humidity threshold in %*
- humidity_maximum *- Max humidity threshold in %*
- temperature_minimum *- Min temperature threshold*
- temperature_maximum *- Max temperature threshold*
##### For GM_2
- packetType *- possible values: regular, timeCorrection, settings*
- reason *- possible values: by_time, alarm_input_1, alarm_input_2, update_state_output_1, update_state_output_2, alarm_hall, alarm_tamper*
- battery *- charge battery in %*
- temperature *- Temperature inside the case in degrees Celsius*
- input1 *- state input 1*
- input2 *- state input 2*
- output1 *- state output 1*
- output2 *- state output 2*
- state_hall *- state hall*
- state_tamper *- state tamper*
- readings_meter *- readings meter*
- initial_readings_meter *- initial readings meter*
##### For TC_12
- packetType *- possible values: pressing_button, automatically*
- info_temperature *- presence temperature info*
- info_navigation *- presence navigation data*
- info_counter_uplink *- presence counter uplink*
- info_counter_downlink *- presence counter downlink*
- info_battery *- presence battery info*
- info_RSSI_SNR *- presence RSSI and SNR info*
- temperature *- Temperature inside the case in degrees Celsius*
- location
  - latitude
    - format1 *- latitude in the format: DD°MM.MMM' C, where C - code latitude(N/S)*
    - format2 *- latitude in the format: DD.DDDDDD*
  - longitude
    - format1 *- longitude in the format: DDD°MM.MM' C, where C - code longitude(W/E)*
    - format2 *- longitude in the format: DD.DDDDDD*
- counter_uplink *- counter of uplink send*
- counter_downlink *- counter of downlink received*
- battery *- charge battery in mB*
- rssi *- absolute value RSSI in dBm*
- snr *- value SNR in dB*

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
- SI_22
- GM_1
- TC_12
- SMART_HS_0101
> unknown - If the device model could not be determined
