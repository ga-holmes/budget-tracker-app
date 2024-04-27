import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useEffect } from 'react'

import { useState } from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

// Component imports
import PurchaseCard from '../shared/PurchaseCard'
import { globalStyles } from '../styles/globalStyles';
import PurchaseForm from '../shared/PurchaseForm';

import AsyncStorage from '@react-native-async-storage/async-storage';

// date options for displaying on the card
const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
}

export default function Home() {

    const [purchases, setPurchases] = useState([
        // {
        //     name: "quiznos",
        //     amount: 15.58,
        //     date: new Date(),
        //     category: "Eating Out",
        //     key: 1
        // },
        // {
        //     name: "bike lock",
        //     amount: 30.12,
        //     date: new Date(),
        //     category: "Utility",
        //     key: 2
        // },
        // {
        //     name: "presto",
        //     amount: 50,
        //     date: new Date(),
        //     category: "Utility",
        //     key: 3
        // },
    ]);

    const storeData = async (value, storageKey) => {
        try {            
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(storageKey, jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    // get data
    const getData = async (storageKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageKey);
            // ternary operator
            return jsonValue != null ? JSON.parse(jsonValue) : [];
            
        } catch (e) {
            console.log(e);
        }
    }

    // defines what happens when the app loads
    const onLoad = async () => {

        const toSet = await getData('@purchases')

        setPurchases(toSet);
    }

    // run functions
    useEffect(() => {
        onLoad();
        console.log(purchases);
    }, [])


    const addPurchase = async (purchase) => {

        purchase.key = Math.random().toString();

        const newPurchases = [ ...purchases, purchase];

        setPurchases((currentPurchases) => {
            return [...currentPurchases, purchase]
        });

        console.log(newPurchases);

        await storeData(newPurchases, '@purchases');

        setModalOpen(false);

    }

    const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={globalStyles.container}>

        <Modal isVisible={modalOpen}>
            <View style={globalStyles.modalContainer}>
                <MaterialIcons
                    name='close'
                    size={28}
                    // ... 'destructures' the object
                    style={styles.addButton}
                    onPress={() => setModalOpen(false)}
                />
                <PurchaseForm addPurchase={addPurchase}/>
            </View>
        </Modal>

        <FlatList
            data={purchases}
            style={{ borderBottomColor: "#aaa", borderBottomWidth: 2 }}
            renderItem={({ item }) => (
                <TouchableOpacity>
                    <PurchaseCard name={item.name} amount={item.amount} date={new Date(item.date)} category={item.category} keyNum={item.key}/>
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

        <TouchableOpacity style={{ ...globalStyles.input, ...globalStyles.borderStyle }} onPress={async () => {
            try {
                await AsyncStorage.clear();
            } catch (e) {
                console.log(e);
            }
            console.log('cleared');
            console.log(await getData('@purchases'));
            setPurchases([]);
        }}>
            <Text>Clear AsyncStorage</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ ...globalStyles.input, ...globalStyles.borderStyle }} onPress={async () => {
            console.log(await getData('@purchases'));
        }}>
            <Text>Log AsyncStorage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...globalStyles.input, ...globalStyles.borderStyle }} onPress={async () => {
              addPurchase({
                name: "test",
                amount: 1,
                date: new Date(),
                category: "Utility"
            })
        }}>
            <Text>Add Basic Example</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    addButton: {
        ...globalStyles.borderStyle,
        padding: 3,
        borderRadius: 100,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})