export default function Footer(props) {
  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">© {props.date} Mesto Russia</p>
    </footer>
  );
}
