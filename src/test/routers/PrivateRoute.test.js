import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { PrivateRoute } from '../../routers/PrivateRoute'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate:()=> <span> reedicionar </span>
}));


describe('pruebas en <PrivateRoute />', () => { 
  

  Storage.prototype.setItem = jest.fn();

  test('should de mostrar el componente si esta autentica y guardar en el localStorage', () => { 

    const contextValue = {
      user: {
        name: 'Pepe',
        logged: true
      }
    }

    //MemoryRouter se utliza por el location el componente a evaluarse
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>   
          <PrivateRoute>
            <h1>Private component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.find('h1').text()).toBe('Private component');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');

  });



  test('should de bloquear el componente si no esta auntenticado', () => { 

    const contextValue = {
      user: {
        logged: false
      }
    }
    //MemoryRouter se utliza por el location el componente a evaluarse
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>   
          <PrivateRoute>
            <h1>Private component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );


    // console.log(wrapper.html());

      expect(wrapper.text().trim()).toBe('reedicionar');

  })
})