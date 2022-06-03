import React from "react";

const Input = (props) => {
    const { label, error, name, placeholder, onChange, type, defaultValue } = props
    const className = error ? "form-control is-invalid" : "form-control";

    return (
        <div className="form-floating mb-3">
            <input name={name} type={type} className={className} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} />
            <label>{label}</label>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default Input;
