import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="email-auth"
        options={{
          headerShown: false,
        }}
      />

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
