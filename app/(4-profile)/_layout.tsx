import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="about"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
