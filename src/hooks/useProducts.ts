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
        fetchMore,
        refetch,
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
    }, [data, fetchMore, isFetchingMore, loading]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true)
        try {
            await refetch({ first: 10, after: null })
        } catch (error) {
            console.error(error)
        } finally {
            setIsRefreshing(false)
        }
    }, [refetch, setIsRefreshing])
    return {
        data,
        loading,
        error,
        loadMore,
        isFetchingMore,
        handleRefresh,
        isRefreshing
    }
}