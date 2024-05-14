
import Device from "./components/device"; // Assuming UserList is your user list component

export default function Root(props) {
  return <section>
    <div>
    <Device/>
    <a href='/users'>Users</a>
    </div>
  </section>;
}
