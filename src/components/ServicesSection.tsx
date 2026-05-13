import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Camera } from 'lucide-react';

interface ServicesSectionProps {
  answers: Record<number, string>;
}

export default function ServicesSection({ answers }: ServicesSectionProps) {
  // Q1: answers[0]
  // Q2: answers[1]
  // Q3: answers[2]
  // Q4: answers[3]

  const showPs5 = answers[0] !== 'B';
  const showLeechadolOriginal = answers[0] !== 'B';
  
  // Q2 logic: if B, Leechadol becomes Ps5
  const leecahdolReplacement = answers[1] === 'B' ? { name: "CO-Play Station", address: "Ngõ 130 Xuân Thuỷ" } : { name: "LeeChadol", address: "Lotte Tây Hồ" };
  
  // If Q1-B is chosen, even the replacement Ps5 should probably be hidden?
  // The user said "ẩn Ps5 và Leechadol". So if Q1-B, both are gone.
  const finalLeechadolSlot = (showLeechadolOriginal && (answers[1] === 'A' || showPs5)) ? leecahdolReplacement : null;

  const card1Locations = [
    { name: "Lets sushi", address: "Hàm Nghi" },
    showPs5 ? { name: "CO-Play Station", address: "Ngõ 130 Xuân Thuỷ" } : null
  ].filter(Boolean) as { name: string; address: string }[];

  const card2Locations = [
    { name: "Thuỷ cung", address: "Lotte mall Tây Hồ" },
    finalLeechadolSlot
  ].filter(Boolean) as { name: string; address: string }[];

  const services = [
    {
      id: 1,
      category: "Kế hoạch chi tiết",
      title: "Fine Dining & Ps5",
      description: "Một bữa tối lãng mạn tại nhà hàng yêu thích, sau đó là những giây phút thư giãn cùng nhau bên máy Ps5.",
      locations: card1Locations,
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
      show: answers[2] === 'B'
    },
    {
      id: 2,
      category: "Kế hoạch chi tiết",
      title: "Aquarium & Take some photo",
      description: "Khám phá thế giới đại dương huyền bí và cùng nhau lưu giữ những khoảnh khắc đẹp qua những khung hình kỷ niệm.",
      locations: card2Locations,
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
      show: answers[2] === 'A',
      hasCamera: answers[3] === 'B'
    }
  ].filter(s => s.show);

  return (
    <section id="services" className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 ${services.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-8 md:gap-12`}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="liquid-glass rounded-[2rem] p-1 group cursor-pointer"
            >
              <div className="bg-black/40 rounded-[1.8rem] overflow-hidden p-6 md:p-10 flex flex-col h-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                  <video
                    src={service.video}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  {service.hasCamera && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col font-serif">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-white/40 text-xs tracking-widest uppercase">
                      {service.category}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-white text-3xl md:text-4xl mb-6 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/50 text-base leading-relaxed mb-8 italic">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                    {service.locations.map((loc, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                          <MapPin className="w-3 h-3 text-white/40" />
                          <span>{loc.name}</span>
                        </div>
                        <p className="text-white/30 text-xs ml-5">{loc.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
