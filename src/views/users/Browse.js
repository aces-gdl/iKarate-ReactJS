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

const columns = [
    { id: 'GivenName', label: 'Nombre', minWidth: 170 },
    { id: 'FamilyName', label: 'Apellido', minWidth: 100 },
    { id: 'Ranking', label: 'Posicion', minWidth: 50 },
    { id: 'CategoryDescription', label: 'Categoria', minWidth: 100 },
    { id: 'PermissionDescription', label: 'Permisos', minWidth: 100 },

];



export default function Browser() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);


    const loadData = (newPage) => {
        axios.get('/v1/catalogs/user?page=' + newPage)
            .then((response) => {
                let rowsTemp = response.data.data.map((item) => {
                    let myItem = item;
                    myItem.CategoryDescription = item.Category.Description;
                    myItem.PermissionDescription = item.Permissions.Description;
                    return myItem;
                })
                setRows(rowsTemp)
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
    

    const formatDataValue = (definition, value) => {
        let result = '';
        switch (definition.FormatDisplay) {
          case 'Text':
            result = value[definition.FieldName];
            break;
          case 'Check':
            return value[definition.FieldName] === 1 ? (
              <IconX name="simple-icon-check" />
            ) : (
              <IconX name="simple-icon-close" />
            );
    
          case 'Date':
            const myDate = new Date(value[definition.FieldName]);
            result = myDate.toLocaleDateString();
            // TODO: dd-MMM-YYYY
            break;
          case 'DateTime':
            const myDateTime = new Date(value[definition.FieldName]);
            result = `${myDateTime.toLocaleDateString()} ${myDateTime.toLocaleTimeString()}`;
            break;
                case 'Image':
                  return (
                    
                      <LoadImageFromURL
                        id={`at-row-${value.ID || ''}`}
                        height="100"
                        picurl={`/rest/api/v4/system/general/image?max_age=5&target=${definition.Target}&id=${value[definition.FieldName]}`}
                        alt="blob"
                      />
                    
                  );
          
          case 'number':
            return <Typography>{value[definition.FieldName]}</Typography>;
          case 'actions':
            return (
              <div className="d-flex justify-content-around align-items-center">
                <IconX name="simple-icon-eye" onClick={() => onViewClick(value)} />{' '}
                <IconX
                  name="simple-icon-pencil"
                  onClick={() => onEditClick(value)}
                />
              </div>
            );
    
          default:
            result = value[definition.FieldName];
            break;
        }
        return result;
      };
    

    return (
        <MainCard title="Listado de usuarios">
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
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
    );
}
