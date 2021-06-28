import React, { useState, useEffect } from "react";
import { FlatList, Text, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/49671284_218313739051128_8720514499880157184_n.png";
import InputBox from "../components/InputBox";
import { API, graphqlOperation } from "aws-amplify";
import { messagesByChatRoom } from "../src/graphql/queries";

const ChatRoomScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  

  useEffect(() => {
    const fetchMessages = async () => {
      console.log(route.params.id)
      const messagesData = await API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        })
      );

      console.log(messagesData)


      setMessages(messagesData.data.messagesByChatRoom.items);
    };
    fetchMessages();
  }, []);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={messages}
        inverted
        renderItem={({ item }) => <ChatMessage message={item} />}
      />
      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
