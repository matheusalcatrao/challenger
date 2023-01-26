import React from "react";
import { View, Text, Image, HStack, VStack } from "native-base";
import { Rating } from "react-native-ratings";
import { MaterialIcons } from "@expo/vector-icons";

import { ProductType } from "../../types/Product";

export const Products: React.FC<ProductType> = ({
  title = "",
  description = "",
  ratting = 0,
  price = 0,
  filename,
}) => {
  return (
    <View
      bg="teal.700"
      maxWidth="100%"
      marginTop="10"
      padding="5"
      borderRadius="10"
    >
      <HStack>
        {filename.length > 1 ? (
          <Image
            resizeMode="cover"
            source={{
              uri: filename,
            }}
            alt="Picture of a Flower"
            width="55"
            height="70"
          />
        ) : (
          <MaterialIcons name="error" size={50} color="#dc2626" />
        )}
        <VStack
          justifyContent="space-around"
          alignItems="flex-start"
          marginLeft="5"
          maxWidth="70%"
        >
          <Text color="#fff" fontSize={"xl"} numberOfLines={1}>
            {title}
          </Text>
          <Text color="#fff" fontSize={"xs"} maxWidth="80%">
            {description}
          </Text>
          <Rating
            showRating={false}
            startingValue={ratting}
            ratingCount={5}
            imageSize={28}
            tintColor="#0f766e"
            readonly={true}
          />
        </VStack>
        <VStack justifyContent="flex-end">
          <Text color="#fff" fontSize={"md"} bold>
            R$ {price.toFixed(2).toString().replace(".", ",")}
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};
