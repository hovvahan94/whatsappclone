import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createMessage} from '../../src/graphql/mutations'

const InputBox = (props) => {
  const {chatRoomID} = props;
  const [message, setMessage] = useState();
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser()
  }, [])

  const onMicrophonePress = () => {
      console.warn( `Microphone`)
  }

  const onSendPress = async () => {
    console.warn( `Sending: ${message}`)

    // send the message to the backend

    console.log(message, myUserId, chatRoomID)

    try {
      await API.graphql(graphqlOperation(createMessage, {
        input: {
          content: message,
          userID: myUserId,
          chatRoomID
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const onPressHandler = () => {
      if (!message) {
          onMicrophonePress()
      } else {
          onSendPress()
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          style={styles.textInput}
          multiline
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={24} color="white" />
          ) : (
            <MaterialIcons name="send" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
