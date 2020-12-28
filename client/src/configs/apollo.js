import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const myPokemonsFn = makeVar([])


const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myPokemons: {
            read(){
              return myPokemonsFn()
            }
          }
        }
      }
    }
  })
});

export default client;