import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter"
import getPokemonId from "../helpers/getPokemonId";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`
const GET_MY_POKEMONS = gql`
  query {
    myPokemons @client
  }
`
export default function List() {
  const history = useHistory()
  const { generation } = useParams()
  const [apiVariables, setApiVariables] = useState(() => {
    switch (generation) {
      case "generation-1":
        return { limit: 151, offset: 0 }
      case "generation-2":
        return { limit: 100, offset: 151 }
      case "generation-3":
        return { limit: 135, offset: 251 }
      case "generation-4":
        return { limit: 135, offset: 386 }
      case "generation-5":
        return { limit: 156, offset: 493 }
      case "generation-6":
        return { limit: 72, offset: 649 }
      case "generation-7":
        return { limit: 88, offset: 721 }
      case "generation-8":
        return { limit: 87, offset: 809 }
      default:
        break;
    }
  })
  const { loading, data, refetch } = useQuery(GET_POKEMONS, { variables: apiVariables })
  const { data: clientData } = useQuery(GET_MY_POKEMONS)


  useEffect(() => {
    switch (generation) {
      case "generation-1":
        setApiVariables({ limit: 150, offset: 1 })
        refetch()
        break;
      case "generation-2":
        setApiVariables({ limit: 99, offset: 152 })
        refetch()
        break;
      case "generation-3":
        setApiVariables({ limit: 134, offset: 252 })
        refetch()
        break;
      case "generation-4":
        setApiVariables({ limit: 106, offset: 387 })
        refetch()
        break;
      case "generation-5":
        setApiVariables({ limit: 155, offset: 494 })
        refetch()
        break;
      case "generation-6":
        setApiVariables({ limit: 71, offset: 650 })
        refetch()
        break;
      case "generation-7":
        setApiVariables({ limit: 87, offset: 722 })
        refetch()
        break;
      case "generation-8":
        setApiVariables({ limit: 86, offset: 810 })
        refetch()
        break;
      default:
        break;
    }
  }, [generation])
  // console.log(apiVariables);
  console.log(generation);

  function countOwnedPokemon(myPokemons, targetName){
    let counter = 0

    myPokemons.forEach(pokemon => {
      if(pokemon.name === targetName){
        counter++
      }
    });

    return counter
  }

  function dropdownMenuTitle(params){
    switch (params) {
      case "generation-1":
        return "Generation I"
      case "generation-2":
        return "Generation II"
      case "generation-3":
        return "Generation III"
      case "generation-4":
        return "Generation IV"
      case "generation-5":
        return "Generation V"
      case "generation-6":
        return "Generation VI"
      case "generation-7":
        return "Generation VII"
      case "generation-8":
        return "Generation VIII"
      default:
        break;
    }
  }

  function toDetail(name){
    history.push({
      pathname:`/pokemon/${name}`
    })
  }

  if (loading) {
    return (
      <LoadingAnimation/>
    )
  }
  return (
    <div className="list-container">
      <Dropdown className="dropdown-generation-menu" data-testid="pokemon-dropdown-button">
        <Dropdown.Toggle variant="warning" id="dropdown-basic" >
          {dropdownMenuTitle(generation)}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item ><Link to="/pokemon-list/generation-1/" data-testid="gen1">Generation I</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-2/">Generation II</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-3/">Generation III</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-4/">Generation IV</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-5/">Generation V</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-6/">Generation VI</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-7/">Generation VII</Link></Dropdown.Item>
          <Dropdown.Item ><Link to="/pokemon-list/generation-8/">Generation VIII</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th className="col">Name</th>
            <th></th>
            <th>Owned</th>
          </tr>
        </thead>
        <tbody>
          {data.pokemons.results.map((pokemon, index) => {
            return (

              <tr className="pokemon-list-row" key={index} onClick={()=>toDetail(pokemon.name)}>
                <td>{getPokemonId(pokemon.url)}</td>
                <td>{capitalizeFirstLetter(pokemon.name)}</td>
                <td><img alt={pokemon.name} src={pokemon.image}/></td>
                <td>{countOwnedPokemon(clientData.myPokemons, pokemon.name)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}