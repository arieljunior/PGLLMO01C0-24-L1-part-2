import { Badge, BadgeText } from "../ui/badge";
import { Box } from "../ui/box";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { EyeIcon } from "../ui/icon";
import { Image } from "../ui/image";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { styled } from 'tailwindcss-react-native';
import { ShoppingCart } from 'lucide-react-native';

interface CardProductProps {
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    imageUrl: string,
    onViewDetails: (id: string) => void
    onAddToCart: (id: string) => void
}

const StyledCategoryBadge = styled(Badge, "bg-gray-200");

export default function CardProduct({
    category,
    description,
    id,
    imageUrl,
    onAddToCart,
    onViewDetails,
    price,
    title
}: CardProductProps) {

    return <Card size="md" className="p-5 rounded-lg">
        <Pressable onPress={() => onViewDetails(id)}>
            <Image
                source={{ uri: imageUrl }}
                alt={`Imagem do ${title}`}
                className="mb-6 self-center"
                size="2xl"
                resizeMode="cover"
            />
        </Pressable>
        <VStack space="sm">
            <HStack className="justify-center items-center">
                <Heading>
                    {title}
                </Heading>
                <StyledCategoryBadge>
                    <BadgeText>{category}</BadgeText>
                </StyledCategoryBadge>
            </HStack>
            <Text className="text-sm font-semibold text-gray-700">
                R$ {price.toFixed(2)}
            </Text>

            <Text size="sm" numberOfLines={2}>
                {description}
            </Text>
            <HStack space="md" className="mt-2 pt-2 border-t-2 border-gray-200">
                <Button
                    variant="outline"
                    action="secondary"
                    className="flex-1"
                    onPress={() => onViewDetails(id)}
                >
                    <ButtonIcon as={EyeIcon} className="mr-2" />
                    <ButtonText>Visualizar</ButtonText>
                </Button>
                <Button
                    action="primary"
                    className="flex-1"
                    onPress={() => onAddToCart(id)}

                >
                    <ButtonIcon as={ShoppingCart} className="mr-2" />
                    <ButtonText>Adicionar</ButtonText>
                </Button>
            </HStack>
        </VStack>
    </Card>
}