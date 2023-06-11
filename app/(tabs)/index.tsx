import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import { Note } from "../../types/note";
import service from "../../services/notes";
import Icon from "../../components/Icon";
import useToggleState from "../../hooks/useToggleState";
import { usePathname, useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function Notes() {
  const pathname = usePathname();
  const router = useRouter();
  const [refreshing, toggleRefreshing] = useToggleState();
  const [notes, setNotes] = useState<Note[]>([]);
  const [deletingId, setDeletingId] = useState<number>(0);

  const theme = useTheme();

  const load = async () => {
    toggleRefreshing();
    const response = await service.list();
    setNotes(response.data);
    toggleRefreshing();
  };

  const remove = async ({ id, title }: Note) => {
    setDeletingId(id);
    await service.delete(id);
    setDeletingId(id);
    await load();
    ToastAndroid.show(`Anotação ${title} removida`, ToastAndroid.SHORT);
  };

  const redirect = async ({ id }: Note) => {
    router.push({ pathname: "note", params: { id } });
  };

  useEffect(() => {
    load();
  }, [pathname]);

  const handleRefresh = async () => {
    await load();
    ToastAndroid.show("Lista atualizada", ToastAndroid.SHORT);
  };

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      style={styles.list}
      data={notes}
      renderItem={({ item: note, index }) => {
        return (
          <TouchableOpacity
            onPress={() => redirect(note)}
            style={{
              ...styles.row,
              ...styles.item,
              backgroundColor: index % 2 === 0 ? theme.colors.background : theme.colors.card,
            }}
          >
            <View style={styles.row}>
              <Icon name={note.category!.icon} color={note.category!.color} size={28} />
              <View style={{ marginHorizontal: 10, flexShrink: 1 }}>
                <Text style={{ ...styles.title, color: theme.colors.text }}>{note.title}</Text>
                <Text style={{ color: theme.colors.text }}>{note.text}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => remove(note)}>
              {deletingId === note.id ? (
                <ActivityIndicator size={28} color="#ff7575" />
              ) : (
                <Icon name="trash" size={28} color="#ff7575" />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  item: {
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 1,
  },
  title: {
    fontWeight: "bold",
  },
});
