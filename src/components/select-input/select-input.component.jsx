import "./select-input.styles.scss";

const SelectInput = ({ label, options, ...otherProps }) => {
  return (
    <div className="group">
      <select className="form-input" {...otherProps}>
        {options.map((optionItem, index) => (
          <option key={index} value={optionItem}>
            {optionItem}
          </option>
        ))}
      </select>
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default SelectInput;
