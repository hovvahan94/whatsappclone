import React from "react";
import { FlatList, Text, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import chatRoomData from "../data/Chats";
import ChatMessage from "../components/ChatMessage";
import BG from '../assets/images/49671284_218313739051128_8720514499880157184_n.png'
import InputBox from "../components/InputBox";

const ChatRoomScreen = () => {
  const route = useRoute();

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <FlatList
        data={chatRoomData.messages}
        inverted
        renderItem={({ item }) => <ChatMessage message={item} />}
      />
      <InputBox/>
    </ImageBackground>
  );
};

export default ChatRoomScreen;
