import Image from "next/image";
import z_logo from "../../../../public/zlogo.png";
import styles from "@/app/(beforeLogin)/_component/main.module.css";
import Link from "next/link";

export default function Main() {
  return (
    <main className={styles.main_container}>
      <div className={styles.main_left}>
        <Image src={z_logo} alt="logo" />
      </div>

      <div className={styles.main_right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>지금 가입하세요.</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </main>
  );
}
