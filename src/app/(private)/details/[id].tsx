import { View } from "@/components/Themed";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
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
    stock: 15,
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
                <HStack className="justify-between items-center">
                    <VStack className="flex-1">
                        <Badge
                            action="info"
                            variant="outline"
                            size="md"
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

                <HStack className="items-center justify-between mt-2 pb-2 border-b-hairline">
                    <Text className="text-3xl font-bold text-indigo-600 my-2"> R${mockProduct.price.toFixed(2)}</Text>

                    <HStack space="xs" className="bg-yellow-100 rounded-full py-1 px-3 items-center">
                        <Button variant="link">
                            <ButtonIcon as={Star} className="color-yellow-600 fill-yellow-600" />
                        </Button>
                        <Text size="md" className="text-sm font-semibold ml-1">{mockProduct.rating}</Text>
                    </HStack>
                </HStack>

                <VStack space="sm" className="mt-4">
                    <Heading size="sm">Descrição</Heading>
                    <Text size="md" className="color-gray-700">{mockProduct.description}</Text>
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