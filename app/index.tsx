import { LISTING_SAMPLES } from "@/mock/listing_samples";
import { getCategory } from "@/utils/category";
import { formatCurrency } from "@/utils/currency";
import { titleCase } from "@/utils/text";
import { getThumbnailUrl } from "@/utils/url";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

function ItemCard({ item }) {
  const category = getCategory(item.category);

  const router = useRouter();

  return (
    <TouchableNativeFeedback onPress={() => router.push({ pathname: '/details', params: {...item, ...category} })}>
      <View style={styles.containerItemCard}>
        {item.imgs && (
          <Image
            style={styles.thumbnailImage}
            source={{ uri: getThumbnailUrl(item.imgs?.[0]) }}
          />
        )}
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Text>{titleCase(category?.en ?? "")}</Text>
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

export default function Index() {
  const renderItem = useCallback(({ item }) => <ItemCard item={item} />, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
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
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
