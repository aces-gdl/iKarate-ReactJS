/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';

const BeltSelector = (props) => {
    const alert = useAlert();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const {onChange, value,name} = props;


    const loadData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/category?limit=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setRows(responses[0].data.data);
            })
            .catch((err) => {
                alert.error('Error leyendo categories')
                if (err.response.status === 401) {
                    navigate('/pages/login/login3')
                }
            })
    }

    useEffect(() => {
      loadData();
    }, [])
    
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="BeltSelector">Cinturon</InputLabel>
                <Select
                    labelId="CinturonLB"
                    id="Cinturon"
                    name={name}
                    value={value}
                    label="Cinturon"
                    onChange={onChange}
                >
                    {rows.map((row,index) => {
                        return <MenuItem value={row.ID} color={row.Color} key={index}>
                            <Grid container>
                                <Grid item xs={10}>{row.Description}</Grid>
                                <Grid item xs={1} style={{backgroundColor:row.Color1}} />
                                <Grid item xs={1} style={{backgroundColor:row.Color2}}/>
                            </Grid>
                        </MenuItem>
                    })}
                </Select>
            </FormControl>

        </div>
    )
}

export default BeltSelector