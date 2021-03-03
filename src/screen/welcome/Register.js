import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView, Alert } from 'react-native'
import firebase from '../../helpers/firebase'
import Style from '../../helpers/Styles'
import Loading from '../../component/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)

    const register = async () => {
        if (name && email && password && confirm) {
            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (regex.test(email)) {
                if (confirm != password) {
                    Alert.alert( 'Simple App',
                        'Le mot de passe ne correspond pas. Merci',
                        [{text: 'Ok'}]
                    );
                    setConfirm('')
                } else {
                    setLoading(true)
                    await firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            var user = userCredential.user;
                            user.updateProfile({ displayName: name }).then( async () => {
                                let user_info = { uid:user.uid, name, email, password }
                                firebase.database().ref('users/' + user.uid).set({
                                    username: name,
                                    email: email,
                                    uid: user.uid
                                });
                                await AsyncStorage.setItem('@user', JSON.stringify(user_info))
                                setLoading(false)
                                props.navigation.navigate('All')
                            })
                        })
                        .catch((error) => {
                            setLoading(false)
                            var errorCode = error.code;
                            switch (errorCode) {
                                case 'auth/email-already-in-use':
                                    Alert.alert( 'Simple App',
                                        'Utilisateur existant. Merci',
                                        [{text: 'Ok'}]
                                    );
                                    break;
                                case 'auth/weak-password':
                                    Alert.alert( 'Simple App',
                                        '6 caractères minimum. Merci',
                                        [{text: 'Ok'}]
                                    );
                                    break;
                            }
                        });
                }
            } else {
                Alert.alert( 'Simple App',
                    'Email invalide. Merci',
                    [{text: 'Ok'}]
                );
                setEmail('')
            }
        } else {
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
            <View style = {[Style.block, {height: 365, flex: 1, top: '5%', position: 'absolute',  width: '90%',}]}>
                
                <TextInput style={Style.input}
                    onChangeText={text => setName(text)}
                    value={name} placeholder = "Nom & Prénoms"
                />
                
                <TextInput style={Style.input}
                    onChangeText={text => setEmail(text)}
                    value={email} placeholder = "E-mail"
                />

                <TextInput style={Style.input} onChangeText={text => setPassword(text)}
                    value={password} 
                    placeholder = "Mot de Passe"
                    secureTextEntry={true} 
                />

                <TextInput style={Style.input} onChangeText={text => setConfirm(text)}
                    value={confirm} 
                    placeholder = "Comfirmer"
                    secureTextEntry={true} 
                />

                <TouchableOpacity onPress={() => register()}
                    style={[Style.btn, { backgroundColor: '#3cadd5' }]}
                >
                    <Text style = {Style.txtBtn}>
                        S'inscrire
                    </Text>
                </TouchableOpacity>

                 <Text style={{ fontFamily: "avenirBook", marginTop: 10, color: 'red' }}>- • -</Text>

                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Text style = {[Style.text, {color: 'grey'}]}>Vous avez déjà de compte ? Se connecter</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    
}

export default Register