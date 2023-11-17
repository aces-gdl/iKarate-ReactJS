import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Box, Button, Dialog, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoadImageFromURL from 'components/LoadImageFromURL';
import './styles.css';
import { useState } from 'react';
import { IconCircle, IconPencil } from '@tabler/icons';
import Add from './Add';
import View from './View';
import SelectCategories from 'components/SelectCategories';
import SelectSchedules from 'components/SelectSchedules';


export default function BrowserList() {
    const navigate = useNavigate();
    const alert = useAlert();

    const [rows, setRows] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [schedules, setSchedules] = React.useState([]);
    const [currentRow, setCurrenRow] = React.useState({});
    const [viewOpen, setViewOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [values, setValues] = useState({
        CategoryID: 'todos',
        AttandingClassID: 'todos'
    });

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/category?page=-1'),
            axios.get('/v1/catalogs/schedule?page=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setCategories(responses[0].data.data);
                setSchedules(responses[1].data.data);
            })
            .catch((err) => {
                console.log("Error : ", err)
            })
    }
    const loadMainData = () => {

        axios.get('/v1/catalogs/users?limit=-1')
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                alert.error('Error leyendo usuarios')
                if (error.response.status === 401) {
                    navigate('/pages/login/login3')
                }
            })
    }

    useEffect(() => {
        loadMainData(1);
        loadComboData();
    }, [])



    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const openAdd = (row) => {
        setCurrenRow(row);
        setAddOpen(true);
    }

    const openView = (row) => {
        setCurrenRow(row);
        setViewOpen(true);
    }
    const handleClose = () => {
        setAddOpen(false);
        setViewOpen(false);
    }

    const RenderCard = (row) => {
        return (
            <Grid item sm={12} md={6} lg={4} key={row.ID} >
                <Paper elevation={2} >
                    <Box paddingX={2} paddingTop={2} paddingBottom={1} display={'flex'} alignItems={'center'}>
                        <LoadImageFromURL id={row.ID} imageid={row.ID} imagename={row.Name} height='100px' thumbnail />
                        <Typography variant='h4' marginLeft={1.5} component={'h2'}> {row.Name} </Typography>
                    </Box>
                    <Divider variant={'fullWidth'} />
                    <Box paddingX={2} display={'flex'} paddingY={1} justifyContent={'space-between'} >

                        <Typography variant='subtitle2' component={'h2'}>Inscrito en : 02/10/2022</Typography>
                        <Typography variant='subtitle2' component={'h2'}>Contacto : Don Panchito (33) 3238-2859</Typography>

                    </Box>
                    <Box display={'flex'} justifyContent={'end'}>
                        <Button variant={'contained'} onClick={() => openView(row)}><IconPencil size={'20'} /></Button>
                    </Box>
                </Paper>
            </Grid>
        )
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display={'flex'} justifyContent={'center'} paddingY={2}>
                <Typography variant='h2'>Catalogo de alumnos</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>

                <SelectCategories name='CategoryID' value={values.CategoryID} handleupdate={handleUpdate}/> 
                <SelectSchedules name='AttandingClassID' value={values.AttandingClassID} handleupdate={handleUpdate}/>
                <Button variant={'contained'} sx={{ marginLeft: 2, marginRight: 2 }}>Buscar</Button>
                <Button variant={'contained'} sx={{ marginLeft: 2 }} color={'secondary'} onClick={openAdd}>Nuevo</Button>
            </Box>
            <Grid container spacing={2} paddingY={2}>
                {rows.map((row) => RenderCard(row))}
            </Grid>
            <Dialog open={addOpen} onClose={handleClose} size={'lg'}>
                <Add handleClose={handleClose} row={currentRow} />
            </Dialog>
            <Dialog open={viewOpen} onClose={handleClose} >
                <View handleClose={handleClose} row={currentRow} />
            </Dialog>

        </LocalizationProvider>
    )
}

