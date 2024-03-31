import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Cardapio from '../screens/Cardapio';
import Cadastro from '../screens/Cadastro';
import Login from '../screens/Login';
import Carrinho from '../screens/Carrinho'; // Importe o componente Carrinho

const {Screen, Navigator} = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Navigator>
            <Screen
                name='(Home)'
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name='(Cardapio)'
                component={Cardapio}
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name='(Cadastro)'
                component={Cadastro}
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name='(Login)'
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name='(Carrinho)'
                component={Carrinho}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>
    )
}
