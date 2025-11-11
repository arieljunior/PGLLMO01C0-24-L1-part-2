import React from 'react';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  return (
    <Box className="flex-1 bg-background-50 justify-center p-6">
      <VStack space='lg' >
        <Heading>Bem-vindo!</Heading>
        <Text>faça o login para continuar</Text>

        <VStack space='xs'>
          <Text>Email:</Text>
          <Input variant='outline' size='md'>
            <InputField
              placeholder='Informe seu e-mail'
              keyboardType='email-address'
            />
          </Input>
        </VStack>

        <VStack space='xs'>
          <Text>Senha:</Text>
          <Input variant='outline' size='md'>
            <InputField
              placeholder='Informe sua senha'
              type='password'
              keyboardType='email-address'
            />
          </Input>
        </VStack>
        <Button action='primary' size='lg'>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
