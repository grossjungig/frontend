import React from 'react';
import { TeamItem } from '../styled';

const StaffBoard = (props) => {
    const { styleClass, team, color, height, lang } = props;
    return (
        <div className={styleClass}>{ team.map(member => (
            <TeamItem 
              image={member.img} name={member.name}
              role={member.role[lang]} color={color} height={height}
            />
        ))}</div>
    );
};

export default StaffBoard;