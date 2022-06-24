import React, { useEffect, useState } from 'react';
import { getSnaps, readSnap, seenSnap } from '../services/index';
import { Dimensions, Text, StyleSheet, View, SafeAreaView, FlatList, ScrollView, ActivityIndicator ,Modal} from 'react-native';
import { Button } from 'react-native-elements';

import Image from 'react-native-scalable-image';

import { vw, vh } from 'react-native-expo-viewport-units';


const AllSnaps = (props) => {
  const [snaps, setSnaps] = useState([]);
  const [snap, setSnap] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getSnaps(setSnaps);
  }, [snap]);

  const openSnap = ({ snap_id, duration }) => {
    setLoader(true);
    readSnap(snap_id, setSnap)
      .then(() => {
        setLoader(false);
      })
      .finally(() => {
        setTimeout(() => {
          seenSnap(snap_id, setSnap);
          setLoader(false);
        }, duration * 1000);
      });
  };

  function Item ({ snap_id, duration, from }) {
    from = typeof from === 'string' ? from.split('@')[0] : '';
    return (
      <View style={styles.item}>
        <Text style={styles.item3}>{from} </Text>
        <Text style={styles.duration}>{duration}</Text>
        <Text style={styles.circle}></Text>
        <Button
          buttonStyle={styles.openSnap}
          title="Open snap"
          onPress={() => openSnap({ snap_id, duration })}
          
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.allSnap}>
        <Text style={styles.item2}> ✨ Vos snap reçu ✨</Text>
     
        {snaps ? snaps.map((item) => { return <Item snap_id={item.snap_id} duration={item.duration} from={item.from} />}) : <Text>Loading...</Text>}
        {loader === true && <ActivityIndicator size="large" color="#0000ff" />}
        {snap !== '' &&
       
          <Image width={Dimensions.get('window').width} source={{ uri: snap }}
          />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#CADBDC',
    color: '#342B38',
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  item2: {
    backgroundColor: 'yellow',
    color: '#342B38',
    fontSize: 29,
    padding: 20,
textAlign:'center',
    marginHorizontal: 16,
    fontWeight: 'bold'
  },
  item3: {
    color: '#342B38',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#64ff4c',
    padding: 15,
    left: 280,
    top: 10,
    position: 'absolute',
    opacity: .5,
    alignItems: 'center'
  },
  duration: {
    color: '#222',
    fontSize: 19,
    padding: 20,
    left: 275,
    top: -3,
    position: 'absolute'
  },
  allSnap: {
    marginTop: vh(5)
  },
  openSnap: {
    backgroundColor: '#ffd100',
    width: vw(75),
    marginTop: vh(3)
  }
});
export default AllSnaps;
