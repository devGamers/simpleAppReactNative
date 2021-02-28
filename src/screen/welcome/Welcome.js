import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import Style from '../../helpers/Styles'

const Welcome = (props) => {
    const goToLogin = () => {
        props.navigation.navigate("Login")
    }
    const goToRegister = () => {
        props.navigation.navigate("Register")
    }

    return (
        <View style={Style.global}>
            <View style={{ height: '45%' }} >
                <ImageBackground source={require('../../../assets/img/welcome.png')} style={{ width: '100%',height: '100%',}}/>
            </View>
            
            <View style={Style.block}>
                <Image source={require('../../../assets/img/icon.png')} style={Style.logo}/>

                <View style = {Style.titleBlock}>
                    <Text style = {Style.title}> Bienvenue sur Simple App </Text>
                    <Text style = {Style.subTitle}> Application de Gestion de Produits </Text>
                </View>
                <View style = {[Style.buttonBlock, {height : "40%",}]}>
                    <TouchableOpacity style = {[Style.btn, {backgroundColor: '#3cadd5', marginTop : 30,}]} onPress={goToRegister}>
                        <Text style = {[Style.txtBtn, {color : "#fff"}]}> Inscription </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {[Style.btn, {backgroundColor: '#fff', marginTop : 30,}]} onPress={goToLogin}>
                        <Text style = {[Style.txtBtn, {color : "#3cadd5"}]}> Connexion </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})
