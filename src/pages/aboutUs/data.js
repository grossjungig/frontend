import aboutLocales from "../../locales/locales.aboutus.json";

import anastasia from '../../assets/images/team/anastasia.jpg';
import olga from '../../assets/images/team/olga.jpg';
import menna from '../../assets/images/team/menna.jpg';

import luca from '../../assets/images/team/luca.png';
import magda from '../../assets/images/team/magdalena.jpg';
import maria from '../../assets/images/team/maria.png';
import nida from '../../assets/images/team/nida.jpg';
import pablo from '../../assets/images/team/pablo.jpg';
import rosina from '../../assets/images/team/rosina.png';
import skander from '../../assets/images/team/skander.jpg';
import sree from '../../assets/images/team/sree.jpg';
import tammy from '../../assets/images/team/tammy.jpg';
import vicky from '../../assets/images/team/vicky.jpg';
import vlad from '../../assets/images/team/vlad.jpg';


const { team } = aboutLocales;

export const coreStaff = [
    {
        img: anastasia, role: team.Anastasia, name: 'Anastasia Krasnoperova',
        link: 'https://www.linkedin.com/in/anastasia-krasnoperova/'
    },
    {
        img: olga, role: team.Olga, name: 'Olga Miakotnikova',
        link: 'https://www.linkedin.com/in/olga-miakotnikova/'
    },
    {
        img: menna, role: team.Menna, name: 'Menna Hisham',
        link: 'https://www.linkedin.com/in/minatallah-hisham/'
    }
]

export const staff = [
    { img: luca, role: team.Luca, name: 'Luca' },
    { img: tammy, role: team.Tammy, name: 'Tammy' },
    { img: rosina, role: team.Rosina, name: 'Rosina' },
    { img: pablo, role: team.Pablo, name: 'Pablo' },
    { img: vicky, role: team.Vicky, name: 'Vicky' },
    { img: magda, role: team.Magda, name: 'Magdalena' },
    { img: nida, role: team.Nida, name: 'Nida' },
    { img: maria, role: team.Maria, name: 'Maria' },
    { img: sree, role: team.Sree, name: 'Sree' },
    { img: skander, role: team.Skander, name: 'Skander' },
    { img: vlad, role: team.Vlad, name: 'Vlad' }
];
