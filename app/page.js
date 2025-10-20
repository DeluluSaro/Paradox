"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, ChevronRight, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import faqs from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { motion } from "framer-motion";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen ">
     <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold  gradient-title pb-6 flex flex-col">
          Streamline your workflow <br></br>
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            with{" "}
            <Image
              src="/test2.png"
              alt="logo"
              width={900}
              height={200}
              className="h-24 sm:h-64 w-auto object-contain"
            ></Image>
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Empower your team with our project management tool
        </p>
        <Link href="/onboarding">
          <Button size="lg" className="mr-4 bg-gray-600 text-white ">
            Get Started{" "}
            <ChevronRight size={18} className="ml-1">
              {" "}
            </ChevronRight>
          </Button>
        </Link>
        <Link href="#features">
          <Button size="lg" variant="outline" className="mr-2  text-black">
            Learn More{" "}
            <ChevronRight size={18} className="ml-1">
              {" "}
            </ChevronRight>
          </Button>

          
        </Link>
       
      </section>
      

{/* <section className="h-screen pt-10 bg-black">
<Hero
      title="AI that works for you."
      subtitle="Transform your workflow with intelligent automation. Simple, powerful, reliable."
      actions={[
        {
          label: "Try Demo",
          href: "#",
          variant: "outline"
        },
        {
          label: "Start Free",
          href: "#",
          variant: "primary"
        }
      ]}
      titleClassName="text-5xl md:text-6xl font-extrabold"
      subtitleClassName="text-lg md:text-xl max-w-[600px]"
      actionsClassName="mt-8"
    />
</section> */}

      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center gradient-title">Key Features</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                  className="relative group"
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card className="bg-gray-800/70 backdrop-blur rounded-2xl border border-gray-700/50 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 ring-1 ring-inset ring-blue-500/30 mb-4">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center gradient-title">Frequently Asked Questions</h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-3xl"
          >
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800">
                  <AccordionTrigger className="text-left text-gray-200 hover:text-white data-[state=open]:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>


      <section className="relative overflow-hidden bg-gray-950 py-24 px-5">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]"
        />

        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6 gradient-title"
          >
            Ready to transform your workflow
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-12 text-gray-300 max-w-2xl"
          >
            Collaborate with your team and make your project workflow faster, clearer, and more enjoyable.
          </motion.p>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link href={'/onboarding'}>
              <MagnetizeButton particleCount={50} attractRadius={10} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
