import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import { Alert, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

import Loading from './src/component/Loading'

import Home from './src/screen/Home/Home'
import Profil from './src/screen/Profil/Profil'
import Welcome from './src/screen/welcome/Welcome'
import Login from './src/screen/welcome/Login'
import Register from './src/screen/welcome/Register'

import timer from './src/helpers/timer'

const { Navigator, Screen } = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

	const loadRessources = async () => {
        try {
            const result = await new Promise.all([
                Font.loadAsync({
                    'avenirBlack' : require("./assets/font/AvenirLTStd-Black.otf"),
                    'avenirBook': require("./assets/font/AvenirLTStd-Book.otf")
                }),
            ])

            const connect = await AsyncStorage.getItem('@user')
            if (connect) {
                setUser(JSON.parse(connect))
            }
            
            setLoading(false);
        } catch (e) {
            Alert.alert( 'Simple App',
                'Erreur de chargement des ressources.',
                [{text: 'Ok'}]
            );
        }
    };

    useEffect(() => {
        loadRessources()
        timer()
    }, []);

	const WelcomeNavigation = () => {
        return (
            <Navigator initialRouteName="Welcome">
                <Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Screen name="Register" component={Register} options={{headerShown: true, title: 'Inscription', headerTitleStyle: {fontFamily: 'avenirBlack', color: '#457ce0'}}} />
                <Screen name="Login" component={Login} options={{headerShown: true, title: 'Connexion', headerTitleStyle: {fontFamily: 'avenirBlack', color: '#457ce0'}}} />
            </Navigator>
        )
    }

    const HomeScreen = () => {    
        return <Navigator>
            <Screen name="Home" component={Home} options={{headerShown: true, title: 'Gestion des produits', headerTitleStyle: {fontFamily: 'avenirBlack', color: '#457ce0'}}}/>
        </Navigator>
    }

    const ProfilScreen = () => {    
        return <Navigator>
            <Screen name="Profil" component={Profil} options={{headerShown: true, title: 'Profil', headerTitleStyle: {fontFamily: 'avenirBlack', color: '#457ce0'}}}/>
        </Navigator>
    }

	const AllNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName, tintColor, type = Platform.OS == 'ios' ? 'ios' : 'md';
                        switch (route.name) {
                            case 'HomeScreen':
                                iconName = type + '-home';
                            break;
                            case 'ProfilScreen':
                                iconName = type + '-person';
                            break;
                        }
                        tintColor = focused ? '#457ce0' : '#727272';
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={25} color={tintColor}  />
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#457ce0',
                    inactiveTintColor: '#000',
                }}
                initialRouteName="HomeScreen"
            >
                <Tab.Screen name ="HomeScreen" component = {HomeScreen}  options={{ tabBarLabel:'Accueil' }} />
                <Tab.Screen name ="ProfilScreen" component = {ProfilScreen}  options={{ tabBarLabel:'Compte' }} />
            </Tab.Navigator>
        )
    }

	return loading ? 
			<Loading/> 
		: 
		<NavigationContainer>
			<Navigator initialRouteName={user ? "All" : "Starter"}>
				<Screen name="All" component={AllNavigation} options={{headerShown: false}}/>
				<Screen name="Starter" component={WelcomeNavigation} options={{headerShown: false}}/>
			</Navigator>
		</NavigationContainer>
}

export default App
