import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView, Alert } from 'react-native'
import Style from '../../helpers/Styles'
import Loading from '../../component/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '../../helpers/firebase'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const login = async () => {
        if (email && password) {
            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (regex.test(email)) {
                setLoading(true)
                await firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(async (userCredential) => {
                        var user = userCredential.user
                        let user_info = { uid: user.uid, name: user.displayName, email, password }
                        await AsyncStorage.setItem('@user', JSON.stringify(user_info))
                        setLoading(false)
                        props.navigation.navigate('All')
                    })
                    .catch((error) => {
                        setLoading(false)
                        Alert.alert( 'Simple App',
                            'Authentification échouée. Merci',
                            [{text: 'Ok'}]
                        );
                    });
            } else {
                Alert.alert( 'Simple App',
                    'Email invalide. Merci',
                    [{text: 'Ok'}]
                );
                setEmail('')
            }
        }else{
            Alert.alert( 'Simple App',
                'Entrer toutes les informations. Merci',
                [{text: 'Ok'}]
            );
        }
    }
    
    return loading ? <Loading/> :
        <KeyboardAvoidingView style = {Style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ height: '100%' }} >
                <ImageBackground source={require('../../../assets/img/welcome.png')}
                    style={{ width: '100%', height: '100%', }}
                    blurRadius={5} 
                    resizeMode="center"    
                />
            </View>
            <View style = {[Style.block, {height: 230, flex: 1, top: '10%', position: 'absolute',  width: '90%',}]}>
                <TextInput style={Style.input}
                    onChangeText={text => setEmail(text)}
                    value={email} placeholder = "E-mail"
                />

                <TextInput style={Style.input} onChangeText={text => setPassword(text)}
                    value={password} 
                    placeholder = "Mot de Passe"
                    secureTextEntry={true} 
                />

                <TouchableOpacity onPress={() => login()}
                    style={[Style.btn, { backgroundColor: '#3cadd5' }]}
                >
                    <Text style = {Style.txtBtn}>
                        Connexion
                    </Text>
                </TouchableOpacity>

                <Text style={{ fontFamily: "avenirBook", marginTop: 10, color: 'red' }}>- • -</Text>

                <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                    <Text style = {[Style.text, {color: 'grey'}]}>Vous n'avez pas de compte ? S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
}

export default Login