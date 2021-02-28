import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

import Loading from './src/component/Loading'
import Style from './src/helpers/Styles'

import Home from './src/screen/Home/Home'

// starter component
import Welcome from './src/screen/welcome/Welcome'
import Login from './src/screen/welcome/Login'
import Register from './src/screen/welcome/Register'

const { Navigator, Screen } = createStackNavigator()

const App = () => {
	const [loading, setLoading] = useState(true)

	const loadRessources = async () => {

        try {
            const result = await new Promise.all([
                Font.loadAsync({
                    'avenirBlack' : require("./assets/font/AvenirLTStd-Black.otf"),
                    'avenirBook': require("./assets/font/AvenirLTStd-Book.otf")
                }),
            ])
            
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

	const AllNavigation = () => {
        return (
            <Navigator initialRouteName="Home">
                <Screen name="Home" component={Home} options={{headerShown: true, title: 'Gestion des produits', headerTitleStyle: {fontFamily: 'avenirBlack', color: '#457ce0'}}} />
            </Navigator>
        )
    }

	return loading ? 
			<Loading/> 
		: 
		<NavigationContainer>
			<Navigator initialRouteName="All">
				<Screen name="All" component={AllNavigation} options={{headerShown: false}}/>
				<Screen name="Starter" component={WelcomeNavigation} options={{headerShown: false}}/>
			</Navigator>
		</NavigationContainer>
}

export default App
