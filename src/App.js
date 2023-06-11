import { Route, Routes } from 'react-router-dom';
import { useCheckAuthBack } from './hooks/useCheckAuthBack';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import GuidePage from './components/GuidePage/GuidePage';
import NavBar from './components/NavBar/NavBar';
import RendicionPage from './components/RendicionPage/RendicionPage';
import RendicionGeneral from './components/RendicionGeneral/RendicionGeneral';
import PersonalSellTable from './components/TablesPayments/PersonalSellTable/PersonalSellTable';
import HistorialAnticipos from './components/HistorialAnticipos/HistorialAnticipos';
import Metricas from './components/Metricas/Metricas';
import InventarioVales from './components/InventarioVales/InventarioVales';

function App() {
  
  const authBack = useCheckAuthBack();
  if(authBack.status === 'checking'){
    return <h1>Checking...</h1>
  }

  return (
    <>
      {
        (authBack === 'logged') ?
        //si estoy en guide, no muestro el navbar
        <>
          <NavBar />
          <Routes>
            <Route path="/home" element={<MainPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/rendicion" element={<RendicionPage />} />
            <Route path="/rendicionGeneral" element={<RendicionGeneral />} />
            <Route path="/personalSellTable" element={<PersonalSellTable />} />
            <Route path="/historialAnticipos" element={<HistorialAnticipos />} />
            <Route path="/metricas" element={<Metricas />} />
            <Route path="/inventarioVales" element={<InventarioVales />} />
          </Routes>
        </>
        :
        <Routes>
          <Route path="/*" element={<LoginPage />} />
        </Routes>
      }
    </>
  );
}

export default App;
