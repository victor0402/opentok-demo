This is a react-native demo project to explore the functionalities of [Tokbox](https://tokbox.com) with [opentok-react-native](https://github.com/opentok/opentok-react-native/) library.

### Setup
Before running this project, open App.js and set your API key, Session Id and Token.


### Running on an android device:
```
# add vendor id: (obtivo na lista do comando lsusb)
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules

#check device:
adb devices

#execute
react-native run-android

#follow logs
react-native log-android

#open react options:
adb shell input keyevent 82
```
