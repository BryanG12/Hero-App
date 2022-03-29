import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { DashboardRouter } from '../../routers/DashboardRouter'



describe('pruebas <DashboardRoutes />', () => { 

  const contextValue ={
    user:{
      logged: true,
      name: 'Spike'
    }
  }
  

  test('should de mostrarse correctamente <Marvel /> "/"', () => { 

  
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <DashboardRouter />

        </MemoryRouter>

      </AuthContext.Provider>
    );

    // console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Spike');
    




  })

  test('should de mostrarse correctamente de <dc /> "/"', () => { 

  
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue}>
        <MemoryRouter initialEntries={['/dc']}>
          <DashboardRouter />

        </MemoryRouter>

      </AuthContext.Provider>
    );

    // console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Dc Screen');
    




  })
})