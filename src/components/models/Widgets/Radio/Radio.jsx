import React from "react";
import cssStyles from './Radio.module.scss'

const Radio = ({radioItem,onChange,value}) => {
    return (
        <div className={cssStyles.RadioContainer}>
            {radioItem?.map(item => (
                <div className={cssStyles.RadioItemBlock} key={item.id}>
                    <input className={cssStyles.hidden} type="radio" id={item.id} value={item.id} name="radioGroup" onChange={onChange} checked={!value !== item.id} />
                    <label htmlFor={item.id}>
                        <span>
                            <img className={cssStyles.RadioImage} src={item.name} alt={item.id}/>
                        </span>
                        <span className={cssStyles.radio}></span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Radio;
