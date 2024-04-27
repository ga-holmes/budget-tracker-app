import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'

import { globalStyles } from '../styles/globalStyles'
import { Formik } from 'formik'
import { Dropdown, SelectCountry } from 'react-native-element-dropdown'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

import FlatButton from './FlatButton'

import * as yup from 'yup';

// data for dropdown (change later) (useState doesnt work)
const categories = [
    { label: 'Eating Out', value: 1 },
    { label: 'Entertainment', value: 2 },
    { label: 'Groceries', value: 3 },
    { label: 'Trinkits', value: 4 },
    { label: 'Utility', value: 5 },

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
            
            let isReal = false;

            categories.forEach(element => {
                if (val == element.label){
                    isReal = true;
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
    const [selectedCategory, setSelectedCategory] = useState('')

    return (
        <View style={styles.formContainer}>
            
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
                            style={styles.nameInput}
                            placeholder='Purchase Name'
                            onChangeText={handleChange('name')}
                            value={values.name}
                            onBlur={handleBlur('name')}
                        />

                        <Text style={globalStyles.errorText}>{touched.name && errors.name}</Text>

                        <View style={styles.dateAmtBox}>

                            <TouchableOpacity style={styles.dateInput} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: date,
                                    onChange: (event, selectedDate) => {
                                        setDate(selectedDate);
                                        setFieldValue('date', selectedDate);
                                    },
                                    mode: 'date',
                                    display: 'spinner'
                                });
                            }}>
                                <Text style={styles.dateText}>{date.toLocaleDateString("en-US", dateOptions)}</Text>
                            </TouchableOpacity>
                            
                            <Text style={globalStyles.errorText}>{touched.date && errors.date}</Text>
                        
                            
                            <View>
                                <TextInput
                                    style={styles.amtInput}
                                    placeholder='Amount'
                                    onChangeText={handleChange('amount')}
                                    value={values.amount}
                                    keyboardType='numeric'
                                    onBlur={handleBlur('amount')}
                                />

                                <Text style={globalStyles.errorText}>{touched.amount && errors.amount}</Text>
                            </View>

                        </View>
                        
                        <View style={styles.catInput}>
                            <Dropdown
                                data={categories}
                                search
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Category"
                                searchPlaceholder="Search..."
                                value={selectedCategory}
                                onChange={item => {
                                    setSelectedCategory(item.value);
                                    setFieldValue('category', item.label);
                                }}
                                // onBlur={handleBlur('category')} 'cannot read property persist of undefined'
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

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // padding: 10,
        width: '100%',
    },
    dateInput: {
        ...globalStyles.input,
        ...globalStyles.borderStyle,
        // following two are sort of a hack to center-align the text in the date box
        height: 50,
        padding: 15
        
    },
    amtInput: {
        ...globalStyles.input,
        ...globalStyles.borderStyle,
        overflow: 'scroll',
        width: 170,
        maxWidth: 170,
        height: 50
    },
    nameInput: {
        ...globalStyles.input,
        ...globalStyles.borderStyle,
        maxWidth: '100%',
        overflow: 'scroll'
    },
    catInput: {
        ...globalStyles.input, 
        ...globalStyles.borderStyle,
    },
    dateAmtBox: {
        flexDirection: 'row',
        width: 300,
        maxWidth: 300
    },

})