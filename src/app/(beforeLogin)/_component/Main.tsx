import Image from "next/image";
import Link from "next/link";

// image
import z_logo from "../../../../public/zlogo.png";

// style
import * as styles from "./main.css";

export default function Main() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainLeft}>
        <Image src={z_logo} alt="logo" />
      </div>

      <div className={styles.mainRight}>
        <h1 className={styles.mainRightH1}>지금 일어나고 있는 일</h1>
        <h2 className={styles.mainRightH2}>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signUp}>
          계정 만들기
        </Link>
        <h3 className={styles.mainRightH3}>지금 가입하세요.</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </main>
  );
}
