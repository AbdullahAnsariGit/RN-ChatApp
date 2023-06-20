import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import ChatlistWrapper from '@shared-components/chatlist-wrapper/ChatlistWrapper'
import { themes } from 'assets/theme'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import appStyles from '@screens/appstack/appStyles'
import { SCREENS } from '@shared-constants'
import * as NavigationService from "react-navigation-helpers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { useDispatch } from 'react-redux'
import { todoDelete } from '@services/redux/actions/deleteTodo'
import { deteleToken } from '@services/redux/actions/deleteToken'
import LoadingWrapper from '@shared-components/loading-wrapper/loadingWrapper'

let id = '';
const Chatlist: React.FC = () => {
    const dispatch = useDispatch()
    const [isShow, setIsShow] = React.useState<boolean>(false);

    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        getUsers()
    }, [users])

    const renderItem = ({ item }: any) => {
        return <ChatlistWrapper imgs={item?.imgs} name={item?.name} onPress={() => NavigationService.push(SCREENS.CHATSCREEN, { data: item, id: id })} />
    }
    const logout = () => {
        setIsShow(true)
        dispatch(deteleToken())
        setIsShow(false)
    }
  
    const getUsers = async (): Promise<void> => {
        try {
            const storedUserId = await AsyncStorage.getItem('USERID');
            if (storedUserId) {
                id = JSON.parse(storedUserId).userId;
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

    //more professional way
    // const getUsers = async (): Promise<void> => {
    //     try {
    //         const storedUserId = await AsyncStorage.getItem('USERID');
    //         if (storedUserId) {
    //             const { userId, email }: User = JSON.parse(storedUserId);
    //             const usersSnapshot = await firestore()
    //                 .collection('Users')
    //                 .where('email', '!=', email)
    //                 .get();

    //             const tempData: User[] = usersSnapshot.docs.map((doc) => doc.data());
    //             setUsers(tempData);
    //         }
    //     } catch (error) {
    //         console.log('Error retrieving USERID from AsyncStorage:', error);
    //     }
    // };

    return (
        <>
            <LoadingWrapper show={isShow} name='Spinning Circles Loading Animation' source='https://assets5.lottiefiles.com/private_files/lf30_tcux3hw6.json' author='Abdullah' path={require('./../chatscreen/animation.json')} />
            <View style={styles.container}>
                <View style={styles.placeholder} />
                <Text style={styles.title}>Chat</Text>
                <RNBounceable style={styles.placeholder} onPress={() => logout()}>
                    <Text style={styles?.title2}>Logout</Text>
                </RNBounceable>
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

        </>

    )
}

export default Chatlist

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        // paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoContainer: {
        width: 50,
        height: 50,
    },
    logo: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    title: {
        fontSize: 18,
        fontFamily: themes?.font?.semiBold,
        color: themes?.colors?.black,
    },
    placeholder: {
        width: '20%',
        flexDirection: 'row-reverse',
        paddingLeft: 20
        // backgroundColor:'red'

    },
    title2: {
        fontSize: 14,
        fontFamily: themes?.font?.semiBold,
        color: themes?.colors?.black,
    },

});
