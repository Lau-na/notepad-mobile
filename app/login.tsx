import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { TextInput, useTheme, Button, ActivityIndicator } from "react-native-paper";
import service from "../services/login";
import AuthContext from "../contexts/auth";
import storage from "../storage/auth";
import useToggleState from "../hooks/useToggleState";
import { Image } from "../components/Image";

export default function Login() {
  const theme = useTheme();
  const router = useRouter();

  const { setAuth } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, toggleLoading] = useToggleState();

  useEffect(() => {
    (async () => {
      const auth = await storage.read();
      if (auth) setAuth(auth);
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await service.login({ username, password });
      await storage.store(response.data);
      setAuth(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image name="logo" style={styles.image} />
      <TextInput
        label="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        disabled={loading}
      />
      <TextInput label="Senha" value={password} onChangeText={setPassword} style={styles.input} disabled={loading} />
      <Button mode="contained" onPress={handleSubmit} loading={loading} style={styles.button}>
        Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  loading: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 5,
    width: "100%",
  },
  button: {
    borderRadius: 10,
    marginTop: 5,
    width: "100%",
  },
  picker: {
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    height: 200,
    marginBottom: 20,
  },
});
