function withAdmin(handler, role) {
  return async (req, res) => {
    if(req.user.role !== role) {
      if(!res.status) throw({});
    }

    return handler(req, res);
  }
}

export default withAdmin;