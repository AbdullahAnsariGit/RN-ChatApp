import React, { useRef, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
import appStyles from '@screens/appstack/appStyles';
import FastImage from 'react-native-fast-image';
import { icons } from 'assets/imgs';
import RNBounceable from '@freakycoder/react-native-bounceable';
import * as NavigationService from 'react-navigation-helpers';
import { useRoute } from '@react-navigation/native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { themes } from 'assets/theme';

interface RouteParams {
  id: string;
  data: {
    userId: string;
    name: string;
  };
}

const Chatscreen: React.FC = () => {
  const route = useRoute();
  console.log("🚀 ~ file: Chatscreen.tsx:23 ~ route:", route)
  const giftedChatRef = useRef<any>(null);

  const [messages, setMessages] = React.useState<IMessage[]>([]);
  console.log("🚀 ~ file: Chatscreen.tsx:27 ~ messages:", messages)

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc((route?.params as RouteParams)?.id + (route.params as RouteParams)?.data?.userId)
      .collection('messages')
      .onSnapshot((querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        const allMessages = querySnapshot.docs.map((item: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
          const message = item.data();
          return {
            _id: item.id,
            text: message.messages,
            user: {
              _id: message.sendBy === (route?.params as RouteParams)?.id ? 1 : 2,
              name: message.sendBy === (route?.params as RouteParams)?.id ? 'You' : (route?.params as RouteParams)?.data?.name,
            },
          };
        });

        // Reverse the order of the messages array
        const reversedMessages = allMessages.reverse();

        setMessages(reversedMessages);
      });

    return () => subscriber();
  }, []);


  const onSend = React.useCallback((newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    const firestoreMessages = newMessages.map((message) => {
      return {
        messages: message.text,
        sendBy: (route?.params as RouteParams)?.id,
        sendTo: (route?.params as RouteParams)?.data?.userId,
      };
    });

    sendToFirestore(firestoreMessages);

    // Scroll to the bottom of the chat view
    // giftedChatRef.current?.scrollToBottom();
  }, []);

  const sendToFirestore = (newMessages: any[]) => {
    try {
      newMessages.forEach((message) => {
        firestore()
          .collection('chats')
          .doc('' + (route?.params as RouteParams)?.id + (route.params as RouteParams)?.data?.userId)
          .collection('messages')
          .add(message);

        firestore()
          .collection('chats')
          .doc('' + (route?.params as RouteParams)?.data?.userId + (route.params as RouteParams)?.id)
          .collection('messages')
          .add(message);
      });
    } catch (err) {
      console.log("🚀 ~ file: Chatscreen.tsx:83 ~ sendToFirestore ~ err:", err)
    }
  };
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: themes?.colors.lightBlue,
          },
          right: {
            backgroundColor: themes?.colors.lightPink,
          },
        }}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };
  const handleBack = () => {
    NavigationService.pop();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={appStyles.header}>
          <RNBounceable onPress={handleBack} style={{ padding: 4 }}>
            <FastImage source={icons?.Back} style={appStyles.back} />
          </RNBounceable>
          <Text style={appStyles.headerText}>{((route?.params as RouteParams)?.data?.name).toUpperCase()}</Text>
          <View style={appStyles.back1} />
        </View>
        <GiftedChat
          renderBubble={renderBubble}
          ref={giftedChatRef}
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
        />

      </KeyboardAvoidingView>
    </>
  );
};

export default Chatscreen;
