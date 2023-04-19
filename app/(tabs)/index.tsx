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

export default function Notes() {
  const pathname = usePathname();
  const router = useRouter();
  const [refreshing, toggleRefreshing] = useToggleState();
  const [notes, setNotes] = useState<Note[]>([]);
  const [deletingId, setDeletingId] = useState<string>();

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
              backgroundColor: index % 2 === 0 ? "white" : "#ebebeb",
            }}
          >
            <View style={styles.row}>
              <Icon name={note.category.icon} color={note.category.color} size={28} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.title}>{note.title}</Text>
                <Text>{note.text}</Text>
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
  },
  title: {
    fontWeight: "bold",
  },
});
