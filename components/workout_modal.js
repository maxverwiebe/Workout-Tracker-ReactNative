import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';

const WorkoutModal = ({ workout_name, set_index }) => {
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');

    function handleSave() {
        const { dataArray, updateArray } = useContext(MyContext);
        dataArray[workout_name][set_index] = {repetitions: repetitions, weight: weight}
        updateArray(dataArray)
    }

    return (
        <Modal
            visible={isModalVisible[index]}
            animationType="slide"
            transparent={true}
            onRequestClose={() => toggleModal(index)}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Gewicht und Wiederholungen</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Gewicht (kg)"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Wiederholungen"
                        value={repetitions}
                        onChangeText={setRepetitions}
                        keyboardType="numeric"
                    />
                        <Button title="Speichern" onPress={() => handleSave(weight, repetitions)} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
});

export default WorkoutModal;
