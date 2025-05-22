import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../redux/action/authAction'

const Home = () => {
    const profile = useSelector(root => root?.auth)
    const dispatch = useDispatch()

    useEffect(() => dispatch(fetchProfile(profile?.token)), [])

    return (
        <div>home</div>
    )
}

export default Home