import handler from "../../api/admin/new-category";
import AdminData from "../../../components/_admin/index";

function NewCategory() {
  return <AdminData page='admin' path='/admin/new-category' />
}

export async function getServerSideProps(context) {
  try {
    await handler(context.req, context.res);

    return {
      props: {}
    }

  } catch {
    return { redirect: {destination: "/"} };
  }
}

export default NewCategory;