import React, { useCallback, useState } from "react";
import { LISTING_SAMPLES } from "@/mock/listing_samples";
import { getCategory } from "@/lib/utils/category";
import { formatCurrency } from "@/lib/utils/currency";
import { titleCase } from "@/lib/utils/text";
import { getThumbnailUrl } from "@/lib/utils/url";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { getBoolean, set } from "@/lib/storage/Storage";
import { STORAGE_KEYS } from "@/lib/constants/storage-keys";
import FavoriteIcon from "@/components/FavoriteIcon";

function ItemCard({ item }) {
  const favoriteStorageKey = STORAGE_KEYS.Favorites + item.id.toString();

  const [isFavorite, setIsFavorite] = useState(getBoolean(favoriteStorageKey));

  const router = useRouter();

  const category = getCategory(item.category);

  const onPressFavorite = useCallback(() => {
    set(favoriteStorageKey, !isFavorite);
    setIsFavorite((prevValue) => !prevValue);
  }, [isFavorite]);

  return (
    <TouchableNativeFeedback
      onPress={() =>
        router.push({ pathname: "/details", params: { ...item, ...category } })
      }
    >
      <View style={styles.containerItemCard}>
        {item.imgs && (
          <Image
            style={styles.thumbnailImage}
            source={{ uri: getThumbnailUrl(item.imgs?.[0]) }}
          />
        )}
        <View style={{ marginLeft: 8, flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>{titleCase(category?.en ?? "")}</Text>
            <FavoriteIcon isFavorite={isFavorite} onPress={onPressFavorite} />
          </View>
          <Text style={{ marginVertical: 4, flexWrap: "wrap" }}>
            {item.address}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>{formatCurrency(item.price)}</Text>
            <Text>{`${item.area} m2`}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const MemoizedItemCard = React.memo(ItemCard);

export default function Index() {
  const renderItem = useCallback(
    ({ item }) => <MemoizedItemCard item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={LISTING_SAMPLES}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerItemCard: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    margin: 8,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 20,
    overflow: "hidden",
    position: "relative",
  },
  flatlist: {
    width: "100%",
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
