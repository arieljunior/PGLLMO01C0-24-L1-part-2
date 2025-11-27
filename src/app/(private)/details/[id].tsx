import { View } from "@/components/Themed";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useProductById } from "@/hooks/useProductById";
import { GET_PRODUCT_BY_ID } from "@/queries/products";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Heart, ShoppingCart, Star } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";

export default function Details() {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    
    const {error, isError, isLoading, product} = useProductById(id);
    
    const priceText = useMemo(() => {
        if (!product) return '';
        return `R$ ${Number(product.variants.edges[0].node.price.amount).toFixed(2)}`;
    }, [product]);

    const stock = useMemo(() => {
        if (!product) return 0;
        return Number(product.totalInventory);
    }, [product]);

    useEffect(() => {
        if (!product) return;
        navigation.setOptions({ title: product.title });
    }, [product, navigation]);

    if (isLoading) {
        return <Center className="flex-1">
            <Spinner size="large" color="primary500" />
            <Text size="sm">Carregando detalhes do produto...</Text>
        </Center>;
    }

    if (isError) {
        return <Center className="flex-1 p-4">
            <Text size="md" className="text-red-600">Erro ao carregar o produto: {error?.message || "Erro desconhecido"}</Text>
        </Center>;
    }

    return <View className="flex-1">
        <ScrollView className="flex-1">
            <Image
                source={{
                    uri: product?.featuredImage.url
                }}
                alt={product?.title}
                className="self-center"
                size="2xl"
                resizeMode="cover"
            />

            <VStack space="md" className="p-4">
                <HStack className="justify-between items-center">
                    <VStack className="flex-1">
                        <Badge
                            action="info"
                            variant="outline"
                            size="md"
                            className="w-2/6 mb-4"
                        >
                            <BadgeText>{product?.category.name}</BadgeText>
                        </Badge>
                        <Heading size="xl">
                            {product?.title}
                        </Heading>
                        
                    </VStack>

                    <Button
                        variant="link"
                        size="lg"
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <ButtonIcon
                            as={Heart}
                            className={`${isFavorite ? 'fill-red-500' : ''}`}
                            color="red"
                        />
                    </Button>
                </HStack>

                <HStack className="items-center justify-between mt-2 pb-2 border-b-hairline">
                    <Text className="text-3xl font-bold text-indigo-600 my-2"> {priceText}</Text>

                    <HStack space="xs" className="bg-yellow-100 rounded-full py-1 px-3 items-center">
                        <Button variant="link">
                            <ButtonIcon as={Star} className="color-yellow-600 fill-yellow-600" />
                        </Button>
                        <Text size="md" className="text-sm font-semibold ml-1">5</Text>
                    </HStack>
                </HStack>

                <VStack space="sm" className="mt-4">
                    <Heading size="sm">Descrição</Heading>
                    <Text size="md" className="color-gray-700">{product?.description}</Text>
                </VStack>

                <Text className={`${stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                    {stock > 10 ? `Em estoque: ${stock}` : 'Acabando'}
                </Text>
            </VStack>
        </ScrollView>

        <Fab
            size="lg"
            isDisabled={stock === 0}
            onPress={() => { }}
            placement="bottom center"
            className="mb-6"
        >
            <FabIcon as={ShoppingCart} />
            <FabLabel>Adicionar no Carrinho</FabLabel>
        </Fab>
    </View>
}