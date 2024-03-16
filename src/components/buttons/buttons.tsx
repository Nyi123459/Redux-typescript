import "./buttons.styles.scss";

export const BUTTON_TYPE_CLASSES: String | any = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }: any) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
