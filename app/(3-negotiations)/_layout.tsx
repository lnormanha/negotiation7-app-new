import { Link, Stack } from "expo-router";

export default function NegotiationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-negotiation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="negotiation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="topic"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="report"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
