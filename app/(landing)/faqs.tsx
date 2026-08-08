export default function FAQs() {
    return (
        <section className="scroll-py-16 py-12 md:scroll-py-12 md:py-12">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p className="text-muted-foreground">Everything you need to know about tracking with Grok Fit.</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">How does calories in vs calories out work?</h3>
                            <p className="text-muted-foreground mt-4">
                                You log food (calories in) and activity (calories out). Grok Fit shows your net energy balance against your daily target so you know if you are in a deficit, surplus, or at maintenance.
                            </p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">Set a fitness goal and daily calorie target.</li>
                                <li className="text-muted-foreground mt-4">Log meals and workouts as you go.</li>
                                <li className="text-muted-foreground mt-4">Review your balance and trends to adjust the next day.</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can I change my goal later?</h3>
                            <p className="text-muted-foreground mt-4">
                                Yes. Switch between fat loss, muscle gain, or maintenance anytime. Your daily calorie target updates so the dashboard stays aligned with what you are training for.
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Do I need a paid plan to track calories?</h3>
                            <p className="text-muted-foreground my-4">
                                Core logging and energy balance are available on the free plan. Paid plans unlock deeper insights, advanced goals, and premium features when you want more.
                            </p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">Free: daily calorie in/out logging and goal progress.</li>
                                <li className="text-muted-foreground">Paid: richer analytics, custom targets, and advanced tools.</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Is this medical advice?</h3>
                            <p className="text-muted-foreground mt-4">
                                No. Grok Fit is a tracking tool for general fitness goals. For medical conditions, nutrition disorders, or personalized clinical advice, talk to a qualified healthcare professional.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
