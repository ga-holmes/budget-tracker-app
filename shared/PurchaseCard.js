import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../styles/globalStyles'

// date options for displaying on the card
const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit'
}

export default function PurchaseCard({ name, amount, date, category, keyNum }) {

  const [baseDate, setBaseDate] = useState("no date");

  // in case date is null
  const checkDate = () => {
    if (date != null) {
      setBaseDate(date.toLocaleDateString("en-US", dateOptions));
    }
  }

  useEffect(() => {
    checkDate();
  })

  return (
    <View style={{...styles.purchaseContainer, ...globalStyles.borderStyle}}>
      <Text style={{ ...styles.purchaseText, fontWeight: 'bold' }}>{name}</Text>
      <Text style={{ ...styles.purchaseText }}>{baseDate}</Text>
      <Text style={{ ...styles.purchaseText }}>${amount}</Text>
      <Text style={{ ...styles.purchaseText }}>{category}</Text>
      <Text style={{ ...styles.purchaseText }}>{keyNum}</Text>
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