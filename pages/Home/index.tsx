import React, { useEffect } from "react";
import { Center, View, Spinner, FlatList } from "native-base";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import { app } from "../../firebaseConfig";
import { Products } from "../../components/Products";
import { ProductType } from "../../types/Product";
import { SafeAreaView } from "react-native";

const Home: React.FC = () => {
  const [products, setProducts] = React.useState<Array<ProductType>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const listProducts = async () => {
    setProducts([]);
    setLoading(true);
    const firestore = getFirestore(app);

    const querySnapshot = await getDocs(collection(firestore, "Product"));
    querySnapshot.forEach((document) => {
      const { id } = document;
      const { title, description, price, ratting, filename, type } =
        document.data();

      const product: ProductType = {
        id,
        title,
        description,
        price,
        ratting,
        filename,
        type,
      };

      setProducts((old) => [...old, product]);
      setLoading(false);
    });
  };

  const addProduct = async () => {
    const firestore = getFirestore(app);

    await addDoc(collection(firestore, "Product"), {
      title: "morango",
      description: "dhuashduasud",
      price: 29.9,
      type: "fruta",
      ratting: 2,
    });
    console.log("add");
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
            onRefresh={() => listProducts()}
            refreshing={loading}
            removeClippedSubviews
          />
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default Home;
