import React,{useRef} from "react";
import cssStyles from './Images.module.scss'

const Images = ({ icon, onChange,id }) => {
    const fileInputRef = useRef(null);
    
    const handleClick = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }
    return (
        <div>
            <span className={cssStyles.span} onClick={handleClick}>{icon}</span>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
                id={id}
            />
        </div>
    );
};

export default Images;
