import aboutLocales from "../../locales/locales.aboutus.json";

import anastasia from '../../assets/images/team/anastasia.jpg';
import olga from '../../assets/images/team/olga.jpg';
import menna from '../../assets/images/team/menna.png';


const { team } = aboutLocales;

export const coreStaff = [
    {
        img: anastasia, role: team.Anastasia,
        name: 'Anastasia Krasnoperova'
    },
    {
        img: olga, role: team.Olga,
        name: 'Olga Miakotnikova'
    },
    {
        img: menna, role: team.Menna,
        name: 'Menna Hisham'
    },
]