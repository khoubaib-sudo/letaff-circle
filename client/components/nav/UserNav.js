import Link from 'next/link'


const UserNav = () => {
    return(
        <div>
            <Link className="nav-link active"  href="/user">
                Dashboard
            </Link> 
        </div>
    )
}

export default UserNav;