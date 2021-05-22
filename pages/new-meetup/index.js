import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Head from 'next/head'

function NewMeetup() {
    const router = useRouter()
    async function addMeetUpHandler(newMeetupData) {
        console.log(newMeetupData)

        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(newMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        console.log('response', data)

        router.push('/')

    }

    return (
        <Fragment>
            <Head>
                <title>Add Meetup</title>
                <meta
                    name='description'
                    content='Add your new meetup' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetUpHandler} />
        </Fragment>
    )

}

export default NewMeetup