import React from 'react'

import { TouchableOpacity, StyleSheet} from 'react-native'

import { AntDesign} from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons';

const AppIcon = ({ AntName, IonName, style, color, size, onPress }) => {

    return (

        <TouchableOpacity style={[styles.icon,{...style}]} onPress={onPress}>
            {AntName && <AntDesign name={AntName} size={size} color={color} />}
            {IonName && <Ionicons name={IonName} size={size} color={color} />}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    icon: {
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.6)',
        filter: `blur(80px)`,

    }
})

export default AppIcon