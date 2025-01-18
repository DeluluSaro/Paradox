import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, ChevronRight, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import faqs from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MagnetizeButton } from "@/components/ui/magnetize-button";

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
          <h3 className="text-3xl font-bold mb-12 text-center gradient-title">
            Key Features{" "}
          </h3>

          <div className="grid grid-col-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              return (
                <Card key={index} className="bg-gray-800">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-400"></feature.icon>

                    <h4 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center gradient-title">
            Frequently Asked Question
          </h3>

          <Accordion type="single" collapsible>
            {faqs.map((faq,index)=>(
                 <AccordionItem key={index}  value={ `item-${index}`}>
                 <AccordionTrigger>{faq.question}</AccordionTrigger>
                 <AccordionContent>
                   {faq.answer}
                 </AccordionContent>
               </AccordionItem>
            ))}
         
          </Accordion>
        </div>
      </section>


      <section className="bg-gray-950 py-20 px-5">

        <div className="container mx-auto flex flex-col justify-center items-center"> 

          <h3 className="text-3xl font-bold mb-12 text-center gradient-title" >

            Ready to transform your workflow

          </h3>
          <p className="text-xl mb-12 text-center">Collaborate with your team and make a project workflow a better placee</p>


        <Link href={'/onboarding'}> 
        <MagnetizeButton particleCount={50} attractRadius={10} ></MagnetizeButton>
        </Link>
        </div>

      </section>
    </div>
  );
}
