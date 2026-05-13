import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Cậu có được đi đến tầm 11h đêm khongg? Tất nhiên là có tớ đồng hành.",
    options: [
      { id: 'A', text: "Được, có cậu đưa về thì yên tâm." },
      { id: 'B', text: "Thôi, muộn quá, tớ ngại về giờ đó lắm." }
    ]
  },
  {
    id: 2,
    question: "Vẫn giữ ý định không đi ăn à? Hay là thay đổi duy nghĩ nhỉii?!?!",
    options: [
      { id: 'A', text: "Cũng đượccc, xem cậu dẫn tớ đi đâu" },
      { id: 'B', text: "Tớ không ăn đâu, cảm ơn nhé." }
    ]
  },
  {
    id: 3,
    question: "Buổi date đầu muốn vận động một chút hay chỉ ngồi yên thôi?",
    options: [
      { id: 'A', text: "Cũng được, đổi gió tí cũng hay." },
      { id: 'B', text: "Thôi, mệt lắm, tớ thích thong thả hơn." }
    ]
  },
  {
    id: 4,
    question: "Cậu có ngại nếu khung hình có cả 2 đứa mình không?",
    options: [
      { id: 'A', text: "Thôi ngại lắm, mình đã là gì của nhau đâu." },
      { id: 'B', text: "Cũng được, chụp vài kiểu lưu niệm thôi mà." }
    ]
  },
  {
    id: 5,
    question: "Nhấn vào đây xem kết quả rồi chụp màn hình gửi tớ nhé.",
    options: [
      { id: 'A', text: "Ok, xong rồi tớ gửi cho." }
    ]
  }
];

interface PhilosophySectionProps {
  onFinish?: (answers: Record<number, string>) => void;
}

export default function PhilosophySection({ onFinish }: PhilosophySectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 400);
    } else {
      setIsFinished(true);
      if (onFinish) {
        onFinish(newAnswers);
      }
    }
  };

  return (
    <section id="planning" className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-serif"
        >
          {isFinished ? "Perfect then x Plan" : "Your Planning x Our Date"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] relative"
          >
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <div className="relative min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isFinished ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-8"
                >
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                      Question {currentStep + 1} of {questions.length}
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl leading-tight font-serif">
                      {questions[currentStep].question}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {questions[currentStep].options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className={`
                          liquid-glass w-full text-left p-6 rounded-2xl transition-all duration-300 group
                          ${answers[currentStep] === option.id ? 'bg-white/10' : 'hover:bg-white/5'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <span className="text-white/40 font-mono">{option.id}.</span>
                            <span className="text-white text-base md:text-lg">{option.text}</span>
                          </div>
                          {answers[currentStep] === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-white rounded-full p-1"
                            >
                              <Check className="w-4 h-4 text-black" />
                            </motion.div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="liquid-glass p-8 md:p-12 rounded-3xl text-center"
                >
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Planning Complete</p>
                  <h3 className="text-white text-3xl md:text-4xl mb-8 font-serif">I've noted everything down!</h3>
                  <p className="text-white/70 text-lg mb-0 leading-relaxed">
                    Chụp màn hình bên dưới lại và gửi cho tớ để chúng mình chốt lịch nhé. Hẹn gặp cậu sớm! ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
