import { FC, ReactNode, useContext } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styleLink from './customLink.module.css';
import { Context } from '../../../context/context.ts';

interface ICustomLink {
    children: ReactNode;
    to: string;
}

const CustomLink: FC<ICustomLink> = ({ children, to, ...props }) => {
    const match = useMatch(to);
    const { stateApp } = useContext(Context);
    return (
        <div>
            <Link
                to={to}
                onClick={() => stateApp.setInterfaceProfile(false)}
                className={`${styleLink.link} ${!!match && styleLink.active}`}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
};

export default CustomLink;
