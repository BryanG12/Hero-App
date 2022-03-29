import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm'
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {


  const navigate = useNavigate();
  const location = useLocation ();

  const { q= ''} = queryString.parse(location.search);

  // useMemo

  const [ formValues, handleInputChange ] = useForm({
    searchText:q
  });
  
  const {searchText} = formValues;
  
  const heroesFileted =  useMemo( () =>  getHeroesByName(q),[q]);
  
  const handleSearch= ( e )=>{
    e.preventDefault();
    navigate(`?q=${searchText}`);
  }


  return (
    <>
      <h1>Búsqueda</h1>
      <hr/>
      <div className='row'>
        <div className='col-5'>
          <h4> Buscar</h4>
          <hr/>

          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Buscar un héroe'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={ searchText }
              onChange={handleInputChange }
            />
            <div className='d-grid gap-2'>
              <button
                className='mt-3 btn btn-warning btn-block'
                type='submit'
                
              >
                Buscar...

              </button>
            </div>
          </form>
        </div>

        <div className='col'>
          <h4>Resultados</h4>
          <hr/>

          {
            (q === '')
              ? <div className='alert alert-info'> Buscar un héroe</div>
              : (heroesFileted.length === 0 ) 
                && <div className='alert alert-danger'> No hay resultados: {q} </div>
          }



          {
            heroesFileted.map( hero => (
              <HeroCard
                key={hero.id}
                {...hero} 
              />
            ))
          }
        </div>

      </div>
    </>
  )
}
