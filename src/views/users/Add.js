import { Button, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import BeltSelector from 'components/BeltSelector'
import LoadImageFromURL from 'components/LoadImageFromURL'
import React, { useEffect, useState } from 'react'

const Add = (props) => {
    const { handleClose } = props
    const [values, setValues] = useState({
        CategoryID: '',
        GivenName: '',
        FamilyName: '',
        Email:'',
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

  

    const createUser = () => {
        const payload = {

        }
    }


    const handleImageUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        if (name && value) {
            setValues({ ...values, [name]: value });
            let formData = new FormData();
            formData.append("file", value);
            formData.append("ID", "a401d49b-2961-4415-841f-5e38bd546f69");
            let header = {
                headers: {
                    "Content-Type": false,
                }
            }
            axios.post("/v1/utility/imageupload", formData, header)
                .then((response) => {
                    console.log("ok : ", response)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                })
        }
    };


    return (
        <div>
            <DialogTitle align='center'  ><Typography variant='h2' sx={{backgroundColor:'lightgray'}}>Datos de alumno</Typography></DialogTitle>
            <DialogContent >
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            style={{ marginTop: '10px' }}
                            label='Nombre(s)'
                            name='GivenName'
                            value={values.GivenName}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            style={{ marginTop: '10px' }}
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            style={{ marginTop: '10px' }}
                            label='Correo electronico'
                            name='Email'
                            value={values.Email}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} alignItems={'center'}>
                        aqui
                        <LoadImageFromURL
                            loadimage
                            id="myImage"
                            name="myImage"
                            handleupdate={handleImageUpdate}
                            height='200px'
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button variant='contained' color={'error'} onClick={handleClose}>Cancelar</Button>
                <Button variant='contained' color={'secondary'} onClick={handleClose}>Crear</Button>
            </DialogActions>
        </div>
    )
}

export default Add