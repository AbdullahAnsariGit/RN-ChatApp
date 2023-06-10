import React from 'react';
import { View, FlatList, Text, KeyboardAvoidingView, Platform } from 'react-native';
import appStyles from '@screens/appstack/appStyles';
import { SenderchatWrapper } from '@shared-components/senderchat-wrapper/SenderchatWrapper';
import { RecieverchatWrapper } from '@shared-components/recieverchat-wrapper/RecieverchatWrapper';
import FastImage from 'react-native-fast-image';
import { icons } from 'assets/imgs';
import RNBounceable from '@freakycoder/react-native-bounceable';
import * as NavigationService from 'react-navigation-helpers';
import ChatinputWrapper from '@shared-components/chatinput-wrapper/ChatinputWrapper';
import { useRoute } from '@react-navigation/native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface RouteParams {
  id: string;
  data: {
    userId: string;
    name: string;
  };
}

const Chatscreen: React.FC = () => {
  const route = useRoute();
  const [allMessagesList, setAllMessagesList] = React.useState<any>([]);
  const [msgg, setMsg] = React.useState<string>('');

  // Fetch all messages on component mount
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc((route?.params as RouteParams)?.id + (route.params as RouteParams)?.data?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = subscriber.onSnapshot((querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
      const allMessages = querySnapshot.docs.map((item: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
        return { ...item.data(), createdAt: item.data().createdAt };
      });
      setAllMessagesList(allMessages);
    });

    return () => unsubscribe();
  }, []);

  // Helper function to format the time
  const formatTime = (timeString: any) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };
  // Send messages from user1 to user2 and update the message list
  const onSend = React.useCallback((message: string) => {
    const myMsg = {
      messages: message,
      sendBy: (route?.params as RouteParams)?.id,
      sendTo: (route?.params as RouteParams)?.data?.userId,
      createdAt: new Date().toISOString(),
    };

    setAllMessagesList((prevMessages: any) => [myMsg, ...prevMessages]);

    firestore()
      .collection('chats')
      .doc('' + (route?.params as RouteParams)?.id + (route.params as RouteParams)?.data?.userId)
      .collection('messages')
      .add(myMsg);

    firestore()
      .collection('chats')
      .doc('' + (route?.params as RouteParams)?.data?.userId + (route.params as RouteParams)?.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  // Render individual chat components
  const renderItem = ({ item }: any) => {
    if (item.sendBy === (route?.params as RouteParams)?.data?.userId) {
      const formattedTime = formatTime(item.createdAt);
      return <SenderchatWrapper msg={item?.messages} name={(route?.params as RouteParams)?.data?.name} time={formattedTime} />;
    } else if (item.sendTo === (route.params as RouteParams)?.data?.userId) {
      const formattedTime2 = formatTime(item.createdAt);
      return <RecieverchatWrapper msg={item?.messages} time={formattedTime2} />;
    }
    return null;
  };

  // Extract a unique key for each item in the list
  const keyExtractor = (item: any) => item?.id?.toString() || '';

  // Handle back navigation
  const handleBack = () => {
    NavigationService.pop();
  };

  // Reverse the message list to display in descending
  const reversedMessages = [...allMessagesList].reverse();
  console.log("🚀 ~ file: Chatscreen.tsx:89 ~ reversedMessages:", reversedMessages)

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
        <Text style={appStyles.headerText}>{((route?.params as RouteParams)?.data?.name).toUpperCase()}</Text>
        <View style={appStyles.back1} />
      </View>
      <View style={{ paddingHorizontal: 16, flex: 1, }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={reversedMessages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <ChatinputWrapper onChangeText={(msgg) => { setMsg(msgg) }} value={msgg} onPress={() => onSend(msgg)} />
    </KeyboardAvoidingView>
  );
};

export default Chatscreen;
