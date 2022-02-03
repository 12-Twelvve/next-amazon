// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import db from "../../utils/db";
// import middleware from "../../utils/db"

export default async function handler(req, res) {
  // await db.connect();
  // await db.disconnect();
  res.status(200).json({ name: 'Jack Doe' })
}

// import nextConnect from 'next-connect';
// // import middleware from '../../middleware/database';
// const handler = nextConnect();
// handler.use(middleware);

// handler.get(async (req, res) => {
//   // let doc = await req.db.collection('products').findOne()
//   // console.log(doc);
//   // res.json(doc);
//   res.status(200).json({ name: 'Jack Doe' })
// });

// export default handler;


// const MONGOURI = "mongodb+srv://oneaboveall:awesome12@cluster0.ee20i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// if (!MONGOURI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }