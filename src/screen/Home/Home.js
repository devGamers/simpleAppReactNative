import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, Animated, TextInput, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '../../helpers/firebase'

import Style from '../../helpers/Styles'
import Loading from '../../component/Loading'

const Home = (props) => {
    const type = Platform.OS == 'ios' ? 'ios' : 'md';
    const [produit, setProduit] = useState('')
    const [prix, setPrix] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    const bs = useRef(null)
    const scrollY = useRef(new Animated.Value(0)).current

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
            });
        }
    }

    const saveData = () => {
        if (produit && prix) {
            let existe = data.filter(item => item.libelle == produit)
            if (existe.length > 0) {
                Alert.alert( 'Simple App',
                    'Ce produit existe déjà. Merci',
                    [{text: 'Ok'}]
                );
            } else {
                bs.current.snapTo(1)
                let id = Math.floor(Date.now() / 1000),
                    ref = firebase.database().ref('produits/' + user.uid),
                    newProduit = ref.push();
                newProduit.set({
                    id,
                    libelle: produit,
                    prix,
                    ref: newProduit.key
                }).then((data) => {
                    setProduit('')
                    setPrix('')
                }).catch((error)=>{
                    Alert.alert('Simple App',
                        "Vérifier votre connexion.",
                        [{ text: 'Ok' }]
                    );
                })
            }
        } else {
            Alert.alert( 'Simple App',
                'Entrer toutes les informations. Merci',
                [{text: 'Ok'}]
            );
        }
    }

    const delData = ref => {
        firebase.database().ref('produits/' + user.uid + '/' + ref).remove()
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getData()
    }, [user])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={[Style.circle, Style.ombre, { backgroundColor: '#457ce0', marginRight: 10 }]}>
                    <Ionicons name={type + "-add"} size={25} color="white" onPress={() => bs.current.snapTo(0)} />
                </View>
            ),
        });
    }, [props.navigation]);

    
    const numberText = (text) => {
        let numreg = /^[0-9]+$/;
        if (text) {
            if (numreg.test(text)) {
                setPrix(text)
            } else {
                Alert.alert('Simple App',
                    'Entrer une valeur numérique.',
                    [{ text: 'Ok' }]
                );
            }
        } else {
            setPrix('')
        }
    }

    const renderHeader = () => {
        return (
            <View style={Style.bsheader}>
                <View style={Style.panelHandle}></View>
                <View style={[Style.circle, Style.ombre, { backgroundColor: '#fff', padding: 5, position: 'absolute', right: 10, top: 5, }]}>
                    <MaterialIcons name="close" size={24} color="black" onPress={() => bs.current.snapTo(1)} />
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return <KeyboardAvoidingView style = {Style.bottomShettContent} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TextInput style={Style.input}
                onChangeText={text => setProduit(text)}
                value={produit} placeholder = "Produit"
            />
            <TextInput style={Style.input}
                onChangeText={text => numberText(text)}
                value={prix} placeholder = "Prix" keyboardType='numeric'
            />

            <TouchableOpacity style={[Style.btn, { backgroundColor: '#3cadd5' }]}
                onPress = {() => saveData()}
            >
                <Text style = {Style.txtBtn}>
                    Enregister
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    }

    return loading ? <Loading/> : (
        <View style={Style.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[730, 0]}
                renderContent={renderContent}
                renderHeader={renderHeader}
                initialSnap={1}
                enabledGestureInteraction={true}
                enabledHeaderGestureInteraction={false}
                enabledContentGestureInteraction={true}
                enabledContentTapInteraction = {false}
            />
            <Image 
                source={require('../../../assets/img/back.png')}
                style={[StyleSheet.absoluteFillObject, {width: '100%', height: '100%'}]}
                resizeMode='center'
                blurRadius={10}
            /> 
            <Animated.FlatList 
                data={data}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ 
                    padding: 10
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {useNativeDriver: true}
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [-1, 0, 70 * index, 70 * (index + 2)] 
                    let id = index+1
                    const opacityInputRange = [-1, 0, 70 * index, 70 * (index + .3)]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange : [1, 1, 1, 0]
                    })

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange : [1, 1, 1, 0]
                    })

                    return <Animated.View>
                        <TouchableOpacity 
                            style={[Style.inline, Style.rectangle, { transform: [{ scale }], opacity }]}>
                            <View style={Style.circle}>
                                <Text style={[Style.text]}>
                                    {id <= 9 ? '0' + id : id}
                                </Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[Style.text, {fontFamily: 'avenirBlack', fontSize: 15}]}>{item.libelle}</Text>
                                <Text style={[Style.text, {marginTop : 5}]}>{item.prix} F</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[Style.circle, Style.ombre, {position: 'absolute', right: 10, top: 5, backgroundColor: '#fff',}]}>
                            <Entypo name="trash" size={24} color="red"
                                onPress={() => delData(item.ref)}
                            />
                        </View>
                    </Animated.View>
                }}
            />
        </View>
    )
}

export default Home
