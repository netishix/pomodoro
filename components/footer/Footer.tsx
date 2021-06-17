import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className="py-2 bg-light">
      <div className="container">
        <div className="row justify-content-center py-3 small">
          <div className="col-md-4 text-center">
            <span>
              Made with&nbsp;
              <i className="bi bi-heart-fill text-danger"></i>
              &nbsp;by&nbsp;
              <a className={styles.author} href="https://github.com/netishix" target="_blank" rel="noreferrer">netishix</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
