import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native'
import Style from '../../helpers/Styles'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <KeyboardAvoidingView style = {Style.global} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ height: '45%' }} >
                <ImageBackground source={require('../../../assets/img/welcome.png')} style={{ width: '100%',height: '100%',}}/>
            </View>
            <View style = {[Style.block, {height: 260, flex: 1, top: '10%', position: 'absolute',  width: '90%',}]}>
                <TextInput style={Style.input}
                    onChangeText={text => setEmail(text)}
                    value={email} placeholder = "E-mail"
                />

                <TextInput style={Style.input} onChangeText={text => setPassword(text)}
                    value={password} 
                    placeholder = "Mot de Passe"
                    secureTextEntry={true} 
                />

                <TouchableOpacity style = {[Style.btn, {backgroundColor: '#3cadd5'}]}>
                    <Text style = {Style.txtBtn}>
                        Connexion
                    </Text>
                </TouchableOpacity>

                <Text style={{ fontFamily: "avenirBook", marginTop: 10, color: 'black' }}>- • -</Text>

                <TouchableOpacity>
                    <Text style = {[Style.text, {color: 'grey'}]}>Mot de passe oublié</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login