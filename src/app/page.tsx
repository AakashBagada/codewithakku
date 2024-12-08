// import Image from "next/image";
import Link from "next/link";
import HomeCompononets from "./Components/homepage";
import styles from "/styles/Login.module.css"

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div>
      <h1 className={styles.title}>Code with Akku</h1>
      <Link href="/login">
         <button className={styles.loginButton}>Go to Login Page</button> 
      </Link>
      <HomeCompononets/>
    </div>
  </div>
  );
}

