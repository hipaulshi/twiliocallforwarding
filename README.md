#Twilio Call Fowarding
Basically uses twilio as a VOIP to call other countries. It mainly uses node.js,express and twilio api.
#Install
```npm install```
#Setup
go to ```app.js``` and change ```TWILIO_ACCOUNT_SID``` and ```TWILIO_AUTH_TOKEN``` to your own one on top of your [account page](https://www.twilio.com/user/account).
then you need to specify countires that allows long distance calling out on [international dialing permissions tab](https://www.twilio.com/user/account/settings/international)
setup voice call back address to the server you are running on [here](https://www.twilio.com/user/account/phone-numbers/incoming), by default it should be http://yourserveraddress:3000/twilio
#Usage
1. Call your number listed [here](https://www.twilio.com/user/account/phone-numbers/incoming)
2. Upon hearing the 'Enter', enter the number you wish to call, starting with CountryCode(without 00), for example, to call China, do 86xxxxxxxxxxx. Number must be entered within 30 sec.
3. hit #
3. After call is finished, hangup. That's it!
4. Time out after 4hs due to twilio api restriction.

