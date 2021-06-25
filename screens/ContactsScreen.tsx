import React, {useEffect, useState} from "react";
import { FlatList, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";


import { View } from "../components/Themed";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../src/graphql/queries";

export default function ContactsScreen() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers))

        setUsers(usersData.data.listUsers.items)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

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
