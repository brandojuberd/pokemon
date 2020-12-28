import React from "react"
import { gql, useQuery } from "@apollo/client"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter"
import { Button } from "react-bootstrap"
import { myPokemonsFn } from "../configs/apollo"
import Swal from "sweetalert2"
// import getPokemonId from "../helpers/getPokemonId"



const GET_MY_POKEMONS = gql`
  query {
    myPokemons @client
  }
`

export default function MyPokemons(){
  const { data: clientData, refetch } = useQuery(GET_MY_POKEMONS)

  function releasePokemon(nickname){
    let newMyPokemons = []
    clientData.myPokemons.forEach(pokemon =>{
      if(nickname !== pokemon.nickname){
        newMyPokemons.push(pokemon)
      }
    })
    myPokemonsFn(newMyPokemons)
    Swal.fire({
      title: `You released ${nickname} back to nature.`,
      showConfirmButton: false,
      timer: 2000
    })
    refetch()

  }

  return(
    <div className="my-pokemons-container">
      <table className="table">
        <tbody>
          {clientData.myPokemons.map((pokemon, index) => {

            return (

              <tr className="pokemon-list-row" key={index} >
                {/* <td>{pokemon.id}</td> */}
                <td>{capitalizeFirstLetter(pokemon.name)}</td>
                <td>{pokemon.nickname? capitalizeFirstLetter(pokemon.nickname) : ""}</td>
                <td><img alt={pokemon.name} src={pokemon.image}/></td>
                <td><Button variant="warning" onClick={()=>releasePokemon(pokemon.nickname)}>Release</Button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}