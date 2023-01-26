import React, { useEffect } from "react";
import { Center, View, Spinner, FlatList } from "native-base";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { app } from "../../firebaseConfig";
import { Products } from "../../components/Products";
import { ProductType } from "../../types/Product";
import { SafeAreaView } from "react-native";

const Home: React.FC = () => {
  const [products, setProducts] = React.useState<Array<ProductType>>([]);

  const listProducts = async () => {
    const firestore = getFirestore(app);

    const querySnapshot = await getDocs(collection(firestore, "Product"));
    querySnapshot.forEach((document) => {
      const { id } = document;
      console.log({ id }, document.data());
      const { title, description, price, ratting, filename } = document.data();

      const product: ProductType = {
        id,
        title,
        description,
        price,
        ratting,
        filename,
      };

      setProducts((old) => [...old, product]);
    });
  };

  useEffect(() => {
    listProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} bgColor="blueGray.800">
        <Center marginTop={15}>
          {!products && <Spinner color="blue" />}
          <FlatList
            data={products}
            renderItem={({ item }) => <Products {...item} />}
            extraData={(item: ProductType) => item.id}
            style={{ padding: 10 }}
          />
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default Home;
