import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  isFavorite: boolean;
  onPress?: () => void;
}

function FavoriteIcon({ isFavorite, onPress }: Props) {
  const name = isFavorite ? "favorite" : "favorite-border";
  const color = isFavorite ? "red" : "gray";

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <MaterialIcons name={name} size={24} color={color} />
    </TouchableWithoutFeedback>
  );
}

export default FavoriteIcon;
