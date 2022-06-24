import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      token: null
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    this.setState({token: token})
  }


  render(){
    const { navigation } = this.props;
    if (this.state.token != null)
    {
      navigation.navigate('Camera')
    }
    
    return (
      <View style={ styles.container }>
        <Image style={ styles.logo } source={ require('../assets/logo.png') }/>
        <TouchableOpacity
          style={styles.button}
          onPress={ () => navigation.navigate('Login') }
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={ () => navigation.navigate('Register') }
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 120,
      backgroundColor: 'white',
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      margin: 10,
    },
    button: {
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
      borderColor: 'dimgrey',
      borderRadius: 5,
      borderWidth: 1,
      margin: 5,
    },
    text: {
      fontSize: 20,
      color: 'white',
    }
});
export default Home;