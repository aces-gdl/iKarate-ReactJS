import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { IconCircle } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectCategories = (props) => {

    const [categories, setCategories] = useState([])

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/category?page=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setCategories(responses[0].data.data);
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
                <InputLabel id="CategoryL">Cinturon</InputLabel>
                <Select
                 labelId="CategoryL"
                 id={props.name}
                 name={props.name}
                 value={props.value}
                 label="Category"
                 onChange={props.handleupdate}>

                <MenuItem value='todos' key='AllCategories'>Todos</MenuItem>
                {categories.map((row) => {
                    return <MenuItem value={row.ID} key={row.ID}>
                        <Grid container  key={`gc-${row.id}`}>
                            <Grid item xs={10}>{row.Description}</Grid>
                            <Grid item xs={1} ><Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: `${row.Color1}`, border: 0.5 }}><IconCircle color={row.Color1} /></Box></Grid>
                            <Grid item xs={1} ><Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: `${row.Color2}`, border: 0.5 }}><IconCircle color={row.Color2} /></Box></Grid>
                        </Grid>
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default SelectCategories