
import {MongoClient} from 'mongodb'

async function handler(req, res){
    if(req.method === 'POST'){

        //const {title, image, address, description} = req.body

        const data= req.body

        const conn = await MongoClient.connect(
            'mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority'
        )

        const db = conn.db()

        const meetupCollection = db.collection('meetupdb')

        const result = await meetupCollection.insertOne(data)

        console.log('result' , result)

        conn.close()

        res.status(201).json({
            message: 'Meetup inserted successfully..!'
        })
    }

}

export default handler