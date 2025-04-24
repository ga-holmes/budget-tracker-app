import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Home from '../screens/Home';

import DrawerNav from './DrawerNav';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// create a stack
const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
        // set options for all headers for all screens in this navigator
        // screenOptions={{
        //     headerTitle: (props) => <Header />
        // }}
        >
            <Stack.Screen name="DrawerHome" component={DrawerNav}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            {/* <Stack.Screen name="ReviewDetails" component={ReviewDetails}
                initialParams={{ title: 'empty review', rating: 0, body: '', key: -1 }}
                options={{
                    title: 'Review',
                }}
            /> */}

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})