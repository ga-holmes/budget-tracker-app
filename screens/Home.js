import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native'
import React from 'react'

import { useState } from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

// Component imports
import PurchaseCard from '../shared/PurchaseCard'
import { globalStyles } from '../styles/globalStyles';
import PurchaseForm from '../shared/PurchaseForm';

export default function Home() {

    const [purchases, setPurchases] = useState([
        {
            name: "quiznos",
            amount: 15.58,
            date: "Sept 26, 2023",
            category: "Eating Out",
            key: 1
        },
        {
            name: "bike lock",
            amount: 30.12,
            date: "Sept 28, 2023",
            category: "Utility",
            key: 2
        },
        {
            name: "presto",
            amount: 50,
            date: "Jan 12, 2024",
            category: "Utility",
            key: 3
        },
    ]);

    const addPurchase = (purchase) => {

        purchase.key = Math.random().toString();

        setPurchases((currentPurchases) => {
            return [...currentReviews, purchase]
        });

        setModalOpen(false);

    }

    const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={globalStyles.container}>

        <Modal isVisible={modalOpen}>
            <View style={globalStyles.modalContainer}>
                <MaterialIcons
                    name='close'
                    size={36}
                    // ... 'destructures' the object
                    style={{ ...styles.addButton, ...globalStyles.borderStyle }}
                    onPress={() => setModalOpen(false)}
                />
                <PurchaseForm/>
            </View>
        </Modal>

        <FlatList
            data={purchases}
            renderItem={({ item }) => (
                <TouchableOpacity>
                    <PurchaseCard name={item.name} amount={item.amount} date={item.date} category={item.category}/>
                </TouchableOpacity>
            )}
        />
        
        <TouchableOpacity onPress={() => setModalOpen(true)}>
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