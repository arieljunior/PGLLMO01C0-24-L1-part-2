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

export default function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  return (
    <TailwindProvider>
      <GluestackUIProvider mode={colorMode}>
        <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{
            headerShown: false
          }}>

            <Stack.Screen name='index' />
            <Stack.Screen
              name='home'
              options={{
                headerShown: true,
                title: "Início"
              }}
            />
            <Stack.Screen
              name='details/[id]'
              options={{
                headerShown: true,
                title: "Detalhes do produto"
              }}
            />

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
    </TailwindProvider>
  );
}
