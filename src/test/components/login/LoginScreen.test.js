import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate
}))

const contextValue = {
  dispatch:jest.fn(),
  user:{
    logged:false,
  }
}

const wrapper = mount(
  <AuthContext.Provider value={contextValue}>
    <MemoryRouter  initialEntries={ ['/login']} >
      <LoginScreen />

    </MemoryRouter>

  </AuthContext.Provider>
);
// jest.spyOn(window.localStorage.__proto__,'setItem');
// window.localStorage.__proto__.setItem = jest.fn();



describe('Pruebas en <LoginScreen />', () => { 


  test('should de hacer match con snapshot', () => { 
    
    expect(wrapper).toMatchSnapshot();

  });

  test('should de reakuzar el dispatch y la navigate', () => { 

    const handleClick = wrapper.find('button').prop('onClick');

    handleClick();
    
    expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.login,
      payload: {
        name: 'Spike'
      }});

    expect(mockNavigate).toHaveBeenCalledWith('/',{replace:true});
      


    localStorage.setItem('lastPath','/search');

    handleClick();
    expect(mockNavigate).toHaveBeenCalledWith('/search',{replace:true});

  });

})