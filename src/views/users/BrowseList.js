import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Button, Card, CardContent, Dialog, Grid, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import View from './View';
import { IconCirclePlus } from '@tabler/icons';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import LoadImageFromURL from 'components/LoadImageFromURL';

export default function BrowserList() {
    const navigate = useNavigate();
    const alert = useAlert();

    const [rows, setRows] = React.useState([]);
    const [currentRow, setCurrenRow] = React.useState({});
    const [viewOpen, setViewOpen] = React.useState(false);

    const columns = [
        { id: 'GivenName', label: 'Nombre', minWidth: 100, FormatDisplay: 'Text' },
        { id: 'FamilyName', label: 'Apellido', minWidth: 100, FormatDisplay: 'Text' },
        { id: 'Belt', label: 'Cinta', minWidth: 50, FormatDisplay: 'Text' },
        { id: 'PermissionID', label: 'Permisos', minWidth: 100, FormatDisplay: 'Text' },
        { id: 'actions', label: 'Acciones', minWidth: 30, FormatDisplay: 'actions', align: 'center' }
    ];

    const mainTitle = 'Cataloo de usuarios'
    const loadMainData = (newPage) => {
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

    const openAdd = () => {
        alert.success('Open Add')
    }

    const openView = (row) => {
        setCurrenRow(row);
        setViewOpen(true);

    }

    const openUpdate = () => {
        alert.success('Open Update')
    }

    const handleClose = () => {
        setViewOpen(false);
    }


    const RenderCard = (row) => {
        return (
            <Grid item sm={12} md={6} lg={4} >
                <SubCard  title={row.Name} >
                    <LoadImageFromURL imageid={row.ID} imagename={row.Name}  thumbnail/>
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

