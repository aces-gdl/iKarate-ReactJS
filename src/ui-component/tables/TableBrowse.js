import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { AppBar, Button, Dialog, Toolbar, Typography } from '@mui/material';
import { IconEdit, IconEye, IconPlus} from '@tabler/icons';





export default function TableBrowse(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [modalOpen, setModalOpen] = React.useState(false);

    const { title, addTitle, loadMainData, columns, rows, add } = props;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        loadMainData(newPage + 1)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    const openView = (value) => {
        console.log("View ", value)
    }
    const openUpdate = (value) => {
        console.log("Update ", value)
        setModalOpen(true);
    }

    const formatDataValue = (definition, value) => {
        let result = '';
        switch (definition.FormatDisplay) {
            case 'Text':
                result = value[definition.id];
                break;
            /*         case 'Check':
                       return value[definition.FieldName] === 1 ? (
                         <IconX name="simple-icon-check" />
                       ) : (
                         <IconX name="simple-icon-close" />
                       );
               
              */
            case 'Date':
                const myDate = new Date(value[definition.id]);
                result = myDate.toLocaleDateString();
                // TODO: dd-MMM-YYYY
                break;
            case 'DateTime':
                const myDateTime = new Date(value[definition.id]);
                result = `${myDateTime.toLocaleDateString()} ${myDateTime.toLocaleTimeString()}`;
                break;
            /*        case 'Image':
                        return (
                        
                            <LoadImageFromURL
                            id={`at-row-${value.ID || ''}`}
                            height="100"
                            picurl={`/rest/api/v4/system/general/image?max_age=5&target=${definition.Target}&id=${value[definition.FieldName]}`}
                            alt="blob"
                            />
                        
                        );
              */
            case 'number':
                return <Typography>{value[definition.id]}</Typography>;
            case 'actions':
                return (
                    <div className="d-flex justify-content-around align-items-center">
                        {/*    <IconX name="simple-icon-eye" onClick={() => onViewClick(value)} />{' '} */}
                        <IconEye onClick={() => openView(value)} />
                        <IconEdit onClick={() => openUpdate(value)} />
                    </div>
                );

            default:
                result = value[definition.id];
                break;
        }
        return result;
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <MainCard darkTitle secondary={<Button variant="outlined" onClick={add}><IconPlus  />Usuario </Button>} title={<>
            <Typography variant='h2'> Listado de usuarios</Typography>
            </>}>

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
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {formatDataValue(column, row)}
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
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                {/* <Update data={user} categories={categories} /> */}
            </Dialog>
        </Paper>
    );
}

