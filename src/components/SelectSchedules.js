import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectSchedules = (props) => {

    const [schedules, setSchedules] = useState([])

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/schedule?page=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setSchedules(responses[0].data.data);
            })
            .catch((err) => {
                console.log("Error : ", err)
            })
    }

    useEffect(() => {
        loadComboData();
    }, [])


    return (
        <FormControl fullWidth sx={{ marginRight: 2 }}>
            <InputLabel id="HorarioL">Horario</InputLabel>
            <Select
                labelId="HorarioL"
                id="AttendingClassID"
                name={props.name}
                value={props.value}
                onChange={props.handleUpdate}
            >
                <MenuItem value='todos' key='AllSchedules'>Todos</MenuItem>
                {schedules.map((row,index) => (
                    <MenuItem value={row.ID} key={`ss-${index}`}>
                        {row.Description}
                    </MenuItem>
                )
                )}
            </Select>
        </FormControl>
    )
}

export default SelectSchedules