
import MeetupDetail from '../../components/meetups/MeetupDetail'
import {MongoClient, ObjectID} from 'mongodb'
import { Fragment } from 'react'
import Head from 'next/head'

function MeetupDetails(props){

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title} details</title>
                <meta
                    name='description'
                    content={props.meetupData.description} />
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    )
}

export async function getStaticPaths(){

    const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')

    const db =  conn.db()

    const myCollection = db.collection('meetupdb')

    const meetupList = await myCollection.find({}, {_id:1}).toArray()

    conn.close()


    return {
        fallback: false,
        paths:  meetupList.map(meetup =>({
            params:{
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId
    console.log('/////////////////////////////////////////  ',meetupId)
    const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')

    const db =  conn.db()

    const myCollection = db.collection('meetupdb')

    const meetupItem = await myCollection.findOne({_id: ObjectID(meetupId)})

    conn.close()

    return {
        props:{
            meetupData: {
                id: meetupItem._id.toString(),
                title: meetupItem.title,
                address: meetupItem.address,
                image: meetupItem.image
            }
        }
    }

}

export default MeetupDetails