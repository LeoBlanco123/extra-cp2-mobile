import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Alert, Image, Button} from 'react-native';
import Estilo from '../../components/Estilo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Carrinho = ({ navigation }) => {
    const [storedPreferences, setStoredPreferences] = useState({});

    useEffect(() => {
        retrievePreference();
    }, []);

    const retrievePreference = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const preferences = await AsyncStorage.multiGet(keys);
            const storedPreferences = preferences.reduce((acc, [key, value]) => {
                if (value === 'chosen') {
                    acc[key] = value;
                }
                return acc;
            }, {});
            setStoredPreferences(storedPreferences);
        } catch (error) {
            console.log('Falha ao recuperar as pizzas no carrinho:', error);
            Alert.alert('Falha ao recuperar as pizzas no carrinho');
        }
    };

    const removePreference = async (pizzaKey) => {
        try {
            await AsyncStorage.removeItem(pizzaKey);
            const updatedPreferences = { ...storedPreferences };
            delete updatedPreferences[pizzaKey];
            setStoredPreferences(updatedPreferences);
            Alert.alert('Pizza removida do carrinho!');
        } catch (error) {
            console.log('Falha ao remover a pizza do carrinho:', error);
            Alert.alert('Falha ao remover a pizza do carrinho');
        }
    };

    function irParaCardapio() {
        navigation.navigate('(Cardapio)')
    }

    return (
        <ScrollView>
            <View style={Estilo.viewSafeAndroid}>
                <SafeAreaView>
                    <View style={Estilo.divPrin}>
                        <Text style={Estilo.h1}>PIZZARIA FIAP</Text>
                        <Image style={Estilo.tamImage} source={require('../../assets/pizza.png')}/>
                    </View>

                    <View>
                        <Text style={Estilo.textPizzaH1}>Carrinho de Pizza</Text>
                    </View>

                    <View>
                        {Object.keys(storedPreferences).length > 0 ? (
                            Object.keys(storedPreferences).map(key => (
                                <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={Estilo.preferenceItem}>{key}</Text>
                                    <Button color = '#df0000' title="Remover" onPress={() => removePreference(key)} />
                                </View>
                            ))
                        ) : (
                            <Text>Nenhuma preferência de pizza selecionada.</Text>
                        )}
                    </View>
                    <View style={Estilo.button}>
                        <Button color = '#ff0000' title='Voltar' onPress={irParaCardapio} />               
                    </View>
                </SafeAreaView>
            </View>
        </ScrollView>
    );
};

export default Carrinho;
