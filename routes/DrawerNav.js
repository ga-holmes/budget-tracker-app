import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Home from '../screens/Home';
import Stats from '../screens/Stats';

import { createDrawerNavigator } from '@react-navigation/drawer';

//create a drawer navigator
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName='Home'
            // set options for all headers for all screens in this navigator
            // screenOptions={{
            //     headerTitle: (props) => <Header />
            // }}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Stats" component={Stats} />

        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})