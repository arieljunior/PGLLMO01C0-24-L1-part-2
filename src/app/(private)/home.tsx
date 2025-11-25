import CardProduct from "@/components/CardProduct";
import { Text, View } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { logout, selectAuth } from "@/store/reducers/authSlice";
import { useRouter } from "expo-router";
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
    
    return <View className="flex-1 p-6 justify-center">

        <CardProduct 
            {...mockProduct}
            onAddToCart={()=>{}}
            onViewDetails={()=>{
                router.push(`/details/${mockProduct.id}`)
            }}
        />
    </View>
}