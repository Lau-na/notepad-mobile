import { Link, Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import Icon from "../../components/Icon";

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
          headerRight: () => <Add href="/note" />,
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
