export default function Home(props) {
  // copy prev workout dropdown

  // new workout button
  const { selectedWorkouts } = props;

  return <div>{selectedWorkouts}</div>;
}
