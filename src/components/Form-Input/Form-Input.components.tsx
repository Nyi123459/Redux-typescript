import "./Form-Input.styles.scss";

const FormInput = ({ label, ...otherProps }: any) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
