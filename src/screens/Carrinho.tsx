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
                                <Text key={key} style={Estilo.preferenceItem}>{key}</Text>
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
