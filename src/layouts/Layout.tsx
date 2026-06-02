
import {Outlet} from 'react-router-dom';
import {AppBar,Toolbar,Typography,Drawer,List,ListItemButton,Box} from '@mui/material';
export default function Layout(){
return <>
<AppBar position='static'><Toolbar><Typography>HRMS</Typography></Toolbar></AppBar>
<Box sx={{display:'flex'}}>
<Drawer variant='permanent'>
<List>
<ListItemButton>Dashboard</ListItemButton>
<ListItemButton>Employees</ListItemButton>
<ListItemButton>Projects</ListItemButton>
<ListItemButton>Skills</ListItemButton>
<ListItemButton>Allocations</ListItemButton>
</List>
</Drawer>
<Box sx={{p:3,ml:'240px'}}><Outlet/></Box>
</Box>
</>
}
