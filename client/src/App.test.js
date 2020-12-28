import React from 'react';
import { fireEvent, getByTestId, queryByTestId, render } from '@testing-library/react';
import App from './App';

describe("Homepage", () => {

  test('Check navbar', () => {
    const { getByTestId } = render(<App />);
    const navbar = getByTestId("navbar")

    expect(navbar).toBeInTheDocument()
  });

  test('Check Welcome text', () => {
    const { getByText, getByTestId } = render(<App />)
    const pokeDex = getByText("Welcome")
    // const homeButton = getByTestId("home-button")
    // fireEvent.click(homeButton)

    expect(pokeDex).toBeInTheDocument()
  })

})

describe("Pokemon List ", () => {
  test("Check Pokemon List Button", () => {
    const { getByText, getByTestId, findByText } = render(<App />)
    const pokemonListButton = getByTestId("pokemon-list-button")
    fireEvent.click(pokemonListButton)

    // const title = getByText("Pokemon")
    findByText('Charizard')
      .then((el) => {
        expect(el).toBeInTheDocument()
        done()
      })
  })

  test("Check Pokemon List Button", () => {
    const { getByText, getByTestId, findByText } = render(<App />)
    const pokemonListButton = getByTestId("pokemon-list-button")
    fireEvent.click(pokemonListButton)
    const pokemonDropdownButton = getByTestId("pokemon-dropdown-button")
    fireEvent.click(pokemonDropdownButton)
  
    findByText('Generation I')
      .then((el) => {
        expect(el).toBeInTheDocument()
        done()
      })
  })

  // test("Search Feature Test", ()=> {
  //   const { getByText, getByTestId, findByText, findByTestId } = render(<App/>)
  //   const gen1 = getByTestId("gen1")

  //   fireEvent.click(gen1)

  //   findByText('Pokemon')
  //     .then(()=> {
  //       const searchInput = getByTestId("search-input")
  //       const searchButton = getByTestId("search-button")
  //       fireEvent.change(searchInput, {target: { value: "pikachu"}})
  //       fireEvent.click(searchButton)

  //       findByTestId("result-box")
  //         .then(()=> {
  //           const pokemonName = getByTestId("founded-pokemon-name")
  //           expect(pokemonName).toHaveValue("pikachu")
  //         })
  //     })
  // })

  // test("Favorite feature test", ()=> {
  //   const { getByText, getByTestId, findByText, findByTestId } = render(<App/>)
  //   const gen1 = getByTestId("gen1")

  //   fireEvent.click(gen1)

  //   findByTestId("bulbasaur-row")
  //     .then((el)=>{
  //       fireEvent.click(el)

  //       findByTestId("founded-pokemon-name")
  //         .then((el)=> {
  //           expect(el).toHaveValue("bulbasaur")

  //           const detailButton = getByTestId("detail-button")
  //           fireEvent.click(detailButton)

  //           findByTestId("detail-pokemon-name")
  //             .then((el) => {
  //               expect(el).toHaveValue("bulbasaur")
  //               const addFavButton = getByTestId("add-favorite-button")
  //               fireEvent.click(addFavButton)

  //               const routeFavButton = getByTestId("favorites-button")
  //               fireEvent.click(routeFavButton)

  //               findByTestId("bulbasaur-favorite-row")
  //                 .then((el) => {
  //                   expect(el).toBeInTheDocument()
  //                 })

  //             })
  //         })
  //     })
  // })

})
