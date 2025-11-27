import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

let users: User[] = [
  { id: '1', name: 'Admin', email: 'admin@teste.com', age: 30 }
];

let products: Product[] = [
  { id: 'p1', name: 'Notebook', price: 5000.00, stock: 10 },
  { id: 'p2', name: 'Mouse Gamer', price: 250.00, stock: 50 }
];

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): Boolean!
    
    createProduct(name: String!, price: Float!, stock: Int!): Product!
    updateProduct(id: ID!, name: String, price: Float, stock: Int): Product
    deleteProduct(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, args: { id: string }) => users.find((u) => u.id === args.id),
    
    products: () => products,
    product: (_: any, args: { id: string }) => products.find((p) => p.id === args.id),
  },

  Mutation: {
    createUser: (_: any, args: { name: string; email: string; age?: number }) => {
      const newUser: User = { id: uuidv4(), ...args };
      users.push(newUser);
      return newUser;
    },

    updateUser: (_: any, args: { id: string; name: string; email: string; age?: number }) => {
      const userIndex = users.findIndex((u) => u.id === args.id);
      if (userIndex === -1) return null;
      users[userIndex] = { ...users[userIndex], ...args };
      return users[userIndex];
    },
    deleteUser: (_: any, args: { id: string }) => {
      const initialLength = users.length;
      users = users.filter((u) => u.id !== args.id);
      return users.length < initialLength;
    },
    
    createProduct: (_: any, args: { name: string; price: number; stock: number }) => {
      const newProduct: Product = { id: uuidv4(), ...args };
      products.push(newProduct);
      return newProduct;
    },
    
    updateProduct: (_: any, args: { id: string; name: string; price: number; stock: number }) => {
      const productIndex = products.findIndex((p) => p.id === args.id);
      if (productIndex === -1) return null;
      products[productIndex] = { ...products[productIndex], ...args };
      return products[productIndex];
    },
    
    deleteProduct: (_: any, args: { id: string }) => {
      const initialLength = products.length;
      products = products.filter((p) => p.id !== args.id);
      return products.length < initialLength;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const main = async () => {
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`Servidor rodando em: ${url}`);
};

main();