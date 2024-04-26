export default function Root(props) {
  return <section>
    {props.name} is mounted!
    <div>
    <a href='/users'>Users</a>
    </div>
  </section>;
}
