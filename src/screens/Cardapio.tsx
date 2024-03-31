import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, Button, Alert } from 'react-native';
import Estilo from '../../components/Estilo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation }) => {
    const [storedPreferences, setStoredPreferences] = useState({});

    function irParaCarrinho() {
        navigation.navigate('(Carrinho)');
    }

    const pizzas = [
        {
            name: "Pizza Margarita",
            ingredients: "Mussarela, manjericão, tomate e azeitonas pretas",
            price: "R$ 40,00",
            image: require('../../assets/pizza-margherita.png'),
            key: 'Pizza Margarita + R$ 40,00'
        },
        {
            name: "Pizza Pepperoni",
            ingredients: "Mussarela, pepperoni fatiado, molho de tomate e orégano",
            price: "R$ 45,00",
            image: require('../../assets/pepperoni-pizza.webp'),
            key: 'Pizza Pepperoni + R$ 45,00'
        },
        {
            name: "Pizza Calabresa",
            ingredients: "Mussarela, calabresa fatiada, cebola, molho de tomate e orégano",
            price: "R$ 42,00",
            image: require('../../assets/calabresa.png'),
            key: 'Pizza Calabresa + R$ 42,00'
        },
        {
            name: "Pizza Frango com Catupiry",
            ingredients: "Mussarela, frango desfiado, catupiry, milho, molho de tomate e orégano",
            price: "R$ 48,00",
            image: require('../../assets/pizza_frango.png'),
            key: 'Pizza Frango com Catupiry + R$ 48,00'
        },
        {
            name: "Pizza Quatro Queijos",
            ingredients: "Mussarela, parmesão, provolone, gorgonzola, molho de tomate e orégano",
            price: "R$ 50,00",
            image: require('../../assets/queijo.png'),
            key: 'Pizza Quatro Queijos + R$ 50,00'
        }
    ];

    const storePreference = async (pizzaKey) => {
        try {
            await AsyncStorage.setItem(pizzaKey, 'chosen');
            const updatedPreferences = { ...storedPreferences, [pizzaKey]: 'chosen' };
            setStoredPreferences(updatedPreferences);
            Alert.alert('Pizza adicionada ao carrinho!');
        } catch (error) {
            console.log('Falha ao armazenar a pizza no carrinho:', error);
            Alert.alert('Falha ao armazenar a pizza no carrinho');
        }
    };

    return (
        <ScrollView>
            <View style={Estilo.viewSafeAndroid}>
                <SafeAreaView>
                    <View>
                        <Text style={Estilo.h1}>PIZZARIA FIAP</Text>
                    </View>

                    <View style={Estilo.textPizza}>
                        <Text style={Estilo.textPizzaH1}>Está com fome de Pizza?</Text>
                        <Text style={Estilo.pizzaText}>Pizzas especiais estão esperando por você! Verifique isso agora!</Text>
                    </View>

                    {pizzas.map(pizza => (
                        <View style={Estilo.divPrin} key={pizza.key}>
                            <View>
                                <Image style={Estilo.tamImage} source={pizza.image} />
                            </View>
                            <Text>{pizza.name}</Text>
                            <Text>{pizza.ingredients}</Text>
                            <Text>{pizza.price}</Text>
                        <View style= {Estilo.button}>
                            <Button color = '#df0000'title="Adicionar Pizza ao Carrinho" onPress={() => storePreference(pizza.key)} />
                        </View>
                        </View>
                    ))}
                    
                    <Button color = '#df0000' title="Ir para o carrinho" onPress={irParaCarrinho} />

                </SafeAreaView>
            </View>
        </ScrollView>
    );
};
