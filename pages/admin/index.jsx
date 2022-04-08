import handler from "../api/admin";
import AdminData from "../../components/_admin";

function Admin({ links }) {
  return <AdminData page='admin' path="/admin" data={links} />
}

export async function getServerSideProps(context) {
  try {
    const res = await handler(context.req, context.res);

    return {
      props: { links: JSON.parse(res) }
    }

  } catch {
    return { redirect: {destination: "/"} };
  }
}

export default Admin;