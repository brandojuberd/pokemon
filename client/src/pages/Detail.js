import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { myPokemonsFn } from "../configs/apollo.js"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter"
import { Button } from "react-bootstrap"
import LoadingAnimation from "../components/LoadingAnimation"
import Swal from 'sweetalert2'

const GET_MY_POKEMONS = gql`
  query {
    myPokemons @client
  }
`
const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }
`



export default function Detail() {
  const { pokemonName } = useParams()
  const { loading, data } = useQuery(GET_POKEMON, { variables: { name: pokemonName } })
  const { data: clientData } = useQuery(GET_MY_POKEMONS)
  console.log(clientData);
  const [isMovesPressed, setIsMovesPressed] = useState(false)

  function addToMyPokemon() {

    let random = Math.round(Math.random())

    if (random === 1) {
      Swal.fire({
        title: `Gotcha!!`,
        text: `Successfully Catch ${capitalizeFirstLetter(pokemonName)}`,
        html: `
        <p> Successfully Catch ${capitalizeFirstLetter(pokemonName)} </p>
        <p> Give him/her a nickname </p>
        `,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText: "Release",
        confirmButtonText: 'Catch',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#ffc107",
        preConfirm: (nickname) => {
          let isDuplicate
          
          clientData.myPokemons.map(pokemon => {
            console.log(pokemon.nickname);
            if (pokemon.nickname  === nickname) {
              return isDuplicate = true
            } else {
              return isDuplicate = false
            }
          });
          console.log(isDuplicate);
          if (isDuplicate) {
            Swal.showValidationMessage(
              `You already have a pokemon with that name`
            )
          } else {
            let catchedPokemon = {
              id: data.pokemon.id,
              name: data.pokemon.name,
              nickname: nickname,
              image: data.pokemon.sprites.front_default
            }
            let newMyPokemons = [
              ...clientData.myPokemons,
              catchedPokemon
            ]
            myPokemonsFn(newMyPokemons)

          }


        },
      }).then((result) => {
        // console.log(result);
        if (result.isConfirmed) {
          Swal.fire({
            title: `Added to your vault`,
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire({
            title: `You released ${capitalizeFirstLetter(pokemonName)} back to the nature.`,
            showConfirmButton: false,
            timer: 2000
          })
        }
        
      })
    } else {
      Swal.fire({
        title: `Uh no! ${capitalizeFirstLetter(pokemonName)} got away!`,
        showConfirmButton: false,
        timer: 1000
      })
    }
    
  }

  function movesPress() {
    isMovesPressed ?
      setIsMovesPressed(false)
      :
      setIsMovesPressed(true)
  }
  if (loading) {
    return (
      <LoadingAnimation />
    )
  }
  return (
    <div className="detail">
      <div className="pokemon-image"><img alt={data.pokemon.name} src={data.pokemon.sprites.front_default} /></div>
      <h1>{capitalizeFirstLetter(data.pokemon.name)}</h1>

      <h4>Types</h4>
      <div className="pokemon-types">
        {
          data.pokemon.types.map((type, index) => {
            return (
              <p key={index}>| {capitalizeFirstLetter(type.type.name)} | </p>
            )
          })
        }
      </div>



      <Button variant="warning" className="pokemon-moves-button" onClick={movesPress}>Moves</Button>
      {isMovesPressed ?
        <div className="pokemon-moves">
          {data.pokemon.moves.map((move, index) => {
            return (
              <p key={index}>|{move.move.name.toUpperCase()}|</p>
            )
          })}
        </div>
        :
        <div></div>
      }

      <Button variant="warning" onClick={addToMyPokemon}>Catch</Button>
    </div>
  )
}