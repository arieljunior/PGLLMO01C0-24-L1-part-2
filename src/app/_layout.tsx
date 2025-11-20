import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '../../global.css';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useState } from 'react';
import { Slot, Stack, usePathname } from 'expo-router';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { TailwindProvider } from 'tailwindcss-react-native'
import { Provider } from 'react-redux';
import { store } from "@/store/store";

export default function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  return (
    <TailwindProvider>
      <Provider store={store}>

        <GluestackUIProvider mode={colorMode}>
          <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{
              headerShown: false
            }}>

              <Stack.Screen name='index' />
              <Stack.Screen name='register' options={{
                headerShown: true,
                title: 'Novo Registro'
              }} />

            </Stack>
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
      </Provider>
    </TailwindProvider>
  );
}
