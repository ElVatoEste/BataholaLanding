import { NextRequest, NextResponse } from "next/server"

// Esta ruta actúa como proxy para evitar problemas CORS
export async function GET(request: NextRequest) {
    try {
        const url = request.nextUrl.searchParams.get("url")

        if (!url) {
            return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
        }

        const response = await fetch(url)

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch: ${response.status} ${response.statusText}` },
                { status: response.status }
            )
        }

        const contentType = response.headers.get("content-type") || "application/octet-stream"
        const buffer = await response.arrayBuffer()

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000",
            },
        })
    } catch (error) {
        console.error("Proxy error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
