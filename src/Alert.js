import React , { useEffect } from 'react'

const Alert = ({msg , type , removeAlert , list}) => {
    useEffect( () => {
        const timeOut = setTimeout( () => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [list]);
    return (
        <div>
            <p className={`alert alert-${type}`}>
                {msg}
            </p>
            
        </div>
    )
}

export default Alert
