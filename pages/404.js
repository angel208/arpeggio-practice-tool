import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NotFound() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 5000);
    }, [])

    return (
        <div className="not-found">
            <h1>Oooopppsss...</h1>
            <h2>That page cannot be found</h2>
            <Link href="/">
                <a>go back</a>
            </Link>
        </div>
    )
}
