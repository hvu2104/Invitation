import { motion } from 'framer-motion';

export default function FeaturedVideoSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-serif">
      {/* Background Video - Full Background */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-3xl p-8 md:p-12 max-w-xl w-full"
        >
          <p className="text-white/50 text-xs tracking-widest uppercase mb-4 italic">Góc nhỏ của tớ</p>
          <p className="text-white text-xl md:text-2xl leading-relaxed italic">
            "Tớ khong biết cậu đã trải qua những gì trong chuyện tình cảm, nhưng tớ tin nếu có cơ hội thì tớ có thể cho cậu thấy 1 góc nhìn khác về thế nào là tình iu"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-right"
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-2">A Little Secret</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white tracking-tight italic">
            You look lonely, <br />
            <span className="text-white/60">I can fix that</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
