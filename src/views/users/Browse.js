import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { IconEdit } from '@tabler/icons'; 
import { minWidth } from '@mui/system';
const columns = [
    { id: 'GivenName', label: 'Nombre', minWidth: 170 },
    { id: 'FamilyName', label: 'Apellido', minWidth: 100 },
    { id: 'Ranking', label: 'Posicion', minWidth: 50 },
    { id: 'CategoryDescription', label: 'Categoria', minWidth: 100 },
    { id: 'PermissionDescription', label: 'Permisos', minWidth: 100 },
    { id: 'EditRecord', label:'Edit', minWidth: 50, type:'Clickable'}
];


export default function Browser() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);


    const loadData = (newPage) => {
        axios.get('/v1/catalogs/users?page=' + newPage)
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        loadData(newPage + 1)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    useEffect(() => {
        loadData(1)
    }, [])

  
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant='h3' sx={{ flexGrow: 1 }}>Listado de Usuarios</Typography>
                    <Button color="inherit">Cargar Clubs</Button>
                </Toolbar>
            </AppBar>
            <MainCard >

                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: '85%' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                           
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        count={-1}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </MainCard>
        </Paper>
    );
}

