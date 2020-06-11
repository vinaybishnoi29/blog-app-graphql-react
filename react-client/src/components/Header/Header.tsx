import React from 'react';
import {Label, Input} from 'reactstrap';
import './Header.css';
/**
 * @description Interface for Props
 * @param headerLabel  Prop for 'header Text'.
 */
interface Props {
    headerLabel:string;
}

/**
 * Header Component
 */
const Header:React.FC<Props> = ({headerLabel}:Props) => {
    return (
        <div className='Header'>
            <div>
                <h1 className='Header_Content_heading'>
                    {headerLabel}
                </h1>
            </div>
            <div>
                <Label check>
                <Input type="checkbox" id="darkThemeCheckbox" />{' '}
                  Dark theme
                </Label>
            </div>
        </div>
    );
};

export default Header;