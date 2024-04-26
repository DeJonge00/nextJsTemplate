import styles from './feature-data-access.module.css';

/* eslint-disable-next-line */
export interface FeatureDataAccessProps {}

export function FeatureDataAccess(props: FeatureDataAccessProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to FeatureDataAccess!</h1>
        </div>
    );
}

export default FeatureDataAccess;
