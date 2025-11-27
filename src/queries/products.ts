import { GetProductByIdParams, GetProductsData, GetProductsParams, ProductDetailData } from '@/types/products';
import { gql, TypedDocumentNode } from '@apollo/client';

export const GET_PRODUCTS: TypedDocumentNode<GetProductsData, GetProductsParams> = gql`
  query GetProducts ($first: Int!, $after: String) {
    products(first: $first, after: $after) {

      pageInfo {
        hasNextPage
        endCursor
      }

      edges {
        cursor
        node {
          id
          title
          description
          category {
            name
          }
          featuredImage {
            url
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID: TypedDocumentNode<ProductDetailData, GetProductByIdParams> = gql`
  query GetProducts ($id: ID!) {
    product(id: $id) {
      id
      title
      description
      category {
        name
      }
      featuredImage {
        url
      }
      totalInventory
      variants(first: 1) {
        edges {
          node {
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;