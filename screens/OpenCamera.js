import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import AppIcon from '../components/AppIcon'

export default function App(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [flash,setFlash] = useState(Camera.Constants.FlashMode.off);



  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }



  const takePic = async () => {
    const { cancelled, uri } = await cameraRef.current.takePictureAsync({
      allowEditing: true,
    });
    if (!cancelled) {
      props.navigation.navigate('Snap', { image: uri });
      
    }
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(uri);

    if (!cancelled) {
      props.navigation.navigate('Snap', { image: uri });
    }
  };

  const changeFlashMode = ()=>{
    setFlash(
      flash === Camera.Constants.FlashMode.off ? 
       Camera.Constants.FlashMode.on :
       Camera.Constants.FlashMode.off);
  }

  return (

    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef} type={type} flashMode={flash}>

       
  
        <View style={styles.header}>
          <AppIcon AntName="user" color="#eee" size={24}
                 onPress= { () => props.navigation.navigate('Camera') }
           />
          <AppIcon IonName="settings-outline" size={24} color="#eee"  
            onPress={ () => props.navigation.navigate('Profile')}
            />
   
        </View>

        <View style={styles.sideItem}>
          <AppIcon style={styles.sideIcons} IonName="camera-outline" size={24} color="#eee"
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}
            />
          <AppIcon style={styles.sideIcons} IonName={flash === Camera.Constants.FlashMode.off ? 'flash-off-outline' : 'flash-outline' }size={24} color='#eee' 
           onPress={ ()=> changeFlashMode()} />
          <AppIcon style={styles.sideIcons} IonName="ios-musical-notes" size={24} color="#eee"   />
   
        </View>

        <View style={styles.choiceBtn}>
          <AppIcon style={styles.sideIcons} IonName="images" size={24} color="#eee" onPress={pickImage}  />
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePic}>

</TouchableOpacity>
        </View>


      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },

  captureBtn: {
    position: 'absolute',
    bottom: 80,
    width: 80,
    height: 80,
    borderColor: '#eee',
    borderRadius: 100,
    borderWidth: 6,
    alignSelf: 'center',
  },
  choiceBtn: {
     flex: 1,
     alignItems: 'left',
     justifyContent: 'flex-end', 
     marginLeft:50,
     marginBottom:80
  },

  header: {
    justifyContent: 'space-between',
    padding: 10,
    marginVertical:10,
    flexDirection: 'row',
    width: '100%'

  },
  sideItem:{
    flexDirection: 'column',
   padding:10,
   alignItems:'flex-end'
  },
  sideIcons:{
    marginVertical:10
  }
});