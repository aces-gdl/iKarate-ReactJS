import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useEffect } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { styled } from '@mui/material/styles';
import { useAlert } from 'react-alert';
import axios from 'axios';
import SubCard from 'ui-component/cards/SubCard';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => {
    const alert = useAlert();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [category, setCategory] = React.useState();
    const [categories, setCategories] = React.useState([]);
    const [permission, setPermission] = React.useState();
    const [permissions, setPermissions] = React.useState([]);

    const SimularInscipciones = () => {

        let payload = {
            "CategoryID": "4234c285-5bab-49bf-a5d7-c34ff27ee256",
            "TournamentID": "0ee678be-5532-450f-883e-9a577b45652a"
        }
        axios.post('/v1/catalgs/simulateenrollment', payload)
            .then((response) => {
                alert.success("Inscripcion completa")
            })
            .catch((error) => {
                alert.error("Error durante la inscripcione")
            })
    }

    const CrearGrupos = () => {
        let payload = {
            "CategoryID": "4234c285-5bab-49bf-a5d7-c34ff27ee256",
            "TournamentID": "0ee678be-5532-450f-883e-9a577b45652a"
        }
        axios.post('/v1/catalgs/creategroups', payload)
            .then((response) => {
                alert.success("Inscripcion completa")
            })
            .catch((error) => {
                alert.error("Error durante la inscripcione")
            })
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    };


    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        formData.append("CategoryID", category)
        formData.append("PermissionID", permission)
        axios.post("/v1/utility/loadusers", formData);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handlePermissionChange = (event) => {
        setPermission(event.target.value);
    };

    const loadData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/categories?limit=-1'),
            axios.get('/v1/catalogs/permissions?limit=-1'),
        ]
        Promise.all(myPromises)
            .then((responses) => {
                setCategories(responses[0].data.data);
                setPermissions(responses[1].data.data);
            })
            .catch((err) => {
                console.log('Error : ', err)
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <MainCard title="TORNEOS">
            <Paper>
                <Grid container xs={12} >
                    <Grid item xs={6}>
                        <Item>
                            <SubCard title="Carga de Usuarios">
                                <FormControl fullWidth>
                                    <InputLabel id="Permission">Permisos</InputLabel>
                                    <Select
                                        labelId="{PermissionL}"
                                        id="PersmissionL"
                                        value={category}
                                        label="Permisos"
                                        onChange={handlePermissionChange}
                                    >
                                        {permissions.map((row) =>
                                            <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="Category">Categoria</InputLabel>
                                    <Select
                                        labelId="Categoryl"
                                        id="CategoryL"
                                        value={category}
                                        label="Category"
                                        onChange={handleCategoryChange}
                                    >
                                        {categories.map((row) =>
                                            <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>


                                <Input type="file" onChange={onFileChange} />
                                <Button onClick={onFileUpload}>
                                    Upload!
                                </Button>
                            </SubCard>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item><Button onClick={SimularInscipciones}>1.- Simular inscripciones</Button></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item><Button onClick={CrearGrupos}>2.- Crear Grupos</Button></Item>
                    </Grid>

                </Grid>

            </Paper>
        </MainCard>
    )
}

export default Dashboard