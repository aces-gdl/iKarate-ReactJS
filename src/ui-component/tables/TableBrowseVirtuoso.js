import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { Typography } from '@mui/material';
import { IconEdit, IconEye } from '@tabler/icons';


const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};





export default function TableBrowseVirtuoso(props) {
  const { rows, columns, openView, openUpdate, openAdd } = props

  function rowContent(_index, row) {

    const formatDataValue = (definition, value) => {
      let result = '';

      switch (columns.filter((item) => item.id === definition)[0].FormatDisplay) {
        case 'Text':
          result = value;
          break;
        case 'Date':
          const myDate = new Date(value[definition.id]);
          result = myDate.toLocaleDateString();
          // TODO: dd-MMM-YYYY
          break;
        case 'DateTime':
          const myDateTime = new Date(value[definition.id]);
          result = `${myDateTime.toLocaleDateString()} ${myDateTime.toLocaleTimeString()}`;
          break;
        case 'number':
          return <Typography>{value[definition.id]}</Typography>;
        case 'actions':
          return (
            <div className="d-flex justify-content-around align-items-center">
              <IconEye onClick={() => openView(rows[_index])} />
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
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {formatDataValue(column.id, row[column.id])}

          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.minWidth }}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  return (


    <Paper style={{ height: '100%', width: '100%' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
    </Paper>
  );
}