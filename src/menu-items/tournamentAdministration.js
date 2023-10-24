// assets
import { IconBrandChrome, IconBeach,IconUser, IconUsers,IconTournament,IconUserPlus, IconCalendarStats } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconBeach, IconUser, IconUsers,IconTournament,IconUserPlus,IconCalendarStats };
// ==============================|| MENU Adminstracion ||============================== //

const tournamentAdministration = {
    id: 'Commercial',
    title: 'TorneosComercial',
    type: 'group',
    children: [
        {
            id: 'Inscripciones',
            title: 'Inscripciones',
            type: 'item',
            url: '/views/tournament/teamsenrolled',
            icon: icons.IconUserPlus,
            breadcrums: true
        },
        {       
            id: 'MonthlyPayments',
            title: 'Pagos mensuales',
            type: 'item',
            url: '/views/tournament/dashboard',
            icon: icons.IconTournament,
            breadcrums: true
        },
        {
            id: 'Attendance',
            title: 'Asistencia',
            type: 'item',
            url: '/views/groups/draw',
            icon: icons.IconUsers,
            breadcrums: true
        },
        {
            id: 'Eventos',
            title: 'Eventos',
            type: 'item',
            url: '/views/users/browse',
            icon: icons.IconCalendarStats,
            breadcrums: true
        }
    ]

};

export default tournamentAdministration;
