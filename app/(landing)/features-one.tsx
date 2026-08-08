import { Card } from '@/components/ui/card'
import { Table } from './table'
import { CpuArchitecture } from './cpu-architecture'
import { AnimatedListCustom } from './animated-list-custom'
  

export default function FeaturesOne() {
    return (
        <section className="py-16 md:py-32">
            <div className=" py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-foreground text-4xl font-semibold">Effortless calorie tracking</h2>
                        <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">Log meals and workouts in seconds. Grok Fit keeps calories in, calories out, and your fitness goal aligned so daily energy balance stays clear.</p>
                        <div className="bg-foreground/5 rounded-3xl p-6">
                            <Table />
                        </div>
                    </div>

                    <div className="border-foreground/10 relative mt-16 grid gap-12 border-b pb-12 [--radius:1rem] md:grid-cols-2">
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Meal logging</h3>
                            <p className="text-muted-foreground my-4 text-lg">Capture breakfast through late snacks with calorie targets that match your goal.</p>
                            <Card
                                className="aspect-video overflow-hidden px-6">
                                <Card className="h-full translate-y-6 rounded-b-none border-b-0 bg-muted/50">
                                    <CpuArchitecture />
                                </Card>
                            </Card>
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Workout burn tracking</h3>
                            <p className="text-muted-foreground my-4 text-lg">Record cardio, strength, and recovery sessions so calories out stay honest.</p>
                            <Card
                                className="aspect-video overflow-hidden">
                                <Card className="translate-6 h-full rounded-bl-none border-b-0 border-r-0 bg-muted/50 pt-6 pb-0">
                                    <AnimatedListCustom />
                                </Card>
                            </Card>
                        </div>
                    </div>

                    <blockquote className="before:bg-primary relative mt-12 max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full">
                        <p className="text-foreground text-lg">Seeing calories in next to calories out every day is the first time a fitness app made my goal feel practical.</p>
                        <footer className="mt-4 flex items-center gap-2">
                            <cite>Alex K.</cite>
                            <span
                                aria-hidden
                                className="bg-foreground/15 size-1 rounded-full"></span>
                            <span className="text-muted-foreground">Grok Fit member</span>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
