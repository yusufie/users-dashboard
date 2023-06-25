"use client"
import { useRouter } from 'next/navigation'
// import Left from "./../components/Left";
import React from 'react';

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <>
      <div id="usersPage">
        {/* <Left /> */}
        <h1></h1>
      </div>
    </>
  )
}
