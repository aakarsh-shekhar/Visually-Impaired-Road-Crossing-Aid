import React from 'react';
import { Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera </Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <Camera ref={ref => { this.camera = ref; }} />
          <Camera style={{ flex: 1 }}>
            <View
              style={{
                flex: 3,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log("button pressed");

              try{

                for(var i =1 ; i<=15 ; i++){
                  if (this.camera) {
                    photo = this.camera.takePictureAsync();
                    photo.uri = Expo.FileSystem.cacheDirectory + i;
                    console.log(photo);
 
                    //CameraRoll.saveToCameraRoll(photo.uri);
                    
                    //setTimeout(console.log("picture taken"), 300);

                  };
                }}catch(err){}

                }}>


                <Text
                  style={{ fontSize: 18, color: 'white', fontSize: 72 }}>
                  {' '}Start{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}