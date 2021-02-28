import { StyleSheet, Dimensions, Platform } from 'react-native'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    add: {
        width: 60,
        height: 60,
        backgroundColor: '#457ce0',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: .3,
    },
    addText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'avenirBlack'
    },
    divider: {
        borderColor: '#e6e6f2',
        borderWidth: 1,  
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center'
        //justifyContent: 'space-evenly'
    },
    block: {
        backgroundColor: '#ffffffdb',
        height: Platform.OS === "ios" ? '65%' : '56%', 
        margin: 15,
        top: '-20%',
        elevation: 3,
        shadowRadius: 3,
        shadowOffset: { height: 3 },
        shadowOpacity: 0.3,
        borderRadius: 25,
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    global: {
        flex: 1,
        backgroundColor: '#457ce0', 
    },
    buttonBlock : {
        width : "100%",
        flexDirection : "column",
        justifyContent : "flex-start",
        alignItems : "center", 
    },
    btn : {
        height : 45,
        width : "80%",
        borderRadius : 50,
        textAlign : "center",
        justifyContent : "center", 
        borderWidth : 1,
        borderColor : "#3cadd5",
        marginTop : 10,
    },
    txtBtn : {
        textAlign : "center",
        fontSize : 15,
        fontFamily: 'avenirBook',
        color: 'white'
    },
    input: {
        fontFamily: "avenirBook", 
        height: 50,
        width: "80%",
        color: "#939393",
        backgroundColor: 'white',
        borderColor: '#e6e6f2',
        borderWidth: 1,
        borderRadius: 50,
        padding: 15,
        marginTop: 20,
        marginBottom: 5
    },
    firstColor : {
        color: '#457ce0'
    },
    secondColor: {
        color: '#3cadd5'
    },
    arrow : {
        height : 35,
        width : "15%",
        borderRadius : 50,
        justifyContent: "center", 
        marginTop: 5,
        backgroundColor: '#3cadd5',
        alignItems: 'center'
    },
    bsheader: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 1,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        marginTop: height-230,
        alignItems: 'center',
    },
    panelHandle: {
        width: 70,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 15,
    },
    bottomShettContent: {
        padding: 20,
        backgroundColor: 'white',
    },
    titleBlock : {
        marginTop: 20,
        justifyContent : "center",
        alignItems : "center"
    },
    title : {
        color : "#000",
        fontSize: 20,
        fontFamily: 'avenirBlack'
    },
    subTitle : {
        color : "#000",
        fontSize: 15,
        fontFamily: 'avenirBook',
        marginTop: 20,
    },
    text: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "avenirBook",
        marginTop: 5,
    },
    logo : {
        resizeMode: "center", 
        height: Platform.OS === "ios" ? 200 : 100, 
        width: 200,
        marginTop: 20
    }
})

export default styles