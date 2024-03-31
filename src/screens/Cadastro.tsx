import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, Button, TextInput } from 'react-native';
import Estilo from '../../components/Estilo';

export default ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [botaoHabilitado, setBotaoHabilitado] = useState(false);

    useEffect(() => {
        if (nome.trim() !== '' && email.trim() !== '' && telefone.trim() !== '') {
            setBotaoHabilitado(true);
        } else {
            setBotaoHabilitado(false);
        }
    }, [nome, email, telefone]);

    function irParaCardapio() {
        navigation.navigate('(Cardapio)');
    }

    return (
        <ScrollView>
            <View style={Estilo.viewSafeAndroid}>
                <SafeAreaView>
                    <View>
                        <View style={Estilo.divPrin}>
                            <Text style={Estilo.h1}>PIZZARIA FIAP</Text>
                            <Image style={Estilo.tamImage} source={require('../../assets/pizza.png')} />
                        </View>

                        <Text>Nome:</Text>
                        <TextInput 
                            style = {Estilo.TextInput} 
                            placeholder='Digite seu nome' 
                            value={nome} 
                            onChangeText={text => setNome(text)} />
                        <Text>Email:</Text>
                        <TextInput
                            style = {Estilo.TextInput}
                            placeholder='Digite seu email' 
                            value={email} 
                            onChangeText={text => setEmail(text)} />
                        <Text>Telefone:</Text>
                        <TextInput
                            style = {Estilo.TextInput} 
                            placeholder='Digite seu telefone' 
                            value={telefone} 
                            onChangeText={text => setTelefone(text)} />
                        <View style= {Estilo.button}>
                        <Button title='CADASTRAR' color={'#008000'} onPress={irParaCardapio} disabled={!botaoHabilitado} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </ScrollView>
    );
};
