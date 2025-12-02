import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '../../global.css';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Slot, Stack, usePathname, useRouter } from 'expo-router';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { Provider, useSelector } from 'react-redux';
import { store, useAppDispatch } from "@/store/store";
import { loadUserFromStorage, selectAuth } from '@/store/reducers/authSlice';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/services/apollo';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

function StackLayout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoadingFromStorage, status } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (isLoadingFromStorage) return;

    if (status === 'authenticated') {
      router.replace('/home');
    }
  }, [dispatch, isLoadingFromStorage, status]);


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
  //     console.log('firebaseUser', firebaseUser)
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>

      <Stack.Screen name='index' />
      <Stack.Screen name='register' options={{
        headerShown: true,
        title: 'Novo Registro'
      }} />

    </Stack>
  )
}


export default function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <GluestackUIProvider mode={colorMode}>
          <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
            <StackLayout />
            {pathname === '/' && (
              <Fab
                onPress={() =>
                  setColorMode(colorMode === 'dark' ? 'light' : 'dark')
                }
                className="m-6"
                size="lg"
              >
                <FabIcon as={colorMode === 'dark' ? MoonIcon : SunIcon} />
              </Fab>
            )}
          </ThemeProvider>
        </GluestackUIProvider>
      </ApolloProvider >
    </Provider>
  );
}
