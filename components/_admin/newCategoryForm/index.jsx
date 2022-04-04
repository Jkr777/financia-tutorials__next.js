import { useState } from "react";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import styles from "../../_auth/auth.module.css";

function NewCategoryForm({ defaultVal }) {
  const [formData, setFormData] = useState(defaultVal);

  function handleImg(e) {
    if(e.target.files[0]) {
      const imageFile = e.target.files[0];
      const options = {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };

      imageCompression(imageFile, options).then(compressedFile => {
        setFormData(prev => ({...prev, img: compressedFile }));
      }).catch(error => {
        alert(error);
      });
    }
  }

  const handleDataChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("image", formData.img);
    data.append("body", JSON.stringify(formData));
    
    try {
      const res = await axios.post('/api/categories/upload-img', data);
      console.log("res: ", res.data);
    } catch (error) {
      console.log("error", error);
    }
    setFormData(defaultVal);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles["container__sub-title"]}>Create a new category</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          className={styles.form__input}
          type="text"
          name="categoryName"
          maxLength="255"
          minLength="3"
          autoFocus
          required
          autoComplete="off"
          placeholder="category name"
          value={formData.categoryName}
          onChange={handleDataChange}
        />      
      
        <textarea 
          className={styles['form__input--textarea']}
          type="text"
          name="info"
          minLength="55"
          maxLength="555"
          value={formData.info}
          placeholder="some info about this category"
          required
          onChange={handleDataChange}
        />      
      
        <input 
          className={styles['form__input--upload']}        
          type="file"
          required
          name="img"
          accept="image/*"
          onChange={handleImg}
        />
        <button className={styles.form__btn}>Create</button>
    </form>
    </div>
  );
}

NewCategoryForm.defaultProps = {
  defaultVal: {
    categoryName: "",
    info: "",
    img: ""
  }
}

export default NewCategoryForm;