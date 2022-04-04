 function Inputs({ formData, handleChange, style }) {
  return (
    <>
      <input 
        className={style}
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        maxLength="255"
        minLength="3"
        placeholder="title"
        autoFocus
        required
      />      
      
      <input 
        className={style}
        type="text"
        name="url"
        value={formData.url}
        onChange={handleChange}
        maxLength="255"
        minLength="3"
        placeholder="url"
        required
      />
    </>
  );
}

export default Inputs;