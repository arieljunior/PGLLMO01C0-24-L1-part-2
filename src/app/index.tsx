import React, { useCallback, useState } from 'react';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { styled } from 'tailwindcss-react-native';

const StyledBox = styled(Box, 'flex-1 bg-background-50 justify-center p-6');

interface FormLogin {
  email: string
  password: string
}

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState<FormLogin>({
    email: '',
    password: ''
  });

  const handleChangeInputLogin = useCallback((name: keyof FormLogin, value: String) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }, []);

  const handleLogin = useCallback(()=>{
    console.log(form)
    router.replace('/home');
  }, [form, router])

  return (
    <Box className='flex-1 bg-background-50 justify-center p-6'>
      <VStack space='lg' >
        <Heading>Bem-vindo!</Heading>
        <Text>faça o login para continuar</Text>

        <VStack space='xs'>
          <Text>Email:</Text>
          <Input variant='outline' size='md'>
            <InputField
              placeholder='Informe seu e-mail'
              keyboardType='email-address'
              value={form.email}
              onChangeText={(value)=> handleChangeInputLogin('email', value )}
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
              value={form.password}
              onChangeText={(value)=> handleChangeInputLogin('password', value )}
            />
          </Input>
        </VStack>
        <Button action='primary' size='lg' onPress={handleLogin}>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
