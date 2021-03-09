import React from 'react';
import { TeamItem } from '../styled';

const StaffBoard = (props) => {
    const { className, team, color, height, lang } = props;
    return (
        <div className={className}>{ team.map(member => (
            <TeamItem 
              image={member.img} name={member.name} key={member.name}
              role={member.role[lang]} color={color} height={height} link={member.link}
            />
        ))}</div>
    );
};

export default StaffBoard;