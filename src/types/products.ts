

interface VariantNode {
    price: {
        amount: string;
        currencyCode: string;
    };
}

interface VariantEdge {
    node: VariantNode;
}

interface VariantsConnection {
    edges: VariantEdge[];
}


export interface ProductNode {
    id: string;
    title: string;
    description: string;
    category: {
        name: string
    };
    featuredImage: {
        url: string;
    };
    variants: VariantsConnection;
}

interface ProductDetailNode extends ProductNode {
    totalInventory: string
}

export interface ProductDetailData {
    product: ProductDetailNode
}

export interface GetProductByIdParams {
    id: string;
}

export interface ProductEdge {
    node: ProductNode;
}

interface ProductsConnection {
    edges: ProductEdge[];
    pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
    };
}

export interface GetProductsData {
    products: ProductsConnection;
}

export interface GetProductsParams {
    first?: number;
    after: string | null;
}