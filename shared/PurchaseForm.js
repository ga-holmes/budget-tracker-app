import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'

import { globalStyles } from '../styles/globalStyles'
import { Formik } from 'formik'
import { Dropdown, SelectCountry } from 'react-native-element-dropdown'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

import FlatButton from './FlatButton'

import * as yup from 'yup';

// data for dropdown (change later)
const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
    { label: 'Item 9', value: '9' },
];

const purchaseSchema = yup.object({

    name: yup.string() // must be a string
        .required(), // must be more than nothing

    date: yup.date()
        .default(Date())
        .required(),

    amount: yup.number()
        .required()
        .positive(),

    category: yup.string()
        .required()
        .test('is-real-category', 'Must be an existing category', (val) => {
            
            const isReal = false;

            data.forEach(element => {
                if (val == element.label){
                    isReal = True;
                }
            });
            return isReal;
        }) // uncomment if theres any reason to need to check that the category exists

});

// date format for displaying within the form
const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
}

export default function PurchaseForm({ addPurchase }) {

    // NOTE: This date picker only works on android, look into https://github.com/react-native-datetimepicker/datetimepicker for ios code when possible
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <View>
            
            <Formik
                initialValues={{ name: '', date: new Date(), amount: '', category: '' }}
                validationSchema={purchaseSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addPurchase(values);
                    console.log(values);
                }}
            >
                {({handleSubmit, values, setFieldValue, handleChange, handleBlur, touched, errors}) => (
                    <View>
                        <TextInput
                            style={{...globalStyles.input, ...globalStyles.borderStyle}}
                            placeholder='Purchase Name'
                            onChangeText={handleChange('name')}
                            value={values.name}
                            onBlur={handleBlur('name')}
                        />

                        <Text style={globalStyles.errorText}>{touched.name && errors.name}</Text>

                        <View style={{ ...globalStyles.input, ...globalStyles.borderStyle }}>
                            <TouchableOpacity onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: date,
                                    onChange: (event, selectedDate) => {
                                        setDate(selectedDate);
                                        setFieldValue('date', selectedDate);
                                    },
                                    mode: 'date',
                                    display: 'spinner',
                                });
                            }}>
                                <Text>{date.toLocaleDateString("en-US", dateOptions)}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={globalStyles.errorText}>{touched.date && errors.date}</Text>

                        <TextInput
                            style={{ ...globalStyles.input, ...globalStyles.borderStyle }}
                            placeholder='Amount'
                            onChangeText={handleChange('amount')}
                            value={values.amount}
                            keyboardType='numeric'
                            onBlur={handleBlur('amount')}
                        />

                        <Text style={globalStyles.errorText}>{touched.amount && errors.amount}</Text>
                        
                        <View style={{ ...globalStyles.input, ...globalStyles.borderStyle }}>
                            <Dropdown
                                data={data}
                                search
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Category"
                                searchPlaceholder="Search..."
                                value={values.category}
                                onChange={item => {
                                    handleChange('category');
                                }}
                                // onBlur={handleBlur('category')}
                            />
                        </View>

                        <Text style={globalStyles.errorText}>{touched.category && errors.category}</Text>

                        <FlatButton text='add purchase' onPress={handleSubmit} bstyles={globalStyles.input} 
                            tstyles={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}
                        />
                        
                    </View>
                )}
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({})