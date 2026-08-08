import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { IconFlame, IconTargetArrow, IconActivity } from '@tabler/icons-react'

export default function SecurityMonitoring() {
    return (
        <section id="features" className="py-12 md:py-16">
            <div className="mx-auto w-full max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-foreground text-4xl font-semibold">Calories in. Calories out. Goals on track.</h2>
                    <p className="text-muted-foreground mb-6 mt-4 text-balance text-lg">
                        Grok Fit keeps a live energy balance so you always know where you stand —
                        what you ate, what you burned, and how it maps to your fitness goals.
                    </p>
                    <div className="bg-foreground/5 rounded-3xl p-6">
                        <Image
                            src="/calorie-balance-dashboard.jpg"
                            alt="Grok Fit energy balance and calorie analytics dashboard"
                            width={2880}
                            height={1842}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                <div className="border-foreground/10 relative mt-12 grid gap-8 border-b pb-8 [--radius:1rem] md:grid-cols-2">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <IconFlame className="size-6 text-orange-600" />
                                <h3 className="text-foreground text-xl font-semibold">Energy balance, simplified</h3>
                            </div>
                            <p className="text-muted-foreground my-4 text-lg">
                                Log meals and workouts in seconds. Grok Fit compares intake and burn
                                so you can see surplus, deficit, or maintenance at a glance.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="outline">Calories in</Badge>
                                <Badge variant="outline">Calories out</Badge>
                                <Badge variant="outline">Net balance</Badge>
                                <Badge variant="outline">Meal log</Badge>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <IconTargetArrow className="size-6 text-green-600" />
                                <h3 className="text-foreground text-xl font-semibold">Goals that guide every day</h3>
                            </div>
                            <p className="text-muted-foreground my-4 text-lg">
                                Set a goal — lose fat, gain muscle, or maintain — and get a daily calorie
                                target that adapts to your activity and progress.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="outline" className="border-green-600 text-green-600">Fat loss</Badge>
                                <Badge variant="outline" className="border-blue-600 text-blue-600">Muscle gain</Badge>
                                <Badge variant="outline">Maintenance</Badge>
                                <Badge variant="outline">Custom target</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <IconActivity className="size-6 text-blue-600" />
                            <h3 className="text-foreground text-xl font-semibold">Trends that keep you honest</h3>
                        </div>
                        <p className="text-muted-foreground text-lg">
                            Weekly charts, streaks, and macro breakdowns show whether your habits
                            match your goal — so you can adjust early instead of guessing at the scale.
                        </p>
                    </div>

                    <blockquote className="before:bg-primary relative mt-8 max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full">
                        <p className="text-foreground text-lg">
                            Once I could see calories in versus out next to my goal every day,
                            staying consistent stopped feeling like guesswork.
                        </p>
                        <footer className="mt-4 flex items-center gap-2">
                            <cite>Maya R.</cite>
                            <span
                                aria-hidden
                                className="bg-foreground/15 size-1 rounded-full"></span>
                            <span className="text-muted-foreground">Grok Fit member</span>
                        </footer>
                    </blockquote>
                </div>
        </section>
    )
}
