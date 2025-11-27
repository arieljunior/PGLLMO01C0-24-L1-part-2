import CardProduct from "@/components/CardProduct"
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { InfoIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useProducts } from "@/hooks/useProducts";
import { GET_PRODUCTS } from "@/queries/products";
import { logout, selectAuth } from "@/store/reducers/authSlice";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const mockProduct = {
    id: "1",
    title: "Headset Gamer HyperX Cloud II",
    description:
        "Headset gamer com som surround 7.1, microfone removível com cancelamento de ruído e almofadas de memória confortável.",
    category: "Acessórios Gamer",
    price: 599.90,
    imageUrl: "https://edifier.com.br/pub/media/catalog/product/h/e/headset-gamer-edifier-g2ii---preto_1_.jpg"
};

export default function Home() {
    const router = useRouter();

    const { error, loading, data, loadMore, isFetchingMore} = useProducts();

    const handleViewProductDetails = useCallback((id: string)=>{
        router.push(`/details/${encodeURIComponent(id)}`)
    },[router]);

    if (loading) {
        return (
            <Center className="flex-1">
                <Spinner size="large" color="primary500" />
                <Text size="sm">Carregando produtos...</Text>
            </Center>
        );
    }

    if (error) {
        return (
            <Center className="flex-1 p-4">
                <Alert action="error">
                    <AlertIcon as={InfoIcon} />
                    <AlertText>Erro na API: {error.message}</AlertText>
                </Alert>
            </Center>
        );
    }
    return <Box className="flex-1 p-6 justify-center">

        <FlatList
            data={data?.products.edges}
            ListEmptyComponent={<Box><Text>Nenhum produto encontrado.</Text></Box>}
            keyExtractor={(item) => item.node.id}
            onEndReached={loadMore}
            ListFooterComponent={() => {
                if (!isFetchingMore) return <Box className="h-20" />;
                return (
                    <Center className="py-4">
                        <Spinner />
                        <Text size="xs">Carregando mais produtos...</Text>
                    </Center>
                );
            }}
            renderItem={({item})=>(
                <CardProduct 
                    title={item.node.title}
                    description={item.node.description}
                    imageUrl={item.node.featuredImage?.url}
                    price={item.node.variants.edges[0]?.node.price.amount}
                    id={item.node.id}
                    category={item.node.category.name}
                    onAddToCart={()=>{}}
                    onViewDetails={()=>handleViewProductDetails(item.node.id)}
                />
            )}
        />
    </Box>
}