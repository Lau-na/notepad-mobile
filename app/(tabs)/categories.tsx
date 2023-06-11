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

import { Category } from "../../types/category";
import service from "../../services/categories";
import Icon from "../../components/Icon";
import useToggleState from "../../hooks/useToggleState";
import { usePathname, useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function Categories() {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [refreshing, toggleRefreshing] = useToggleState();
  const [categories, setCategories] = useState<Category[]>([]);
  const [deletingId, setDeletingId] = useState<number>();

  const load = async () => {
    toggleRefreshing();
    const response = await service.list();
    setCategories(response.data);
    toggleRefreshing();
  };

  const remove = async ({ id, description }: Category) => {
    setDeletingId(id);
    await service.delete(id);
    setDeletingId(id);
    await load();
    ToastAndroid.show(`Categoria ${description} removida`, ToastAndroid.SHORT);
  };

  const redirect = async ({ id }: Category) => {
    router.push({ pathname: "category", params: { id } });
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
      data={categories}
      renderItem={({ item: category, index }) => {
        return (
          <TouchableOpacity
            onPress={() => redirect(category)}
            style={{
              ...styles.row,
              ...styles.item,
              backgroundColor: index % 2 === 0 ? theme.colors.background : theme.colors.card,
            }}
          >
            <View style={styles.row}>
              <Icon name={category.icon} color={category.color} size={28} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ ...styles.title, color: theme.colors.text }}>{category.description}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => remove(category)}>
              {deletingId === category.id ? (
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
