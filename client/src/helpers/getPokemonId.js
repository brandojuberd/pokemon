export default function getPokemonId(url){
  let arr = url.split("/")
  return arr[arr.length - 2]
}