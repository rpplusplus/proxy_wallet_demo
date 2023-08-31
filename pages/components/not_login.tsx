import { signIn } from "next-auth/react"

const NotLogin = () => {
    return (<>
        <div>Please sign in first</div>
        <button className='btn mt-5' onClick={()=>signIn()}>Sign In</button>
      </>)
}

export default NotLogin