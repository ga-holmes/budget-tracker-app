import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useState } from 'react'

import { globalStyles } from '../styles/globalStyles'
import { Formik } from 'formik'
import { Dropdown, SelectCountry } from 'react-native-element-dropdown'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'


export default function PurchaseForm({ addReview }) {


    // NOTE: This date picker only works on android, look into https://github.com/react-native-datetimepicker/datetimepicker for ios code when possible
    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    return (
        <View>
            
            <Formik
                initialValues={{ title: '', date: '', cost: '' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReview(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={{...globalStyles.input, ...globalStyles.borderStyle}}
                            placeholder='Purchase Name'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />

                        <Text>Date</Text>
                        <View style={{ ...globalStyles.input, ...globalStyles.borderStyle }}>
                            <TouchableOpacity onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: date,
                                    onChange: props.handleChange('date'),
                                    mode: 'date',
                                    display: 'spinner',
                                });
                            }}>
                                <Text>{date.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={{ ...globalStyles.input, ...globalStyles.borderStyle }}
                            placeholder='Date'
                            onChangeText={props.handleChange('date')}
                            value={props.values.date}
                            onBlur={props.handleBlur('date')}
                        />

                        <TextInput
                            style={{ ...globalStyles.input, ...globalStyles.borderStyle }}
                            placeholder='Amount'
                            onChangeText={props.handleChange('cost')}
                            value={props.values.cost}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('cost')}
                        />
                        
                    </View>
                )}
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({})