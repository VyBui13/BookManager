import { useAuth } from 'react'

export default function ExternalDataPage() {
    const { getToken, isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        // Handle loading state however you like
        return <div>Loading...</div>
    }

    if (!isSignedIn) {
        // Handle signed out state however you like
        return <div>Sign in to view this page</div>
    }

    const fetchDataFromExternalResource = async () => {
        const token = await getToken()
        // Add logic to fetch your data
        return data
    }

    return <div>...</div>
}