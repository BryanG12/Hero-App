import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routers/AppRouter';



describe('pruebas en <AppRouter />', () => { 

  
  test('should de mostrar el login si no esta autenticado', () => { 

    const contextValue = {
      user:{
        logged:false
      }
    }
    
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    )

    // console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Login')
  })

  test('should de mostrar el componente de marvel si esta autenticado', () => { 

    const contextValue = {
      user:{
        logged:true,
        name: 'Pepe'
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    )

    // console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true)
  })
})