import { useEffect, useState } from "react";
import API from "../services/api";
import styles from "../styles/dashboard.module.css";

import SubscriptionCard from "../components/dashboard/SubscriptionCard";
import DrawCard from "../components/dashboard/DrawCard";
import AddScoreCard from "../components/dashboard/AddScoreCard";
import ScoresTable from "../components/dashboard/ScoreTable";

function Dashboard() {
  const [scores, setScores] = useState([]);
  const [draw, setDraw] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState({});
  const [user, setUser] = useState(null);
  let [charities, setCharities] = useState([]);

  const getData = async () => {
    const [s, d, sub, u, c] = await Promise.all([
      API.get("/scores/get"),
      API.get("/draw/result"),
      API.get("/subscription/status"),
      API.get("/auth/me"),
      API.get("/charity/getcharity"),
    ]);

    setScores(s.data);
    setDraw(d.data);
    setSubscriptionData(sub.data);
    setUser(u.data);
    setCharities(c.data);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h2>Welcome {user?.user.name}</h2>
      </div>

      <div className={styles.wrapper}>
        <SubscriptionCard
          subscriptionData={subscriptionData}
          refresh={getData}
          charities={charities}
        />
        {subscriptionData.status === "active" && <DrawCard draw={draw} />}
        {subscriptionData.status === "active" && (
          <AddScoreCard refresh={getData} />
        )}
      </div>
      {subscriptionData.status === "active" && (
        <ScoresTable scores={scores} refresh={getData} />
      )}
    </div>
  );
}

export default Dashboard;
