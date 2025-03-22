import { Redirect } from "expo-router";

const Home = () => {
  console.log("CLIENT ID:====== ", process.env.EXPO_PUBLIC_PROJECT_ID);
  return <Redirect href="./(auth)/welcome" />
}


export default Home;