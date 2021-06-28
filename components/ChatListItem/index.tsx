import moment from "moment";
import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const navigation = useNavigation();
  const { chatRoom } = props;

  const user = chatRoom.chatRoomUsers.items[0].user;

  const onPressHandler = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, username: user.name });
  };

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.lastMessage}>
              {chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
            </Text>
          </View>
        </View>

        <Text>
          {moment(chatRoom.lastMessage && chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
