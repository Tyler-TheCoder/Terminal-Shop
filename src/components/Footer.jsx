import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-info">
          <span className="footer-prompt">$</span>
          <span>
            git clone{' '}
            <a
              href="https://github.com/Tyler-TheCoder/Terminal-Shop.git"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              https://github.com/Tyler-TheCoder/Terminal-Shop.git
            </a>
          </span>
        </div>
        <div className="footer-info">
          <span className="footer-prompt">&gt;</span>
          <span>
            contact: <a href="mailto:akram.bounoua.info@gmail.com" className="footer-link">akram.bounoua.info@gmail.com</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
