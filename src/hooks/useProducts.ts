import { GET_PRODUCTS } from "@/queries/products";
import { useQuery } from "@apollo/client/react";
import { useCallback, useState } from "react";

export function useProducts() {
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {
        data,
        loading,
        error,
        fetchMore
    } = useQuery(GET_PRODUCTS, {
        variables: {
            first: 10,
            after: null
        }
    });

    const loadMore = useCallback(async () => {

        if (loading || isFetchingMore) return;

        const pageInfo = data?.products.pageInfo;

        if (!pageInfo?.hasNextPage) return;

        setIsFetchingMore(true);
        try {
            await fetchMore({
                variables: {
                    first: 10,
                    after: pageInfo.endCursor,
                },
            });
        } catch (err) {
            console.error("Erro ao carregar mais itens", err);
        } finally {
            setIsFetchingMore(false);
        }
    }, []);

    return {
        data,
        loading,
        error,
        loadMore,
        isFetchingMore
    }
}