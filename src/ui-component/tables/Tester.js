import axios from 'axios';
import React, { useEffect } from 'react'
import TableBrowse from './TableBrowse';

export default function Tester () {
    const [rows, setRows] = React.useState([]);

    const columns = [
        { id: 'GivenName', label: 'Nombre', minWidth: 100 },
        { id: 'FamilyName', label: 'Apellido', minWidth: 100 },
        { id: 'Belt', label: 'Cinta', minWidth: 50 },
        { id: 'PermissionDescription', label: 'Permisos', minWidth: 100 },
        { id: 'actions', label: 'Acciones', minWidth: 30, FormatDisplay: 'actions', align: 'center' }
    ];

    const loadMainData = (newPage) => {
        axios.get('/v1/catalogs/users?page=' + newPage)
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }

    useEffect(() => {
      loadMainData(1);
    }, [])
    

    return (
        <TableBrowse
            loadMainData={loadMainData}
            rows={rows}
            columns={columns}
        />
    )
}

