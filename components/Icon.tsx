import { Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const icons = [
  { name: "alarm", description: "Alarme" },
  { name: "airplane-engines", description: "Avião" },
  { name: "flag", description: "Bandeira" },
  { name: "bookmark-check", description: "Marcador" },
  { name: "arrow-clockwise", description: "Refazer" },
  { name: "bell", description: "Sino" },
  { name: "briefcase", description: "Mala" },
  { name: "calendar-event", description: "Calendário" },
  { name: "capsule", description: "Capsula" },
  { name: "cart3", description: "Carrinho de supermercado" },
  { name: "cash-coin", description: "Nota de dinheiro" },
  { name: "chat-dots", description: "Balão de conversa" },
  { name: "trash", description: "Lixeira" },
  { name: "book", description: "Livro" },
  { name: "palette", description: "Paleta" },
  { name: "plus", description: "Sinal de adição" },
  { name: "logout", description: "Saida" },
];

type ComponentProps = Omit<IconProps, "name">;

const components = {
  alarm: ({ size, color }: ComponentProps) => <Ionicons name="alarm" size={size} color={color} />,
  "airplane-engines": ({ size, color }: ComponentProps) => <FontAwesome name="plane" size={size} color={color} />,
  flag: ({ size, color }: ComponentProps) => <FontAwesome name="flag" size={size} color={color} />,
  "bookmark-check": ({ size, color }: ComponentProps) => (
    <MaterialCommunityIcons name="bookmark-check" size={size} color={color} />
  ),
  "arrow-clockwise": ({ size, color }: ComponentProps) => <FontAwesome5 name="undo" size={size} color={color} />,
  bell: ({ size, color }: ComponentProps) => <FontAwesome name="bell" size={size} color={color} />,
  briefcase: ({ size, color }: ComponentProps) => <FontAwesome name="briefcase" size={size} color={color} />,
  "calendar-event": ({ size, color }: ComponentProps) => <AntDesign name="calendar" size={size} color={color} />,
  capsule: ({ size, color }: ComponentProps) => <FontAwesome5 name="capsules" size={size} color={color} />,
  cart3: ({ size, color }: ComponentProps) => <Entypo name="shopping-cart" size={size} color={color} />,
  "cash-coin": ({ size, color }: ComponentProps) => (
    <MaterialCommunityIcons name="cash-multiple" size={size} color={color} />
  ),
  "chat-dots": ({ size, color }: ComponentProps) => <Ionicons name="chatbubble-ellipses" size={size} color={color} />,
  trash: ({ size, color }: ComponentProps) => <Octicons name="trash" size={size} color={color} />,
  book: ({ size, color }: ComponentProps) => <FontAwesome name="book" size={size} color={color} />,
  palette: ({ size, color }: ComponentProps) => <FontAwesome5 name="palette" size={size} color={color} />,
  plus: ({ size, color }: ComponentProps) => <FontAwesome5 name="plus" size={size} color={color} />,
  logout: ({ size, color }: ComponentProps) => <MaterialIcons name="logout" size={size} color={color} />,
};

export type IconName = keyof typeof components;

export type IconProps = {
  name: IconName;
  size: number;
  color: string;
};

export default function Icon({ name, size, color }: IconProps) {
  const Component = components[name];
  return <Component size={size} color={color} />;
}
