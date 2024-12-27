import {HTMLAttributes} from "react";

export interface MdxComponentProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export interface CodeBlockProps extends MdxComponentProps {
    node?: any,
    inline?: boolean,
    className?: string;
    language?: string;
}
