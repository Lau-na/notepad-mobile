import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { TextInput, Divider, useTheme, Button, ActivityIndicator } from "react-native-paper";
import { Category } from "../types/category";
import noteService from "../services/notes";
import categoryService from "../services/categories";
import { Picker } from "@react-native-picker/picker";
import useToggleState from "../hooks/useToggleState";

type SearchParams = {
  id: string;
};

export default function Note() {
  const theme = useTheme();
  const router = useRouter();

  const { id } = useSearchParams<SearchParams>();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, toggleLoading] = useToggleState();
  const [saving, toggleSaving] = useToggleState();

  const save = async () => {
    toggleSaving();

    const category = categories.find(({ id }) => id === categoryId);

    if (!category) {
      ToastAndroid.show("Ocorreu um erro ao salvar", ToastAndroid.SHORT);
      return;
    }

    const note = { title, text, category, date: new Date() };

    if (id) {
      await noteService.update({ id, ...note });
    } else {
      await noteService.insert(note);
    }

    toggleSaving();

    router.push("/");
  };

  const load = async () => {
    const response = await noteService.get(id!);
    const note = response.data;
    setTitle(note.title);
    setText(note.text);
    setCategoryId(note.category.id);
  };

  const loadCategories = async () => {
    const response = await categoryService.list();
    setCategories(response.data);
  };

  useEffect(() => {
    (async () => {
      toggleLoading();
      if (id) await load();
      await loadCategories();
      toggleLoading();
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{id ? `Atualizar nota ${title}` : "Cadastrar nota"}</Text>
        <ActivityIndicator style={styles.loading} animating={loading} color={theme.colors.primary} size="small" />
      </View>
      <View>
        <TextInput label="Título:" value={title} onChangeText={setTitle} style={styles.input} disabled={loading} />
        <Picker
          style={{ backgroundColor: theme.colors.surfaceVariant }}
          selectedValue={categoryId}
          onValueChange={setCategoryId}
          enabled={!loading}
        >
          <Picker.Item label="Categoria:" value={0} enabled={false} />
          {categories.map(({ id, description }) => {
            return <Picker.Item key={id} label={description} value={id} />;
          })}
        </Picker>
        <Divider style={{ borderWidth: 0.2, borderColor: theme.colors.secondary }} bold />
        <TextInput
          label="Texto:"
          value={text}
          onChangeText={setText}
          style={styles.input}
          multiline
          numberOfLines={10}
          disabled={loading}
        />
        <Button mode="contained" onPress={save} loading={saving} disabled={loading}>
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
  },
});
