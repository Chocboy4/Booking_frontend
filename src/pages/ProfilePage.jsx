import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, Link, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../AccountNav"

export default function ProfilePage() {
    const {ready, user, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)

    let {subpage} = useParams()
    if (subpage === undefined){
        subpage = 'profile'
    }

    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)

    }

    if(!ready) {
        return "Loading...."
    }

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    // function linkClasses (type = null) {
    //     let classes = 'inline-flex gap-1 py-2 px-6 rounded-full'

    //     if(type === subpage) {
    //         classes += ' bg-primary text-white'
    //     }else{
    //         classes += ' bg-gray-200';
    //     }
    //     return classes
    // }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto mb-8">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="bg-primary w-72 text-white py-1 rounded-[25px] max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}