import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 20,
        marginHorizontal: 10
    },
    borderStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
    modalContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    input: {
        borderRadius: 6,
        padding: 10,
        margin: 10
    },
    errorText: {
        fontStyle: 'italic',
        textAlign: 'center',
        color: "#df6666"
    }

})