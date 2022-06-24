
import * as React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,

    Image
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }) {

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    const data = { email: email, password: password }

    const  emailInputHandler = email => {
        setEmail(email);
    }

    const passwordInputHandler = password => {
        setPassword(password);
    }

    const loginHandler = (email, password, {navigation}) => {
        Axios.post('http://snapi.epitech.eu:8000/connection', data)
             .then((response) => {
                AsyncStorage.setItem('token',response.data.data.token)
                navigation.goBack();
                navigation.push('Camera')
                console.log(data)
            })
             .catch((error) => {
                alert('Wrong email or password', error);
            });
    }

    return (
        <View style={ styles.login }>
            <Image style={ styles.logo } source={ require('../assets/logo.png') } />
            <Text style={ styles.text }>E-mail address</Text>
            <TextInput 
                style={ styles.input } 
                placeholder={ 'Enter e-mail address' }
                name="email"
                onChangeText={ emailInputHandler }
                value={ email }
            />
            <Text style={ styles.text }>Password</Text>
            <TextInput
                style={ styles.input }
                placeholder={ 'Enter password' }
                secureTextEntry={ true }
                name="password"
                onChangeText={ passwordInputHandler }
                value={ password }
            />
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => loginHandler(email, password, { navigation }) }
            >
                <Text style={ styles.text }>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
    input: {
        margin: 15,
        width: 300,
        height: 40,
        fontSize: 20,
        borderColor: 'dimgrey',
        textAlign:'center',
        color: 'dimgrey',
        borderWidth: 1
    },
    button: {
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
    }
});