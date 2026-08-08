import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PixelCard from '../../components/react-bits/pixel-card'

export default function CallToAction() {
    return (
        <section className="py-1 px-6">
            <div className=" mx-auto max-w-5xl rounded-3xl px-6 py-1 md:py-2 lg:py-3">
                <PixelCard variant="blue" className="w-full max-w-5xl h-auto aspect-[16/9]">
                <div className="absolute text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Start your next week stronger</h2>
                    <p className="mt-4">Log what you eat, track what you burn, and connect every day to a clear fitness goal.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/dashboard">
                                <span>Open dashboard</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/blog">
                                <span>Read the guides</span>
                            </Link>
                        </Button>
                    </div>
                </div>
                </PixelCard>
            </div>
            
        </section>
    )
}
