import { Button, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import BeltSelector from 'components/BeltSelector'
import React, { useEffect, useState } from 'react'

const View = (props) => {
    const { handleClose } = props
    const {CategoryID, GivenName, FamilyName} = props.row
    const [values, setValues] = useState({
        CategoryID: '',
        GivenName: '',
        FamilyName: '',
    });


    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleDateUpdate = (newValue, name) => {
        // setHasChanges(true);
        if (name && newValue) {
            setValues({ ...values, [name]: newValue });
        }
    };

    useEffect(() => {
        setValues({
            CategoryID: CategoryID,
            GivenName: GivenName,
            FamilyName: FamilyName
        })
    }, [])


    return (
        <div>
            <DialogTitle >Ver Datos de usuario</DialogTitle>
            <DialogContent >
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            style={{marginTop:'10px'}}
                            label='Nombre(s)'
                            name='GivenName'
                            value={values.GivenName}
                            onChange={handleUpdate}
                        />

                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                             style={{marginTop:'10px'}}
                            fullWidth
                            label='Apellido(s)'
                            name='FamilyName'
                            value={values.FamilyName}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BeltSelector
                            name='CategoryID'
                            value={values.CategoryID}
                            onChange={handleUpdate}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <DatePicker
                                label="Fecha de Nacimiento"
                                name="BirthDate"
                                value={values.Birthday}
                                onChange={(newValue) => handleDateUpdate(newValue, "Birthday")}
                            />
                        </FormControl>

                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
                <Button variant='outlined' onClick={handleClose}>Aceptar</Button>
            </DialogActions>
        </div>
    )
}

export default View