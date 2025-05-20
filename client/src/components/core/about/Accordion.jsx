import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

// FAQs
const faqs = [
  {
    id: 1,
    question: "What is EduVista EdTech?",
    answer:
      "EduVista EdTech is an innovative online learning platform designed to help students master new skills, excel in exams, and prepare for their future careers with expert-led courses.",
  },
  {
    id: 2,
    question: "How does EduVista EdTech work?",
    answer:
      "Students can browse our wide range of courses, enroll, and start learning instantly through engaging video lessons, quizzes, and interactive assignments.",
  },
  {
    id: 3,
    question: "How can I enroll in a course?",
    answer:
      "Simply visit the course page, click the “Enroll Now” button, and follow the steps to sign up and make payment.",
  },
  {
    id: 4,
    question: "Do I get lifetime access to the courses?",
    answer:
      "TYes! Once enrolled, you have lifetime access to the course materials, including future updates.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, online banking, and digital wallets for easy and secure payments.",
  },
];

const AccordionItem = ({ question, answer, isExpanded, onToggle }) => {
  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border-1 max-w-4xl ${
        isExpanded ? "max-h-96" : "max-h-20"
      }`}
    >
      <div
        className="flex justify-between items-start p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="text-base font-bold">{question}</div>
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div
        className={`px-5 pb-5 overflow-hidden
        transition-all duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>{answer}</div>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 flex flex-col items-center">
      <h2 className="text-center">We're Here to Help</h2>
      <div className=" mt-10 flex flex-col gap-y-10">
        {faqs.map((item) => (
          <AccordionItem
            key={item.id}
            {...item}
            isExpanded={expandedId === item.id}
            onToggle={() => toggleExpand(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Accordion;
