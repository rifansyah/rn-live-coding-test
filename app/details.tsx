import { titleCase } from "@/utils/text";
import { getImageUrl } from "@/utils/url";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Image, Text, View } from "react-native";

function DetailsPage() {
  const params = useLocalSearchParams();

  const renderItem = useCallback(({ item }) => {
    return (
      <Image
        style={{ height: 300, borderRadius: 16, margin: 8 }}
        source={{ uri: getImageUrl(item) }}
        resizeMode="cover"
      />
    );
  }, []);

  if (!params.imgs) {
    return <View />;
  }

  const imageList = (params.imgs as string).split(",");

  return (
    <>
      <Stack.Screen
        name="details"
        options={{ headerShown: true, title: titleCase(params.en as string) }}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 8 }}
          data={imageList}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

export default DetailsPage;
