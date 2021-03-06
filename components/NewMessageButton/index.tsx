import React from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const NewMessageButton = () => {
  const navigation = useNavigation();


  const onPressHandler = () => {
      navigation.navigate('Contacts');
  };


  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.container}>
      <View>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={28}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
};

export default NewMessageButton;
