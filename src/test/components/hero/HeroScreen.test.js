import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";


const mockNavigate = jest.fn();


jest.mock('react-router-dom',() => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('pruebas en <HeroScreen />', () => { 
  
  
  test('no debe de mostrar HeroScreen si no hay un heroe en el URL', () => { 
    
      const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
          <Routes>
            <Route path='/hero' element={<HeroScreen />} />
            <Route path='/' element={<h1>no hay page</h1>} />
          </Routes>
    
        </MemoryRouter>
      );

    expect(wrapper.find('h1').text().trim()).toBe('no hay page');
  });
  
  test('debe de mostrar HeroScreen si hay un heroe en el URL', () => { 
    
      const wrapper = mount(
        <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Routes>
            <Route path='/hero/:heroeId' element={<HeroScreen />} />
            <Route path='/' element={<h1>no hay page</h1>} />
          </Routes>
    
        </MemoryRouter>
      );

      expect(wrapper.find('.row').exists()).toBe(true);
  });


  test('should de regresar a la pantalla anterior', () => { 

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Routes>
          <Route path='/hero/:heroeId' element={<HeroScreen />} />
        </Routes>
  
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  })

  test('debe de mostrar el No Hero Page si no tenemos el heroe(erroe erroneo)', () => { 
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spiderasdf']}>
        <Routes>
          <Route path='/hero/:heroeId' element={<HeroScreen />} />
          <Route path='/' element={<h1>no hay page</h1>} />
        </Routes>
  
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('no hay page');
});

  

})