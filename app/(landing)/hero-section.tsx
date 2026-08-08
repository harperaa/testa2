import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from "@/app/(landing)/header"

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main>
                <section className="">
                    <div className="pt-8 pb-4 md:pt-12 md:pb-6">
                        <div className="relative z-10 mx-auto max-w-5xl pt-6 px-6 text-center">
                            <div>
                                <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                                    Hit your fitness goals with {process.env.NEXT_PUBLIC_SITE_NAME || 'Grok Fit'}
                                </h1>
                                <p className="text-muted-foreground mx-auto mt-4 mb-5 max-w-xl text-balance text-xl">
                                    Track calories in and calories out, stay on top of your daily energy balance, and turn every meal and workout into progress toward your goals.
                                </p>

                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="/dashboard">
                                            <span className="text-nowrap">Start tracking free</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline">
                                        <Link href="/#features">
                                            <span className="text-nowrap">See how it works</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 mx-auto max-w-5xl px-6">
                                <div className="">
                                    <div className="bg-background rounded-(--radius) relative mx-auto overflow-hidden border border-transparent shadow-lg shadow-black/10 ring-1 ring-black/10">
                                        <Image
                                            src="/hero-section-main-app-dark.jpg"
                                            alt="Grok Fit calorie tracking dashboard"
                                            width={2856}
                                            height={1798}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
