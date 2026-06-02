
import {Container,Card,TextField,Button,Typography} from '@mui/material';
export default function Login(){
return <Container maxWidth='sm'><Card sx={{p:4,mt:10}}>
<Typography variant='h4'>Login</Typography>
<TextField fullWidth label='Email' margin='normal'/>
<TextField fullWidth label='Password' type='password' margin='normal'/>
<Button variant='contained' fullWidth>Login</Button>
</Card></Container>
}
