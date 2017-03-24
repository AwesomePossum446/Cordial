
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import { getTagId, readTag, writeTag } from 'nfc-react-native';
import { Actions, ActionConst} from 'react-native-router-flux';
import jsonpack from 'jsonpack';

import {
  brightBlue,
  DISPLAY_PHOTO_ASPECT_RATIO,
  DEVICE_WIDTH
} from '../consts/styles';
import StatusBarBackground from '../components/statusbar-background';

import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';

const contactHeight = DEVICE_WIDTH / DISPLAY_PHOTO_ASPECT_RATIO;


class NFCContainer extends Component {
  readTagId() {
    getTagId();
  }
  readTagData() {
    readTag([
      { sector: 1, blocks: [1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
      { sector: 2, blocks: [0,1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
      { sector: 3, blocks: [0], clave: 'FFFFFFFFFFFF', keyType: 'A' }
    ]).then((data) => console.log(data));
  }
  writeTagData() {
    writeTag([{ sector: 1, blocks: [
    { index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
    { index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
      clave: 'FFFFFFFFFFFF', keyType: 'A' },
      { sector: 2, blocks: [
    { index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
    { index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
    { index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
      clave: 'FFFFFFFFFFFF', keyType: 'A' },
    { sector: 3, blocks: [
    { index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
      clave: 'FFFFFFFFFFFF', keyType: 'A' },
      ], 1148002313);
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('onTagError', function (e) {
        console.log('error', e);
        Alert.alert(JSON.stringify(e));
    });

    DeviceEventEmitter.addListener('onTagDetected', function (e) {
        Alert.alert(JSON.stringify(e));
    });

    DeviceEventEmitter.addListener('onTagRead', (e) => {
        console.log('reading', e);
        Alert.alert(JSON.stringify(e));
    });

    DeviceEventEmitter.addListener('onTagWrite', (e) => {
        console.log('writing', e);
        Alert.alert(JSON.stringify(e));
    });

    //this.writeTagData()
    //this.readTagId();
    this.readTagData();
    // Alert.alert('Writing data');
  }
  render() {
    const {id, displayName} = this.props;
    const jsonObject = this.props.Card.byId()[id];

    const compressedJsonString = jsonpack.pack(jsonObject);

    return (
      <View style={{flex: 1}}>
        <StatusBarBackground />
        <View style={styles.titleContainer}>
          <Text> Sharing... {displayName}</Text>

          <Button
              onPress={Actions.pop}
              title="Done"
              color="blue"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', height: 40, justifyContent: 'center'}}>
          <Text>Recieving via NFC...</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		height: contactHeight
	},
	titleContainer: {
		backgroundColor: brightBlue,
		padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
	},
	titleText: {
		fontSize: 20,
		margin: 0,
		textDecorationLine: 'none'
  },
  qrcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  }
});

export default ConnectToModel(ConnectToModel(NFCContainer,Card), User);
