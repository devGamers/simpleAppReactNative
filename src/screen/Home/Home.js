import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, Animated, TextInput, Alert } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import { MaterialIcons, Entypo } from '@expo/vector-icons'

import Style from '../../helpers/Styles'

const Home = () => {

    const data = []
    const [produit, setProduit] = useState('')
    const [prix, setPrix] = useState('')
    const [id, setId] = useState('')
    const [action, setAction] = useState(0)

    const getDate = () => {
        for (let i = 1; i <= 20; i++) data.push({ id: i, title: 'Pomme ' + i, prix: 100*i })
    }

    useEffect(() => {
        getDate()
    }, []);

    const scrollY = useRef(new Animated.Value(0)).current
    const bs = React.createRef()

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
        }
    }

    const showBottom = (value) => {
        if (value) {
            setId(value.id)
            setProduit(value.title)
            setPrix(value.prix.toString())
        } else {
            setId('')
            setProduit('')
            setPrix('')
        }
        bs.current.snapTo(0)
    }

    const renderHeader = () => {
        return (
            <View style={Style.bsheader}>
                <View style={Style.panelHandle}></View>
                <MaterialIcons name="close" size={24} color="black" style={{
                    padding: 5, backgroundColor: '#fff', borderRadius: 50,
                    position: 'absolute', right: 10, top: 5, elevation: 3,
                    shadowColor: '#000', shadowOpacity: .3,
                }} onPress={() => bs.current.snapTo(1)} />
            </View>
        )
    }

    const renderContent = () => {
        return <View style={[Style.bottomShettContent]}>
            <TextInput style={Style.input}
                onChangeText={text => setProduit(text)}
                value={produit} placeholder = "Produit"
            />
            <TextInput style={Style.input}
                onChangeText={text => numberText(text)}
                value={prix} placeholder = "Prix" keyboardType='numeric'
            />

            <TouchableOpacity style = {[Style.btn, {backgroundColor: '#3cadd5'}]}>
                <Text style = {Style.txtBtn}>
                    Enregister
                </Text>
            </TouchableOpacity>
        </View>
    }

    return (
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
                        <TouchableOpacity onPress={() => showBottom(item)}
                            style={[Style.inline, {
                            padding: 10, marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 12,
                            shadowColor: '#000', shadowOpacity: .3, shadowRadius: 20,
                            shadowOffset: { width: 0, height: 10 }, elevation: 3,
                            transform: [{scale}], opacity
                        }]}>
                            <Text style={[Style.text, { padding: 10, backgroundColor: '#00000040', borderRadius: 50, marginLeft: 10}]}>
                                {item.id < 9 ? '0' + item.id : item.id}
                            </Text>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[Style.text, {fontFamily: 'avenirBlack', fontSize: 15}]}>{item.title}</Text>
                                <Text style={Style.text}>{item.prix} F</Text>
                            </View>
                        </TouchableOpacity>
                        <Entypo name="trash" size={24} color="red"
                            onPress={() => alert('ok')} 
                            style={{
                                position: 'absolute', right: 10, top: 5,
                                padding: 5, backgroundColor: '#fff', borderRadius: 50,
                                elevation: 3, shadowColor: '#000', shadowOpacity: .3,
                            }}
                        />
                    </Animated.View>
                }}
            />
            <TouchableOpacity style={Style.add} onPress={() => showBottom(false)}>
                <Text style={Style.addText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home
