export const Alert = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    <h4 className="alert-heading">Uh-oh! Something went wrong.</h4>
    <p>{message}</p>
  </div>
);
