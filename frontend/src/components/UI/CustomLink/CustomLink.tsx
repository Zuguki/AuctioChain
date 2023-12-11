import { FC, LinkHTMLAttributes, ReactNode } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styleLink from './customLink.module.css';

interface ICustomLink extends LinkHTMLAttributes<HTMLLinkElement> {
    children: ReactNode;
    to: string;
}

const CustomLink: FC<ICustomLink> = ({ children, to, ...props }) => {
    const match = useMatch(to);
    return (
        <div>
            <Link
                to={to}
                className={`${styleLink.link} ${!!match && styleLink.active}`}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
};

export default CustomLink;
