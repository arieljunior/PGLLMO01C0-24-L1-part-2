import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { login, selectAuth } from '@/store/reducers/authSlice'
import { Icon, InfoIcon } from '@/components/ui/icon';
import { ArrowBigRightDash } from 'lucide-react-native';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';

interface FormLogin {
  email: string
  password: string
}

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error, isLoading, isLoadingFromStorage } = useSelector(selectAuth);
  
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [form, setForm] = useState<FormLogin>({
    email: '',
    password: ''
  });

  const handleChangeInputLogin = useCallback((name: keyof FormLogin, value: String) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }, []);

  const handleLogin = useCallback(async () => {
    if(!form.email || !form.password){
      setErrorForm("Por favor, preencha todos os campos.");
      return;
    }

    setErrorForm(null);

    const token = await dispatch(login(form)).unwrap();
    if (token) {
      router.replace('/home');
    }
  }, [form, router]);

  const handleGoToRegister = useCallback(() => {
    router.push('/register');
  }, [router]);
  
  if (isLoadingFromStorage) {
    return (
      <Center className='flex-1'>
        <Spinner size="large" />
      </Center>
    )
  }

  return (
    <Box className='flex-1 bg-background-50 justify-center p-6'>
      <VStack space='lg' >
        <Heading>Bem-vindo!</Heading>
        <Text>faça o login para continuar</Text>

        <VStack space='xs'>
          <Text>Email:</Text>
          <Input variant='outline' size='md' isDisabled={isLoading}>
            <InputField
              placeholder='Informe seu e-mail'
              keyboardType='email-address'
              value={form.email}
              onChangeText={(value) => handleChangeInputLogin('email', value)}
            />
          </Input>
        </VStack>

        <VStack space='xs'>
          <Text>Senha:</Text>
          <Input variant='outline' size='md' isDisabled={isLoading}>
            <InputField
              placeholder='Informe sua senha'
              type='password'
              keyboardType='email-address'
              value={form.password}
              onChangeText={(value) => handleChangeInputLogin('password', value)}
            />
          </Input>
        </VStack>
        <Button action='primary' size='lg' onPress={handleLogin} isDisabled={isLoading}>
          {
            isLoading ? (
              <>
                <ButtonSpinner />
                <ButtonText>Entrando...</ButtonText>
              </>
            ) : (
              <ButtonText>Entrar</ButtonText>
            )
          }
        </Button>
        <Button action='primary' size='lg' variant='link' onPress={handleGoToRegister}>
          <ButtonText>Crie sua conta</ButtonText>
          <Icon as={ArrowBigRightDash} size='lg' />
        </Button>

        <Box className='min-h-[43]'>
          {(error || errorForm) && (
            <Alert action="error" variant="solid">
              <AlertIcon as={InfoIcon} className='mr-3' />
              <AlertText>{error || errorForm}</AlertText>
            </Alert>
          )}
        </Box>

      </VStack>
    </Box>
  );
}
