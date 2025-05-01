"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FeedbackItem {
  category: string
  strengths: string[]
  improvements: string[]
}

export default function EmployerFeedback() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const feedback: FeedbackItem[] = [
    {
      category: "Visual Design",
      strengths: [
        "Clean, modern aesthetic that conveys professionalism",
        "Effective use of whitespace and typography hierarchy",
        "Subtle animations enhance the experience without being distracting",
        "Consistent design language throughout the site",
      ],
      improvements: [
        "Consider adding more visual hierarchy to guide the eye through key achievements",
        "The color palette could be more distinctive to create a more memorable brand",
        "Add more custom illustrations or graphics that represent your personal brand",
      ],
    },
    {
      category: "Content & Messaging",
      strengths: [
        "Clear articulation of experience and skills",
        "Good balance between technical details and high-level descriptions",
        "Project descriptions effectively communicate both process and outcomes",
        "Academic achievements demonstrate well-rounded capabilities",
      ],
      improvements: [
        "Add more quantifiable results and metrics to demonstrate impact",
        "Consider including testimonials from previous employers or clients",
        "The personal story could be more prominent to create emotional connection",
      ],
    },
    {
      category: "User Experience",
      strengths: [
        "Intuitive navigation makes it easy to find information",
        "Responsive design works well across different devices",
        "Interactive elements provide good feedback to user actions",
        "Page load times are optimized for good performance",
      ],
      improvements: [
        "Add a search functionality for easier content discovery",
        "Consider implementing a dark/light mode toggle for accessibility",
        "The contact form could benefit from more immediate feedback on submission",
      ],
    },
    {
      category: "Technical Implementation",
      strengths: [
        "Modern tech stack demonstrates current technical knowledge",
        "Clean code structure shows attention to detail",
        "Good use of components for maintainability",
        "Performance optimizations like image handling are well implemented",
      ],
      improvements: [
        "Add more interactive demos of your technical skills",
        "Consider implementing a more sophisticated CMS for easier content updates",
        "Add more comprehensive analytics to track user engagement",
      ],
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              EMPLOYER PERSPECTIVE
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              An objective assessment of this portfolio from an employer or investor perspective, highlighting strengths
              and areas for improvement.
            </motion.p>
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Overall Assessment</h3>
                  <p className="text-muted-foreground">
                    This portfolio effectively showcases James' skills, experience, and achievements in a visually
                    appealing and well-structured manner. It strikes a good balance between professional presentation
                    and personality, making it an effective tool for job applications or investor pitches. With some
                    refinements to content strategy and interactive elements, it could be even more impactful.
                  </p>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {feedback.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{item.category}</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-1 pl-6 list-disc text-muted-foreground">
                        {item.strengths.map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center text-amber-600 dark:text-amber-400">
                        <XCircle className="h-4 w-4 mr-2" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1 pl-6 list-disc text-muted-foreground">
                        {item.improvements.map((improvement, i) => (
                          <li key={i}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="bg-card rounded-lg border border-border p-6 mt-8">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Final Thoughts</h3>
                  <p className="text-muted-foreground">
                    This portfolio demonstrates strong technical skills and professional experience. With the suggested
                    improvements, it could become an even more powerful tool for career advancement. The most impactful
                    changes would be adding more quantifiable results, incorporating testimonials, and creating more
                    interactive demonstrations of technical capabilities.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

