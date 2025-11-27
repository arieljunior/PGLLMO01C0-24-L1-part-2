import { GET_PRODUCT_BY_ID } from "@/queries/products";
import { useQuery } from "@apollo/client/react";

export function useProductById(id: string) {
    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id
        },
        skip: !id,
        fetchPolicy: 'cache-first'
    });

    return {
        product: data?.product ?? null,
        isLoading: loading,
        isError: Boolean(error),
        error: error,
    }
}