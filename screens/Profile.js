import * as React from 'react';
import { TouchableOpacity,StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
class Profile extends React.Component{
    loggout(){
        const { navigation } = this.props;
        AsyncStorage.removeItem('token')
        navigation.navigate("Home")
    }

    render(){
        const { navigation } = this.props;
     
        return(
            <View style={styles.page}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => this.loggout() }
                >
                    <Text>Deconnexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
    
                    
                >
                    <Text style={styles.text}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ styles.button }
                    onPress= { () => navigation.navigate('Snaps') }
                >
                    <Text style={ styles.text }>SNAPS RECU 📨</Text>
                    
                </TouchableOpacity>
                <Text style={ styles.text }>Welcome {{token}}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        alignItems:"center"
    },
    button:{
        width: 300,
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
    }
})
export default Profile