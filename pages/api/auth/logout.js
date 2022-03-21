import cookie from 'cookie';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        res.setHeader('Set-Cookie', cookie.serialize("tradeSmart", '', {
          httpOnly: true,
          // secure: true,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/'
        }));

        res.status(200).send("Success");
      } catch (error) {
        res.status(400).send("Invalid token");
      }  

      break;
    default:
      res.status(400).send("Invalid token");
      break;
  }
}