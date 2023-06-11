import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { TextInput, Divider, useTheme, Button, ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useToggleState from "../hooks/useToggleState";
import service from "../services/categories";
import { IconName, icons } from "../components/Icon";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";

type SearchParams = {
  id: string;
};

export default function Category() {
  const theme = useTheme();
  const router = useRouter();

  const params = useSearchParams<SearchParams>();
  const id = params.id ? parseInt(params.id) : 0;

  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("" as IconName);
  const [color, setColor] = useState("");
  const [loading, toggleLoading] = useToggleState();
  const [saving, toggleSaving] = useToggleState();

  const save = async () => {
    toggleSaving();

    const category = { description, icon, color };

    if (id) {
      await service.update({ id, ...category });
    } else {
      await service.insert(category);
    }

    toggleSaving();

    router.push("/categories");
  };

  const load = async () => {
    const response = await service.get(id!);
    const category = response.data;
    setDescription(category.description);
    setIcon(category.icon);
    setColor(category.color);
  };

  useEffect(() => {
    (async () => {
      toggleLoading();
      if (id) await load();
      toggleLoading();
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{id ? `Atualizar categoria ${description}` : "Cadastrar categoria"}</Text>
        <ActivityIndicator style={styles.loading} animating={loading} color={theme.colors.primary} size="small" />
      </View>
      <View>
        <TextInput
          label="Descrição:"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          disabled={loading}
        />
        <Picker
          style={{ backgroundColor: theme.colors.surfaceVariant }}
          selectedValue={icon}
          onValueChange={setIcon}
          enabled={!loading}
        >
          <Picker.Item label="Ícone:" value={""} enabled={false} />
          {icons.map(({ name, description }) => {
            return <Picker.Item key={name} label={description} value={name} />;
          })}
        </Picker>
        <Divider style={{ borderWidth: 0.2, borderColor: theme.colors.secondary }} bold />
        <View style={{ height: 400, padding: 45 }}>
          <TriangleColorPicker
            color={color}
            onColorChange={(color) => setColor(fromHsv(color))}
            style={styles.picker}
          />
        </View>
        <Button mode="contained" onPress={save} loading={saving} disabled={loading} style={styles.button}>
          Salvar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
  },
  button: {
    borderRadius: 10,
    marginTop: 5,
  },
  picker: {
    flex: 1,
  },
});
