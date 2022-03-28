import handler from "../api/admin";
import AdminData from "../../components/_admin";

function Admin({ links }) {
  return <AdminData path="/admin" data={links} />
}

export async function getServerSideProps(context) {
  try {
    const res = await handler(context.req, context.res);
    console.log(res, "response");

    return {
      props: {links: res}
    }

  } catch {
    console.log("links 0 lol")
    return { redirect: {destination: "/"} };
  }
}

export default Admin;