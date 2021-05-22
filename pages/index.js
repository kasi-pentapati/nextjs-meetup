import MeetupList from '../components/meetups/MeetupList'
import {MongoClient} from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react'


function HomePage(props){

    // const [meetupList, setMeetupList] = useState([])
    // useEffect(() =>{
    //     setMeetupList(DUMMY_MEETUPS)
    //  },[])

    return (
        <Fragment>
            <Head>
                <title>Kasi Meetups</title>
                <meta
                    name='description'
                    content='Add your meetups and build your netrwork' />
            </Head>
            <MeetupList meetups={props.meetupList} />
        </Fragment>
    )
}

// export async function getServerSideProps(context){

//     const req = context.req
//     const res = context.res

//     const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')

//     const db =  conn.db()

//     const myCollection = db.collection('meetups')

//     const meetupList = await myCollection.find().toArray()

//     conn.close()

//     return {
//         props:{
//             meetupList: meetupList.map(meetup => ({
//                 title: meetup.title,
//                 address: meetup.address,
//                 description: meetup.description,
//                 image: meetup.image,
//                 id: meetup._id.toString()
//             }))
//         }
//     }
// }

export async function getStaticProps(){

    const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')

    const db =  conn.db()

    const myCollection = db.collection('meetupdb')

    const meetupList = await myCollection.find().toArray()

    console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]   ',meetupList)

    conn.close()

    return {
        props:{
            meetupList: meetupList.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage