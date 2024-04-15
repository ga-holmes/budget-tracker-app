import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { globalStyles } from '../styles/globalStyles'

export default function FlatButton({ text, onPress, bstyles, tstyles }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{...styles.button, ...bstyles, ...globalStyles.borderStyle}}>
                <Text style={{...styles.buttonText, ...tstyles}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center'
    }

})