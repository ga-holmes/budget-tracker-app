import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons';

// Component imports
import PurchaseCard from '../shared/PurchaseCard'
import { globalStyles } from '../styles/globalStyles';

export default function Home() {

    const [purchases, setPurchases] = useState([
        {
            name: "quiznos",
            amount: 15.58,
            date: "Sept 26, 2023",
            category: "Eating Out"
        },
        {
            name: "bike lock",
            amount: 30.12,
            date: "Sept 28, 2023",
            category: "Utility"
        },
        {
            name: "presto",
            amount: 50,
            date: "Jan 12, 2024",
            category: "Utility"
        },
    ])

  return (
    <View style={globalStyles.container}>
        <FlatList
            data={purchases}
            renderItem={({ item }) => (
                <TouchableOpacity>
                    <PurchaseCard name={item.name} amount={item.amount} date={item.date} category={item.category}/>
                </TouchableOpacity>
            )}
        />
        
        <TouchableOpacity>
            <MaterialIcons
                name='add'
                size={36}
                style={{...styles.addButton, ...globalStyles.borderStyle}}
            />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    addButton: {
        padding: 3,
        borderRadius: 100,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})