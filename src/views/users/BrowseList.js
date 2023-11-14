import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SubCard from 'ui-component/cards/SubCard';
import LoadImageFromURL from 'components/LoadImageFromURL';
import './styles.css';


export default function BrowserList() {
    const navigate = useNavigate();
    const alert = useAlert();

    const [rows, setRows] = React.useState([]);
    const [currentRow, setCurrenRow] = React.useState({});
    const [viewOpen, setViewOpen] = React.useState(false);


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
    }, [])






    const RenderCard = (row) => {
        return (
            <Grid item sm={12} md={6} lg={4} >
                <SubCard  title={row.Name} >
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <LoadImageFromURL imageid={row.ID} imagename={row.Name} height='100px' thumbnail />

                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={1} >
                                <Grid item xs={3}><Typography variant='h4'>Cinta:</Typography></Grid>
                                <Grid item xs={5}><Typography variant='body1'>{row.CategoryDescription} </Typography></Grid>
                                <Grid item xs={4} ><Typography variant='body1'><div style={{background:`linear-gradient(to right,${row.Color1},${row.Color2})`}}>. </div></Typography></Grid>
                            </Grid>
                            <Grid container spacing={1} >
                                <Grid item xs={3}><Typography variant='h4'>Correo:</Typography></Grid>
                                <Grid item xs={9}><Typography variant='body1'>{row.Email}</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
                </Grid>
        )
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} >
                {rows.map((row) => RenderCard(row))}
            </Grid>
        </LocalizationProvider>
    )
}

