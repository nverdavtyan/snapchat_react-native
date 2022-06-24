import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Camera ,CameraType} from 'expo-camera';

export default function AppCamera(props) {

    return (

        <View style={ styles.container }>
            <TouchableOpacity 
                style={ styles.buttonparam }
                onPress={ () => props.navigation.navigate('Profile') }
            >
                 <Image style={ styles.iconparam } source={ require('../assets/icon-parametre.png') } />
            </TouchableOpacity>
           
            <Image style={ styles.logo } source={ require('../assets/logo.png') } />
            <TouchableOpacity 
                style={ styles.button }
                onPress={ () => props.navigation.navigate('OpenCamera') }
            >
                <Text style={ styles.text }>Take a snap</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop:110
    },
    button: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 5,
        borderColor: 'dimgrey',
        borderRadius: 5,
        borderWidth: 1,
        margin: 5,
        height: 60,
    },
    text: {
        fontSize: 20,
        color: 'grey',
    },
    logo:{
        width: 300,
        height: 200,
        resizeMode: 'contain',
        margin: 20,
    },
    iconparam:{
        width:25,
        height:25
    }
})
