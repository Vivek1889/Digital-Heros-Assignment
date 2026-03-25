import { useState } from "react";
import API from "../../services/api";
import styles from "../../styles/dashboard.module.css";
import { FaCoins } from "react-icons/fa";

function SubscriptionCard({ subscriptionData, charities, refresh }) {
  const [form, setForm] = useState({
    plan_type: "",
    charity_percentage: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subscribe = async () => {
    await API.post("/subscription/create", form);
    refresh();
  };

  return (
    <div className={styles.card}>
      <h3>
        <FaCoins /> Subscription
      </h3>

      {subscriptionData?.status === "active" ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Plan Type</th>
              <th>Status</th>
              <th>End Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{subscriptionData?.plan_type || "N/A"}</td>
              <td>{subscriptionData?.status}</td>
              <td>
                {subscriptionData?.end_date
                  ? new Date(subscriptionData.end_date).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          <p>Inactive ❌</p>
          <h3>Subscribe to play</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              subscribe();
            }}
          >
            <select
              name="plan_type"
              value={form.plan_type}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select Subscription type</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className={styles.formRow}>
              <input
                type="number"
                name="charity_percentage"
                value={form.charity_percentage}
                onChange={handleChange}
                placeholder="Charity Percentage > 10%"
              />

              <select name="charity" id="" className={styles.select}>
                <option value="ngo">---Select Charity---</option>
                {charities.map((charity) => (
                  <option key={charity.id} value={charity.id}>
                    {charity.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
            />

            <button className={`${styles.btn} ${styles.primary}`}>
              Subscribe
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default SubscriptionCard;
