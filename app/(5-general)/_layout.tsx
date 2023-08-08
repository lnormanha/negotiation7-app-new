import { Stack } from "expo-router";

export default function GeneralLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="terms"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
