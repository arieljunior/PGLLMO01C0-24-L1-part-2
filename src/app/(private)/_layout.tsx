import { Spinner } from "@/components/ui/spinner";
import { selectAuth } from "@/store/reducers/authSlice";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateLayout() {
    const router = useRouter();
    const { token } = useSelector(selectAuth);

    useEffect(()=>{
        if(!token){
            router.replace('/')
        }
    }, [router, token]);

    if(!token){
        return <Spinner />
    }

    return <Stack>
        <Stack.Screen
            name='home'
            options={{
                title: "Início"
            }}
        />
        <Stack.Screen
            name='details/[id]'
            options={{
                title: "Detalhes do produto"
            }}
        />
    </Stack>
}