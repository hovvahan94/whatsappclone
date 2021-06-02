import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";

import users from "../data/Users";


import { View } from "../components/Themed";

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
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
  }
});
