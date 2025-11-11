import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '../../global.css';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useState } from 'react';
import { Slot, usePathname } from 'expo-router';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';

export default function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  return (
    <GluestackUIProvider mode={colorMode}>
      <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
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
  );
}
