import React from 'react'
import { View, FlatList, Text } from 'react-native'
import ChatlistWrapper from '@shared-components/chatlist-wrapper/ChatlistWrapper'
import { Profile } from './chat'
import { themes } from 'assets/theme'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import appStyles from '@screens/appstack/appStyles'
import { SCREENS } from '@shared-constants'
import * as NavigationService from "react-navigation-helpers";



const Chatlist: React.FC = () => {

    const renderItem = ({ item }: any) => {
        return <ChatlistWrapper imgs={item?.imgs} onPress={() => handleChat()} />
    }
    const handleChat = () => {
        NavigationService.push(SCREENS.CHATSCREEN)
    }

    return (

        <View >
            <View style={appStyles.header}>
                <Text style={appStyles.headerText1}>Chat</Text>
            </View>
            <View style={appStyles.chatlistContainer}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={Profile}
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

