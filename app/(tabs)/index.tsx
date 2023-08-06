import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { Header } from "../../components";

export default function TabOneScreen() {
  return (
    <>
      <View style={styles.container}>
        <Header
          title={"Negotiation"}
          isNegotiation
          onPressLeft={() => {}}
          onPressReport={() => {}}
        />
        <Text style={styles.title}>Tab One</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
