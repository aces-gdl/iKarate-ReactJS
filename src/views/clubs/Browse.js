import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Typography } from '@mui/material';

const columns = [
    { id: 'Name', label: 'Nombre', minWidth: 100 },
    { id: 'Description', label: 'Descripcion', minWidth: 170 },
    {
        id: 'Address',
        label: 'Direccion',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Contact',
        label: 'Contacto',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Phone',
        label: 'Telefono',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

const useStyles = makeStyles({

});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('/v1/catalogs/club')
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }, [])


    return (

        <MainCard title="Catalogo de Clubs">
            <Paper>
                <TableContainer >
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
             
                <Grid container>
                    <Grid item xs={11} style={{ textAlign: 'right' }}>
                        {`< 1 - 10 >`}
                    </Grid>
                </Grid>

            </Paper>
        </MainCard>
 
    );
}
