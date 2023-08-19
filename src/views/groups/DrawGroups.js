import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';

const DrawGroups = () => {

    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    let nextIndex = 0;
    let currentGroup = 0;
    let titulo = false;

    const loadData = (newPage) => {
        let URL = `/v1/catalogs/getteamsbygroup?page=${newPage}&CategoryID=4234c285-5bab-49bf-a5d7-c34ff27ee256&TournamentID=0ee678be-5532-450f-883e-9a577b45652a`
        axios.get(URL)
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }


    useEffect(() => {
        loadData(1)
    }, [])


    return (
        <div>
            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered table-secondary border-primary table-hover">
                    <tbody>
                        {rows.map((group,index) => { 
                            titulo = currentGroup !== group.GroupNumber
                            currentGroup = group.GroupNumber
                            return(
                            <>
                                { titulo  &&
                                    <tr>
                                        <th colSpan={5} style={{ backgroundColor: '#EF5350' }} class="text-center "> {`Grupo ${group.GroupNumber}`} </th>
                                    </tr>
                                }
                                <tr>

                                    <th class='text-center'> {`${group.Name}`}</th>
                                    <td class='text-center'>{`${group.Name1}`}</td>
                                    <td class='text-center'>/</td>
                                    <td class='text-center'>{`${group.Name2}`}</td>
                                    <td class='text-center'>{`${group.TeamRanking}`}</td>
                                </tr>
                            </>
                        )
                        
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DrawGroups

/*

*/