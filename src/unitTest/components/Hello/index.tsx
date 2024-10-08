
type HelloProps = {
  name: string;
};

function Hello({ name }: HelloProps) {
  return <h1>Hello, {name}!</h1>;
}

export default Hello;
