import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import ExpenseContextProvider from './store/expenses-ctxt';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();


function ExpensesOverview(){
  return <BottomTab.Navigator screenOptions={({navigation})=>({
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({tintColor})=>(
      <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate("ManageExpense")}} ></IconButton>
    )

  })}>
    <BottomTab.Screen name="RecentExpense" component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => (
        <Ionicons name="hourglass" size={size} color={color}></Ionicons>
      )
    }}></BottomTab.Screen>

    <BottomTab.Screen name="AllExpenses" component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All Expenses',
      tabBarIcon: ({color, size}) => (
        <Ionicons name="calendar" size={size} color={color}></Ionicons>
      )
    }}></BottomTab.Screen>

  </BottomTab.Navigator>
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white'
        }}>
          <Stack.Screen 
            name="ExpensesOverview" 
            component={ExpensesOverview} 
            options={{ headerShown: false}}>
          </Stack.Screen>
          <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{
            presentation: 'modal',
            
          }
          }></Stack.Screen>
        </Stack.Navigator>

      </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}

