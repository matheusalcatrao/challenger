import React, { useContext, useEffect, useState } from "react";
import {
  Center,
  Image,
  Text,
  Input,
  Button,
  ScrollView,
  VStack,
  useToast,
} from "native-base";
import { NavigationContext } from "@react-navigation/native";
import { ProductType } from "../../types/Product";
import { doc, updateDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

interface UpdateProductType {
  route: { params: ProductType };
}

export const EditProduct: React.FC<UpdateProductType> = ({ route }) => {
  const navigate = useContext(NavigationContext);
  const toast = useToast();
  const [inputName, setInputName] = useState<string>("");
  const [inputPrice, setInputPrice] = useState<string>("");
  const [inputType, setInputType] = useState<string>("");

  useEffect(() => {
    if (!route) {
      navigate?.goBack();
      return;
    }
    const { title } = route?.params;
    navigate?.setOptions({ title });
  });

  const handleUpdateProductFireBase = async () => {
    try {
      const { id, title, price, type } = route?.params;
      const firestore = getFirestore(app);
      const productRef = doc(firestore, "Product", id);
      await updateDoc(productRef, {
        title: inputName || title,
        price: Number(inputPrice) || price,
        type: inputType || type,
      });
      toast.show({
        description: "Produto atualizado com sucesso",
      });
      navigate?.goBack();
    } catch (error) {
      toast.show({
        description: "Ocorreu algum erro, tente novamente mais tarde!",
      });
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const { id } = route?.params;

      const firestore = getFirestore(app);
      await deleteDoc(doc(firestore, "Product", id));
      toast.show({
        description: "Produto deletado",
      });
      navigate?.goBack();
    } catch (error) {
      toast.show({
        description: "Ocorreu algum erro, tente novamente mais tarde!",
      });
    }
  };

  const { filename, title, price, type } = route?.params;
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bgColor="blueGray.800" px={15}>
        <Center my={50}>
          {filename ? (
            <Image
              source={{ uri: filename }}
              width={100}
              height={100}
              marginTop={5}
              borderRadius={40}
              resizeMode="cover"
              alt="profile"
            />
          ) : (
            <MaterialIcons name="error" size={50} color="#dc2626" />
          )}
        </Center>
        <Center my={30} justifyContent="space-around">
          <Input
            my={4}
            size="xl"
            placeholder={title}
            color="white"
            onChangeText={setInputName}
            value={inputName}
          />
          <Input
            my={4}
            size="xl"
            placeholder={price.toString()}
            color="white"
            onChangeText={setInputPrice}
            value={inputPrice}
          />
          <Input
            my={4}
            size="xl"
            placeholder={type}
            color="white"
            onChangeText={setInputType}
            value={inputType}
          />
        </Center>
        <Center my={30}>
          <Button
            width="70%"
            borderRadius={5}
            bg="green.400"
            onPress={handleUpdateProductFireBase}
            marginBottom={30}
          >
            <Text>Salvar</Text>
          </Button>
          <Button
            width="70%"
            borderRadius={5}
            bg="red.400"
            onPress={handleDeleteProduct}
          >
            <Text>Excluir</Text>
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
};
