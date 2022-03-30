import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/Navbar'
import { types } from '../../../types/types';



const mockNavigate = jest.fn();

jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate
}))

describe('Pruebas en <Navbar />', () => {
  const contextValue = {
    dispatch:jest.fn(),
    user:{
      logged:true, 
      name:'Bryan'
    }
  }
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}  >
      <MemoryRouter initialEntries={ ['/']} >
          <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('should de mostrar correctamente', () => { 

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Bryan')
  });

  test('should de llamar el logout, llamar el navigate y dispatch con los argumentos', () => { 

    wrapper.find('button').simulate('click');
    // wrapper.find('button').prop('onClick')();// () ejecucion de la funcion
    
    expect(mockNavigate).toHaveBeenCalledWith('/login',{replace:true});
    expect(contextValue.dispatch).toHaveBeenLastCalledWith({type: types.logout});

  });

})