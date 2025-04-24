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

    const [modalOpen, setModalOpen] = useState(false);

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

    // run functions on load
    useEffect(() => {
        onLoad();
        console.log(purchases);

    }, []);

    // run on state change for purchases
    useEffect(() => {
        setAverage(getAverage(purchases));
        setWeeklyAvg(getWeeklyAvg(purchases));
    }, [purchases]);


    const addPurchase = async (purchase) => {

        try {
            
            purchase.key = purchases.length > 0 ? purchases[purchases.length-1].key + 1 : 1
            
            const newPurchases = [ ...purchases, purchase];
    
            setPurchases((currentPurchases) => {
                return [...currentPurchases, purchase]
            });
            
            console.log(purchase);
            // console.log(Array.isArray(newPurchases));
    
            await storeData(newPurchases, '@purchases');

            
        } catch (e) {
            console.log(e);
        }
        
        setModalOpen(false);

    }

    const removePurchase = async (key) => {

        const newPurchases = purchases.filter(purchase => purchase.key != key);

        setPurchases(newPurchases);
        // NOTE: because filter is screwy this doesnt save the state properly if storing 'purchases', so i store 'newPurchases' instead which should be identical
        await storeData(newPurchases, '@purchases')

    }

    const [average, setAverage] = useState(0);
    const [weeklyAvg, setWeeklyAvg] = useState(0);

    const getAverage = (purchaseList) => {
        let total = purchaseList.reduce((total, next) => total + parseFloat(next.amount), 0)
        let avg = purchaseList.length > 0 ? (total / purchaseList.length).toFixed(2) : 0

        return avg;
    }

    const getWeeklyAvg = (purchasesList) => {

        let prevMonday = (new Date());
        // find the most recent monday: https://stackoverflow.com/questions/35088088/javascript-for-getting-the-previous-monday & https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);

        const compDate = toComp => (purchase) => {
            return purchase.date >= toComp;
        }
        
        const lastWeek = purchasesList.filter(compDate(prevMonday));

        return getAverage(lastWeek);
    }

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
                <TouchableOpacity onPress={ () => { removePurchase(item.key) }}>
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
        
        {/* Display stats */}
        <View style={{ ...styles.statsContainer, ...globalStyles.borderStyle }}>

            <Text style={styles.statsText}>Overall Avg: ${average}</Text>
            <Text style={styles.statsText}>Weekly Avg: ${weeklyAvg}</Text>    
            
        </View>
        

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
            await storeData(purchases, '@purchases');
            console.log('saved');
        }}>
            <Text>Save AsyncStorage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...globalStyles.input, ...globalStyles.borderStyle }} onPress={async () => {
              addPurchase({
                name: "test",
                amount: (Math.random()*10).toFixed(2),
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
    },
    statsContainer: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5
    },
    statsText: {
        flex: 1,
        margin: 2,
        textAlign: 'center'
    }
})