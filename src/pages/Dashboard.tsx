
import {Grid,Card,CardContent,Typography} from '@mui/material';
const items=[['Employees',250],['Projects',40],['Billable',180],['Bench',70]];
export default function Dashboard(){
return <>
<Typography variant='h4'>Dashboard</Typography>
<Grid container spacing={2}>
{items.map(i=><Grid key={String(i[0])}><Card><CardContent>
<Typography>{i[0]}</Typography><Typography variant='h4'>{i[1]}</Typography>
</CardContent></Card></Grid>)}
</Grid>
</>
}
