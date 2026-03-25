import styles from "../../styles/admin.module.css";
import API from "../../services/api";

function CharitiesCard({ charities, refresh }) {
  const deletecharity = async (id) => {
    console.log("deleted");
    await API.delete(`/charity/deletecharity/${id}`);
    refresh();
  };
  return (
    <div className={styles.card}>
      <h3>Charities</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Charity Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {charities.map((charity) => {
            return (
              <tr key={charity.id}>
                <td>{charity.name}</td>
                <td>{charity.description}</td>
                <td>{new Date(charity.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      deletecharity(charity.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CharitiesCard;
