import { useEffect, useState } from "react";
import API from "../services/api";
import styles from "../styles/admin.module.css";

import StatsCard from "../components/admin/StatsCard";
import UsersCard from "../components/admin/UsersCard";
import WinnersCard from "../components/admin/WinnersCard";
import CharitiesCard from "../components/admin/CharitiesCard";
import RunDrawCard from "../components/admin/RunDrawCard";
import AddCharityCard from "../components/admin/AddCharity";
function Admin() {
  const [users, setUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [charities, setCharities] = useState([]);
  const [draw, setDraw] = useState(null);

  const getData = async () => {
    const [u, w, c, d] = await Promise.all([
      API.get("/admin/users"),
      API.get("/admin/winners"),

      API.get("/charity/getcharity"),
      API.get("/draw/result"),
    ]);

    setUsers(u.data);
    setWinners(w.data);
    setCharities(c.data);
    setDraw(d.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Admin Panel</h2>

      <div className={styles.wrapper}>
        <StatsCard users={users} />
        <AddCharityCard refresh={getData} />
        <RunDrawCard draw={draw} refresh={getData} />
      </div>

      <div className={styles.wrapper}>
        <UsersCard users={users} />
        <WinnersCard winners={winners} refresh={getData} />
        <CharitiesCard charities={charities} refresh={getData} />
      </div>
    </div>
  );
}

export default Admin;
