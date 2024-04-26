export default function Root(props) {

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwt_token');
    // Redirect to the login page or perform any other necessary actions
    window.location.href = '/login'; // Replace '/login' with the URL of your login page
  };

  return (
    <section>
      {props.name} is mounted!
      <div>
        <a href="/devices">Devices</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
}
