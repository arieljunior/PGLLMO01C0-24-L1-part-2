import { Button, ButtonIcon } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { logout, selectAuth } from "@/store/reducers/authSlice";
import { useAppDispatch } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateLayout() {
    const router = useRouter();
    const { token } = useSelector(selectAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token) {
            router.replace('/')
        }
    }, [router, token]);

    const handleLogout = useCallback(async () => {
        await dispatch(logout())
    }, [dispatch]);

    if (!token) {
        return <Spinner />
    }

    return <Stack>
        <Stack.Screen
            name='home'
            options={{
                title: "Início",
                headerRight: () => (
                    <Button variant="link" onPress={handleLogout}>
                        <ButtonIcon as={LogOut} />
                    </Button>
                )
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