import { Button, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import LoadImageFromURL from 'components/LoadImageFromURL'
import SelectCategories from 'components/SelectCategories'
import SelectSchedules from 'components/SelectSchedules'
import React, { useEffect, useMemo, useState } from 'react'

const Add = (props) => {
    const { handleClose } = props
    const [values, setValues] = useState({
        CategoryID: '',
        GivenName: '',
        FamilyName: '',
        Email: '',
        ScheduleID: '',
        PermissionID: '',
        Observations: '',

    });
    const [myImage, setMyImage] = useState('');


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
            'Email': values.Email,
            'Name': `${values.GivenName}, ${values.FamilyName}`,
            'FamilyName': values.FamilyName,
            'GivenName': values.GivenName,
            'StartDate': values.StartDate.toISOString(),
            'Observations': values.Observations,
            'ContactName': values.ContactName,
            'ContactPhone': values.ContactPhone,
            'ScheduleID': values.ScheduleID,
            'SeleccionadoID': '',
            'Birthday': values.Birthday.toISOString(),
            'PermissionID': values.PermissionID,
            'CategoryID': values.CategoryID
        }
        if (values.myImage.length > 0) {
            payload.HasPicture = 1;
        }
        axios.post('/v1/catalogs/users', payload)
            .then((response) => {

                if (values.myImage && values.myImage != '') {
                    imagePOST(response.data.ID)
                }
            })
            .catch((err) => {
                console.log('Error al crear usuario')
            })

        //    handleClose();
    }


    const imagePOST = (imageID) => {
        let formData = new FormData();
        formData.append("file", values.myImage);
        formData.append("ID", imageID);
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
    };


    return (
        <div>
            <DialogTitle align='center'  ><Typography  sx={{ backgroundColor: 'lightgray' }}>Datos de alumno</Typography></DialogTitle>
            <DialogContent >
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            style={{ marginTop: '10px' }}
                            label='Nombre(s)'
                            name='GivenName'
                            value={values.GivenName}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            size='small'
                            style={{ marginTop: '10px' }}
                            fullWidth
                            label='Apellido(s)'
                            name='FamilyName'
                            value={values.FamilyName}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            style={{ marginTop: '10px' }}
                            label='Contacto'
                            name='ContactName'
                            value={values.ContactName}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            size='small'
                            style={{ marginTop: '10px' }}
                            fullWidth
                            label='Telefono de Contacto'
                            name='ContactPhone'
                            value={values.ContactPhone}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectCategories name='CategoryID' value={values.CategoryID} handleupdate={handleUpdate} />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectSchedules name='ScheduleID' value={values.ScheduleID} handleupdate={handleUpdate} />

                    </Grid>
                    <Grid item xs={12} md={6}>

                        <FormControl size='small' fullWidth>
                            <DatePicker
                                label="Fecha de Ingreso"
                                name="StartDate"
                                value={values.StartDate}
                                onChange={(newValue) => handleDateUpdate(newValue, "StartDate")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <DatePicker
                                size='small'
                                label="Fecha de Nacimiento"
                                name="BirthDate"
                                value={values.Birthday}
                                onChange={(newValue) => handleDateUpdate(newValue, "Birthday")}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <TextField
                            size='small'
                            style={{ marginTop: '10px' }}
                            fullWidth
                            label='Seleccionado'
                            name='SeleccionadoID'
                            value={values.SeleccionadoID}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size='small'
                            style={{ marginTop: '10px' }}
                            label='Correo electronico'
                            name='Email'
                            value={values.Email}
                            onChange={handleUpdate}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size='small'
                            style={{ marginTop: '10px' }}
                            label='Observaciones'
                            name='Observations'
                            value={values.Observations}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} alignItems={'center'}>
                        <LoadImageFromURL
                            loadimage
                            id="myImage"
                            name="myImage"
                            imageid='1'
                            handleupdate={handleUpdate}
                            height='200px'
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button variant='contained' color={'error'} onClick={handleClose}>Cancelar</Button>
                <Button variant='contained' color={'secondary'} onClick={createUser}>Crear</Button>
            </DialogActions>
        </div>
    )
}

export default Add