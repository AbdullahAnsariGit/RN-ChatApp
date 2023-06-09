import React from 'react'
import { View, FlatList, Text } from 'react-native'
import ChatlistWrapper from '@shared-components/chatlist-wrapper/ChatlistWrapper'
import { themes } from 'assets/theme'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import appStyles from '@screens/appstack/appStyles'
import { SCREENS } from '@shared-constants'
import * as NavigationService from "react-navigation-helpers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';



const Chatlist: React.FC = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        getUsers()
    }, [users])

    const renderItem = ({ item }: any) => {
        return <ChatlistWrapper imgs={item?.imgs} name={item?.name} onPress={() => handleChat()} />
    }
    const handleChat = () => {
        NavigationService.push(SCREENS.CHATSCREEN)
    }
    const getUsers = async (): Promise<void> => {
        try {
            const storedUserId = await AsyncStorage.getItem('USERID');
            if (storedUserId) {
                const userId = JSON.parse(storedUserId).userId;
                const email = JSON.parse(storedUserId).email;
                let tempData: any = [];
                firestore().collection('Users').where('email', '!=', email).get().then((res) => {
                    if (res._docs != []) {
                        res?.docs.map((item) => {
                            tempData.push(item._data)
                        })
                    }
                    setUsers(tempData)
                })

                // Additional logic to fetch users or perform actions with the user ID
            }
        } catch (error) {
            console.log('Error retrieving USERID from AsyncStorage:', error);
        }
    };

    return (

        <View >
            <View style={appStyles.header}>
                <Text style={appStyles.headerText1}>Chat</Text>
            </View>
            <View style={appStyles.chatlistContainer}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={users}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingVertical: responsiveScreenWidth(5),
                        paddingHorizontal: responsiveScreenWidth(6),
                        // Example of a supported padding prop
                        backgroundColor: themes?.colors?.offWhite, // Example of a supported backgroundColor prop
                    }}
                />
            </View>
        </View>

    )
}

export default Chatlist

