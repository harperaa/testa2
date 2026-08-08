import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Jordan Hale',
        role: 'Marathon trainee',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        quote: 'Grok Fit made my energy balance obvious. I stopped under-fueling long runs and finally hit my race-weight goal.',
    },
    {
        name: 'Priya Shah',
        role: 'Strength coach',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        quote: 'I recommend it to clients who need simple calories in/out tracking without a spreadsheet. The goal targets keep people consistent.',
    },
    {
        name: 'Marcus Webb',
        role: 'Busy parent',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
        quote: 'Logging meals takes seconds. Seeing the daily deficit next to my fat-loss goal is the only habit that stuck for me.',
    },
    {
        name: 'Elena Ortiz',
        role: 'CrossFit athlete',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        quote: 'Calories burned from workouts finally sit next to what I eat. My recovery improved once intake matched training days.',
    },
    {
        name: 'Chris Nguyen',
        role: 'Software engineer',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        quote: 'Clean dashboard, clear numbers. I hit a 12-week streak maintaining a modest deficit without obsessing over every gram.',
    },
    {
        name: 'Sam Rivera',
        role: 'Yoga instructor',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
        quote: 'I use Grok Fit for maintenance, not extremes. Knowing I am balanced most days keeps my energy steady for teaching.',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section id="about">
            <div className="py-16 md:py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-foreground text-4xl font-semibold">Loved by people who track what matters</h2>
                        <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">
                            From first-time trackers to competitive athletes — Grok Fit keeps goals, intake, and burn in one place.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div
                                key={chunkIndex}
                                className="space-y-3">
                                {chunk.map(({ name, role, quote, image }, index) => (
                                    <Card key={index}>
                                        <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                                            <Avatar className="size-9">
                                                <AvatarImage
                                                    alt={name}
                                                    src={image}
                                                    loading="lazy"
                                                    width="120"
                                                    height="120"
                                                />
                                                <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="font-medium">{name}</h3>

                                                <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
