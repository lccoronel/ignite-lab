import { GetServerSideProps } from "next"
import { getAccessToken, getSession, useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"

export default function Home() {
  const {user} = useUser()

  return (
    <div>
      <h1>Hello world</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <Link href="/api/auth/login">login</Link>
      <Link href="/api/auth/logout"> sair</Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  // const session = getSession(req, res)
  const token = await getAccessToken(req, res)
  console.log(token);
  

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/api/auth/login',
  //       permanent: false
  //     }
  //   }
  // } else {
  //   return {
  //     redirect: {
  //       destination: '/app',
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: {}
  }
}