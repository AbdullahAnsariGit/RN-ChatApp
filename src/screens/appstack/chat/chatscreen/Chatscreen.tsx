import React from 'react';
import { View, FlatList, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import appStyles from '@screens/appstack/appStyles';
import { SenderchatWrapper } from '@shared-components/senderchat-wrapper/SenderchatWrapper';
import { Message } from './Dummydata';
import { RecieverchatWrapper } from '@shared-components/recieverchat-wrapper/RecieverchatWrapper';
import FastImage from 'react-native-fast-image';
import { icons } from 'assets/imgs';
import RNBounceable from '@freakycoder/react-native-bounceable';
import * as NavigationService from 'react-navigation-helpers';
import ChatinputWrapper from '@shared-components/chatinput-wrapper/ChatinputWrapper';

const Chatscreen: React.FC = () => {
  const renderItem = ({ item }: any) => {
    return <SenderchatWrapper msg={item?.msg} />;
  };

  const renderItem1 = ({ item }: any) => {
    return <RecieverchatWrapper msg={item?.msg} />;
  };

  const keyExtractor = (item: any) => item?.id?.toString() || '';
  const keyExtractor1 = (item: any) => {
    const id = item?.id?.toString() || `undefined_${Math.random()}`;
    return `${id}_1`;
  };

  const handleBack = () => {
    NavigationService.pop();
  };

  // Assign unique ids to the items in the Message array
  const messagesWithIds = Message.map((item, index) => ({ ...item, id: index }));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust the offset as needed
    >
      <View style={appStyles.header}>
        <RNBounceable onPress={handleBack} style={{ padding: 4 }}>
          <FastImage source={icons?.Back} style={appStyles.back} />
        </RNBounceable>
        <Text style={appStyles.headerText}>Messages</Text>
        <View style={appStyles.back1} />
      </View>
      <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={messagesWithIds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={messagesWithIds}
          renderItem={renderItem1}
          keyExtractor={keyExtractor1}
        />
      </ScrollView>
      <ChatinputWrapper />
    </KeyboardAvoidingView>
  );
};

export default Chatscreen;
