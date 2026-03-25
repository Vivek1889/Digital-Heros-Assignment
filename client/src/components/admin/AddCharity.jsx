import { useState } from "react";
import API from "../../services/api";
import styles from "../../styles/admin.module.css";

function AddCharityCard({ refresh }) {
  const [form, setForm] = useState({
    charityname: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCharity = async (e) => {
    e.preventDefault();

    await API.post("/charity/addcharity", form);

    setForm({
      charityname: "",
      description: "",
    });

    refresh?.(); // optional if you later fetch charities
  };

  return (
    <div className={styles.card}>
      <h3>Add New Charity</h3>

      <form onSubmit={addCharity}>
        <input
          type="text"
          name="charityname"
          placeholder="Enter Name"
          value={form.charityname}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter Description for charity"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" className={styles.runBtn}>
          Add Charity
        </button>
      </form>
    </div>
  );
}

export default AddCharityCard;
