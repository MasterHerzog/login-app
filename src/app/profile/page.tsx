import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page(){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return (
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold">Please log in to view your profile</h1>
                </div>
            </div>
        )
    }
    
    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Profile</h1>
            </div>

            <pre className="text-sm overflow-clip">
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
}