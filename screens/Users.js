import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Axios from 'axios';


class Users extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            emails: []
        }
    }

    async getUserList () {
        let token = await AsyncStorage.getItem('token');
        let headerjson = {
            "token": token,
        }
        
        Axios.get('http://snapi.epitech.eu:8000/all', {
                headers : headerjson
            })
             .then(res => {
                this.setState({ emails: res.data.data })
            })
             .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getUserList();
    }

    render() {
        return (
            <ScrollView>
                <View style={ styles.container }>
                    { 
                        this.state.emails.map((email,key) => (
                            <View style={ styles.userligne } key={ key }>
                                <Image style={styles.logo} source={ require('../assets/logo.png') } />
                                <Text style={styles.text}>{ email.email }</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 20,
        borderColor: 'dimgrey',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: 'dimgrey',
        textAlign: 'center',
        marginBottom: 20,
    },
    userligne:{
        flex:1,
        flexDirection:"row"
    }
});
export default Users;