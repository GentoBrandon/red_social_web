import styles from '../../styles/SignUpForm.module.css';

export default function SignUpForm() {
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <form className={styles.formSignup}>
          <label htmlFor="fullname">Full Name</label>
          <input className={styles.formStyling} type="text" name="fullname" placeholder="Full Name" />
          <label htmlFor="email">Email</label>
          <input className={styles.formStyling} type="email" name="email" placeholder="Email" />
          <label htmlFor="password">Password</label>
          <input className={styles.formStyling} type="password" name="password" placeholder="Password" />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input className={styles.formStyling} type="password" name="confirmpassword" placeholder="Confirm Password" />
          <button type="button" className={styles.btnSignup}>Sign up</button>
        </form>
      </div>
    </div>
  );
}
