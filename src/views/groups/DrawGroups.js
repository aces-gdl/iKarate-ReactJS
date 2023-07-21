import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const DrawGroups = () => {

    const groups = {
        "Groups": [
            {
                "Group": "1",
                "Teams": [
                    {
                        "Team": 1,
                        "Participants": [
                            {
                                "ParticipantId": 1,
                                "Name": "Juan Navarro"
                            },
                            {
                                "ParticipantId": 2,
                                "Name": "Antonio Pimentel"
                            }
                        ]
                    },
                    {
                        "Team": 2,
                        "Participants": [
                            {
                                "ParticipantId": 3,
                                "Name": "Marvin Rodriguez"
                            },
                            {
                                "ParticipantId": 4,
                                "Name": "Jose Matias Diaz"
                            }
                        ]
                    },
                    {
                        "Team": 3,
                        "Participants": [
                            {
                                "ParticipantId": 5,
                                "Name": "Miguel Padilla"
                            },
                            {
                                "ParticipantId": 6,
                                "Name": "Cesar Juarez"
                            }
                        ]
                    },
                    {
                        "Team": 4,
                        "Participants": [
                            {
                                "ParticipantId": 7,
                                "Name": "Juan Navarro Jr"
                            },
                            {
                                "ParticipantId": 8,
                                "Name": "Juanita Banana"
                            }
                        ]
                    }

                ]
            }
        ]
    };


    return (
        <div>
            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered table-secondary border-primary table-hover">
                    <thead >
                        <tr >
                            <th colSpan={4} style={{ backgroundColor: '#EF5350' }} class="text-center "> {`Grupo ${groups.Groups[0].Teams[0].Team}`} </th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.Groups[0].Teams.map((team) => (
                            <tr>
                                <th class='text-center'> {`Equipo ${team.Team}`}</th>
                                <td class='text-center'>{team.Participants[0].Name}</td>
                                <td class='text-center'>/</td>
                                <td class='text-center'>{team.Participants[1].Name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DrawGroups

