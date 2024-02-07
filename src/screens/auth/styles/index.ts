import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    registerButton: {
        borderRadius: 16,
        padding: 17,
        backgroundColor: '#7F3DFF'
    },

    loginButton: {
        borderRadius: 16,
        padding: 17,
        backgroundColor: '#EEE5FF'
    },

    registerButtonText: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#FCFCFC',
        textAlign: 'center',
    },

    loginButtonText: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#7F3DFF',
        textAlign: 'center',
    },

    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },

    top: {
        flex: 0.85
    },

    bottom: {
        flex: 0.18
    },

    slide: {
        marginTop: 32,
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.95,
    },

    slideTextWrapper: {
        maxWidth: 276,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    slideImage: {
        marginLeft: 'auto',
        marginRight: 'auto',
        objectFit: 'contain',
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
    },

    slideTitle: {
        marginTop: 40,
        fontFamily: 'Inter-Bold',
        fontSize: 32,
        lineHeight: 39,
        textAlign: 'center',
        color: '#212325'
    },

    slideDescription: {
        marginTop: 16,
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#91919F'
    },

    paginationStyle: {
        gap: 8 
    },

    activeDotStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#7F3DFF',
        borderRadius: 100,
    },

    slideDot: {
        width: 8,
        height: 8,
        borderRadius: 100,
        backgroundColor: '#EEE5FF'
    }
});