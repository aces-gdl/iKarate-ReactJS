import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Dialog } from '@mui/material';
import TableBrowseVirtuoso from 'ui-component/tables/TableBrowseVirtuoso';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import View from './View';

export default function Browser() {
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
        setCurrenRow (row);
        setViewOpen(true);

    }

    const openUpdate = () => {
        alert.success('Open Update')
    }

    const handleClose = () =>{
        setViewOpen(false);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
                {rows && rows.length > 0 && (
                    <TableBrowseVirtuoso
                        rows={rows}
                        columns={columns}
                        openView={openView}
                        openUpdate={openUpdate}
                        openAdd={openAdd}
                    />
                )}
                <Dialog open={viewOpen} onClose={handleClose} >
                    <View handleClose={handleClose} row={currentRow} />
                </Dialog>
            </>
        </LocalizationProvider>
    )
}

