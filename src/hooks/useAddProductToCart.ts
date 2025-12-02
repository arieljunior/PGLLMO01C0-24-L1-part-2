import { useToast } from "@/components/ui/toast";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Alert } from "react-native";

const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_ID = "gid://shopify/Cart/c1-1234567890";

export const useAddToCart = () => {
    const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
        onCompleted: (data: any) => {
            const qtd = data.cartLinesAdd?.cart?.totalQuantity;

            Alert.alert(`Produto adicionado ao carrinho! Total de itens: ${qtd}`);
        },
        onError: (err) => {
            Alert.alert('Erro', 'Não foi possível adicionar o produto ao carrinho.');
        },
        // refetchQueries: ['GetCart'],
        // update: (cache, { data }) => {
        //   cache.modify({
        //     fields: {

        //     }
        //   });
        // }
        // optimisticResponse: {},
    });

    const onAddProduct = async ({ id }: { id: string }) => {
        const { data } = await addToCart({
            variables: {
                cartId: CART_ID,
                lines: [
                    {
                        merchandiseId: id,
                        quantity: 1
                    }
                ]
            }
        });
    };

    return {
        onAddProduct,
        isLoading: loading,
        isError: Boolean(error),
        error: error,
    };
};