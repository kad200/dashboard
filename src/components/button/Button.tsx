import React from "react";
import "button.css";

interface Props {
    children: string;
    type: any;
    onClick: () => void;
    buttonStyle: STYLES;
    buttonSize: SIZES;
}


type STYLES = [
    "btn--primary",
    "btn--danger"
]

type SIZES = [
    "btn--small",
    "btn--large"
]


export const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {

    return (
        <button className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
};
