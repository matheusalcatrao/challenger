import React, { useContext } from "react";
import { View, Text, Image, HStack, VStack } from "native-base";
import { Rating } from "react-native-ratings";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContext } from "@react-navigation/native";

import { ProductType } from "../../types/Product";
import { TouchableOpacity } from "react-native";

export const Products: React.FC<ProductType> = ({
  id,
  title = "",
  description = "",
  ratting = 0,
  price = 0,
  filename,
  type,
}) => {
  const navigation = useContext(NavigationContext);

  const handlePress = () => {
    const product = {
      id,
      title,
      description,
      ratting,
      price,
      filename,
      type,
    };

    navigation?.navigate("EditProduct", product);
  };

  return (
    <View
      bg="teal.700"
      marginTop="10"
      paddingY={5}
      paddingX={5}
      borderRadius="10"
    >
      <TouchableOpacity onPress={handlePress}>
        <HStack>
          {filename ? (
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
            <Text color="#fff" fontSize={"xs"} maxWidth="70%">
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
          <VStack justifyContent="flex-end" marginLeft={15}>
            <Text color="#fff" fontSize={"md"} bold>
              R$ {price.toFixed(2).toString().replace(".", ",")}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
