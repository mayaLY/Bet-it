import styles from './AuthPage.module.scss';
import { goToRegister } from './AuthPageVM';

const AuthPage = () => {

    const {  error, loading, handleRegister } = goToRegister(); 

    return (
        <div className={styles.AuthPage}>
            {loading?<span>Loading...</span>: <button onClick={handleRegister}>Register</button>}
            {error && <div>{error}</div>}
           
        </div>
    )
}

export default AuthPage