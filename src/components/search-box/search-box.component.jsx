import "./search-box.styles.scss";

const SearchBox = ({ onChangeHandler, placeholder, className }) => {
  return (
    <div className="search-wrapper">
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearchBox;
