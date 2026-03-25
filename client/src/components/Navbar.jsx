import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
function Navbar({ user }) {
  let navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      // redirect user
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}> Golf-Charity Platform</div>
        {user && (
          <div className={styles.navLinks}>
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            {user.role == "admin" && (
              <Link to="/admin" className={styles.navLink}>
                Admin
              </Link>
            )}

            <button className={styles.navBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
