import { Link, Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import Icon from "../../components/Icon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import storage from "../../storage/auth";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Anotações",
          tabBarIcon: ({ color }) => <Icon name="book" color={color} size={28} />,
          headerRight: () => (
            <View style={styles.buttons}>
              <Add href="/note" />
              <Logout />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }) => <Icon name="palette" color={color} size={28} />,
          headerRight: () => <Add href="/category" />,
        }}
      />
    </Tabs>
  );
}

type AddProps = {
  href: string;
};

const Add = ({ href }: AddProps) => {
  return (
    <Link href={href} style={{ marginRight: 20 }}>
      <Icon name="plus" color={Colors.light.tint} size={28} />
    </Link>
  );
};

const Logout = () => {
  const { setAuth } = useContext(AuthContext);

  const logout = async () => {
    await storage.clear();
    setAuth(null);
  };

  return (
    <TouchableOpacity onPress={logout} style={{ marginRight: 20 }}>
      <Icon name="logout" color={Colors.light.tint} size={28} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
