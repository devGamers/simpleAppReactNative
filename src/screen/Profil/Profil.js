import React, {useState, useEffect, useLayoutEffect} from 'react'
import { Text, View, Platform, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '../../helpers/firebase'

import Style from '../../helpers/Styles'
import Loading from '../../component/Loading'

const Profil = (props) => {
    const type = Platform.OS == 'ios' ? 'ios' : 'md'

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    const [data, setData] = useState([])

    const getUser = async () => {
        const connect = await AsyncStorage.getItem('@user')
        if (connect) {
            setUser(JSON.parse(connect))
        }
    }

    const getData = async () => {
        let result = []
        if (user) {
            await firebase.database().ref('produits/' + user.uid).on('value', (snapshot) => {
                if (snapshot.val() != null) {
                    result = Object.values(snapshot.val()).sort((a, b) => a.id < b.id)
                }
                setData(result)
                setLoading(false)
            })
        }
    }
    
    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getData()
    }, [user]);

    const logout = async () => {
        setLoading(true)
        await firebase.auth().signOut()
        await AsyncStorage.clear()
        props.navigation.navigate('Starter')
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={[Style.circle, Style.ombre, { backgroundColor: '#fff', marginRight: 10 }]}>
                    <Ionicons name={type + "-log-out"} size={25} color="red" onPress={() => logout()} />
                </View>
            ),
        });
    }, [props.navigation]);
    
    return loading ? <Loading/> :
        <View style={Style.container}>
            <Image 
                source={require('../../../assets/img/back.png')}
                style={[StyleSheet.absoluteFillObject, {width: '100%', height: '100%'}]}
                resizeMode='center'
                blurRadius={10}
            /> 
            <View style={[Style.inline, Style.rectangle, { margin: 10 }]}>
                <View style={[Style.circle, Style.ombre, {backgroundColor: '#fff'}]}>
                    <Ionicons name={type + "-person"} size={24} color="#3cadd5"/>
                </View>
                
                <View style={{ marginLeft: 15 }}>
                    <Text style={Style.text}>Nom et Prénoms</Text>
                    <Text style={[Style.text, {fontFamily: 'avenirBlack', fontSize: 15}]}>{user.name}</Text>
                </View>
            </View> 
            <View style={[Style.inline, Style.rectangle, { margin: 10 }]}>
                <View style={[Style.circle, Style.ombre, {backgroundColor: '#fff'}]}>
                    <Ionicons name={type + "-mail"} size={24} color="#3cadd5"/>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={Style.text}>Email</Text>
                    <Text style={[Style.text, {fontFamily: 'avenirBlack', fontSize: 15}]}>{user.email}</Text>
                </View>
            </View>
            <View style={[Style.inline, Style.rectangle, { margin: 10 }]}>
                <View style={[Style.circle, Style.ombre, {backgroundColor: '#fff'}]}>
                    <Ionicons name={type + "-cart"} size={24} color="#3cadd5"/>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={Style.text}>Nombre de Produits</Text>
                    <Text style={[Style.text, { fontFamily: 'avenirBlack', fontSize: 15 }]}>
                        {data.length <= 9 ? '0' + data.length : data.length}
                    </Text>
                </View>
            </View>
        </View>
    
}

export default Profil
