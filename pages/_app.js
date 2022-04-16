import { AuthProvider } from "../context/auth";
import { NotificationProvider } from "../context/notification";
import Layout from "../components/layout";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default MyApp
