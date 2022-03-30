import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';


const mockNavigate = jest.fn();

jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate
}))

describe('pruebas en <SearchScreen />', () => { 

  test('should de mostrar correctamente con valores por defecto', () => { 

    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen /> 

      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');
  })

  test('should de mostrar a Batman y el input con el valor del queryString', () => { 

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen /> 

      </MemoryRouter>
    );
    
    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();

  })

  test('should de mostrar un error si no se encuentra el heroe', () => { 

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123']} >
        <SearchScreen />
      </MemoryRouter>
    );


    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados: batman123');


  })



  test('should de llamar el navigate a la nueva pantalla', () => { 

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']} >
        <SearchScreen />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change',{
      target:{
        name:'searchText',
        value: 'batman'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    })

    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');

  })

});