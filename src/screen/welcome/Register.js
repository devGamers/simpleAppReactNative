import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native'
import Style from '../../helpers/Styles'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    
    return (
        <KeyboardAvoidingView style = {Style.global} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ height: '45%' }} >
                <ImageBackground source={require('../../../assets/img/welcome.png')} style={{ width: '100%',height: '100%',}}/>
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

                <TouchableOpacity style = {[Style.btn, {backgroundColor: '#3cadd5'}]}>
                    <Text style = {Style.txtBtn}>
                        S'inscrire
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Register