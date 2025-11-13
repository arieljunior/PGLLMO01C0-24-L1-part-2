import { Text, View } from "@/components/Themed";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heart, ShoppingCart, Star } from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

interface ProductDetail {
    id: string;
    title: string;
    price: number;
    rating: number;
    category: string;
    description: string;
    imageUrl: string;
    stock: number;
}

const mockProduct: ProductDetail = {
    id: '1',
    title: 'Premium Wireless Noise Cancelling Headphones',
    price: 199.99,
    rating: 4.7,
    category: 'Audio Equipment',
    description: 'Immerse yourself in pure audio quality with our latest generation headphones. Featuring industry-leading noise cancellation, 30 hours of battery life, and plush earcups for ultimate comfort. Available in three stylish colors.',
    imageUrl: 'https://edifier.com.br/pub/media/catalog/product/h/e/headset-gamer-edifier-g2ii---preto_1_.jpg',
    stock: 5,
};

export default function Details() {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    return <View className="flex-1">
        <ScrollView className="flex-1">
            <Image
                source={{
                    uri: mockProduct.imageUrl
                }}
                alt={mockProduct.title}
                className="self-center"
                size="2xl"
                resizeMode="cover"
            />

            <VStack space="md" className="p-4">
                <HStack className="flex-1 justify-center items-center">
                    <VStack>
                        <Badge
                            action="info"
                            variant="outline"
                            size="lg"
                            className="w-2/6 mb-4"
                        >
                            <BadgeText>{mockProduct.category}</BadgeText>
                        </Badge>
                        <Heading size="xl">
                            {mockProduct.title}
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

                <HStack className="items-center justify-between">
                    <Text className="text-3xl font-bold my-2"> R${mockProduct.price.toFixed(2)}</Text>

                    <HStack space="xs" className="bg-yellow-100 rounded-full py-1 px-3 items-center">
                        <Button variant="link">
                            <ButtonIcon as={Star} className="color-yellow-600 fill-yellow-600" />
                        </Button>
                        <Text className="text-sm font-semibold ml-1">{mockProduct.rating}</Text>
                    </HStack>
                </HStack>

                <VStack space="sm" className="mt-4">
                    <Heading>Descrição</Heading>
                    <Text className="color-gray-700">{mockProduct.description}</Text>
                </VStack>

                <Text className={`${mockProduct.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                    {mockProduct.stock > 10 ? `Em estoque: ${mockProduct.stock}` : 'Acabando'}
                </Text>
            </VStack>
        </ScrollView>

        <Fab
            size="lg"
            isDisabled={mockProduct.stock === 0}
            onPress={() => { }}
            placement="bottom center"
            className="mb-6"
        >
            <FabIcon as={ShoppingCart} />
            <FabLabel>Adicionar no Carrinho</FabLabel>
        </Fab>
    </View>
}