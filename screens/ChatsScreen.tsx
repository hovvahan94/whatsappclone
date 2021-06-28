import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/ChatListItem";

import chatRooms from "../data/ChatRooms";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import NewMessageButton from "../components/NewMessageButton";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "./queries"

export default function ChatsScreen() {
const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()

        const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}))

        setChatRooms(userData.data.getUser.chatRoomUser.items)
      } catch (error) {
        console.log(error)
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: "100%",
  },
});
