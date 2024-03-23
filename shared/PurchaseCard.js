import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'

export default function PurchaseCard({ name, amount, date, category }) {
  return (
    <View style={{...styles.purchaseContainer, ...globalStyles.borderStyle}}>
      <Text style={{ ...styles.purchaseText, fontWeight: 'bold' }}>{name}</Text>
      <Text style={{ ...styles.purchaseText }}>{date}</Text>
      <Text style={{ ...styles.purchaseText }}>${amount}</Text>
      <Text style={{ ...styles.purchaseText }}>{category}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  purchaseContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  purchaseText: {
    textAlignVertical: 'center',
    flex: 1,
    paddingHorizontal: 4
  }

})