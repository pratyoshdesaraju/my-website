import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="screen notfound">
      <p className="code">404</p>
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}
