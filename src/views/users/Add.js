import { Button, Grid, TextField } from '@mui/material';
import React from 'react'
import SubCard from 'ui-component/cards/SubCard';

const Add = (props) => {
    const [values, setValues] = React.useState({
        Name: "",
        Description: "",
        ShortName: "",
        Address: "",
        Phone: "",
        ManagerID: "",
        Active: true
    });

    const {closeModal} = props
    const handleUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    return (
        <SubCard title=" NUevo usuario">
            <Grid container sm={6}>
                <Grid item sm={6}>
                    <TextField
                        id="Name"
                        name="Name"
                        label="Nombre"
                        value={values.Name }
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item sm={6}>
                    <Button variant='outlined' onClick={()=>closeModal(false)}>Cerrar</Button>
                </Grid>
            </Grid>
        </SubCard>
    )
}

export default Add