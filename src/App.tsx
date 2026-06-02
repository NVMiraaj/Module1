
import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './layouts/Layout';
export default function App(){
return <Routes>
<Route path='/login' element={<Login/>}/>
<Route path='/' element={<Layout/>}>
<Route index element={<Dashboard/>}/>
</Route>
<Route path='*' element={<Navigate to='/'/>}/>
</Routes>
}
