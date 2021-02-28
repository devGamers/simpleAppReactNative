import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loading = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#457ce0" />
        </View>
    )    
}

export default Loading