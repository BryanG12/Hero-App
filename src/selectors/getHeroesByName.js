import { heroes } from '../data/heroes';


export const getHeroesByName = (name='') =>{
  name = name.toLowerCase();
  console.log('se esta ejecutando la funcion getHeroesByName');

  if(!name.length>0){
    return [];
  }
  
  return heroes.filter( heroe => heroe.superhero.toLowerCase().includes(name));

}